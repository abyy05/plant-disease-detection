# backend/app.py
import os
import io
import json
import traceback
from datetime import datetime, timedelta
import requests
import torch
import torchvision.transforms as transforms
from PIL import Image
import torch.nn as nn
import torch.nn.functional as F
import pyttsx3
from threading import Thread
from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import jwt
from flask_pymongo import PyMongo
from dotenv import load_dotenv


load_dotenv()


# ----------------------------
# CONFIG & CONSTANTS (NEWLY ADDED)
# ----------------------------
MONGO_URI = os.getenv("MONGO_URI")
JWT_SECRET = os.getenv("JWT_SECRET")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

# ----------------------------
# APP INITIALIZATION
# ----------------------------
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
CORS(app)

# ----------------------------
# DATABASE (NEWLY ADDED)
# ----------------------------
app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)
db = mongo.cx.get_database("rikkbera_db")
users = db["users"]

# ----------------------------
# JWT HELPERS (NEWLY ADDED)
# ----------------------------
def create_token(email):
    payload = {
        "email": email,
        "exp": datetime.utcnow() + timedelta(hours=6)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return token

def verify_token(token):
    try:
        if not token:
            return None
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except Exception:
        return None

# ----------------------------
# SIGNUP & SIGNIN ROUTES (NEWLY ADDED)
# ----------------------------
@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        if users.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 400
        hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        users.insert_one({"email": email, "password": hashed_pw})
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route("/signin", methods=["POST"])
def signin():
    try:
        data = request.get_json()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        user = users.find_one({"email": email})
        if not user:
            return jsonify({"error": "Invalid credentials"}), 401
        stored = user.get("password")
        if isinstance(stored, str):
            stored = stored.encode("utf-8")
        if bcrypt.checkpw(password.encode("utf-8"), stored):
            token = create_token(email)
            return jsonify({"token": token}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# ----------------------------
# OLD BACKEND (UNCHANGED BELOW)
# ----------------------------

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# To read disease solutions
reading_text = open("D:\\VS Code\\Plant DISEASE\\plant-api\\plant-api\\backend\\disease_solution_json.txt","r")
storing_text = reading_text.read()
plant_disease_solutions = json.loads(storing_text)
\
def get_solution(disease):
    disease = disease.lower()
    return plant_disease_solutions.get(disease, "Disease not found in the database. Please consult an expert for advice.")

def speak_text(text):
    def speak_worker():
        engine = pyttsx3.init()
        engine.say(text)
        engine.runAndWait()
    Thread(target=speak_worker).start()

# Define model architecture
class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        images, labels = batch
        out = self(images)
        loss = F.cross_entropy(out, labels)
        return loss
    
    def validation_step(self, batch):
        images, labels = batch
        out = self(images)
        loss = F.cross_entropy(out, labels)
        acc = accuracy(out, labels)
        return {"val_loss": loss.detach(), "val_accuracy": acc}

def ConvBlock(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
             nn.BatchNorm2d(out_channels),
             nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)

class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_diseases):
        super().__init__()
        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True)
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))
        self.conv3 = ConvBlock(128, 256, pool=True)
        self.conv4 = ConvBlock(256, 512, pool=True)
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))
        self.classifier = nn.Sequential(nn.MaxPool2d(4), nn.Flatten(), nn.Linear(512, num_diseases))
    def forward(self, xb):
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = ResNet9(3, 38)
model.load_state_dict(torch.load("D:\\VS Code\\Plant DISEASE\\plant-api\\plant-api\\backend\\plant-disease-model.pth", map_location=device))
model.eval()

def preprocess_image(image_file):
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor()
    ])
    image = Image.open(io.BytesIO(image_file.read())).convert('RGB')
    return transform(image)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict_disease():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    try:
        img_tensor = preprocess_image(file).unsqueeze(0).to(device)
        with torch.no_grad():
            output = model(img_tensor)
            _, predicted = torch.max(output, 1)
            confidence = torch.softmax(output, dim=1)[0][predicted].item()
            reading_text1 = open("D:\\VS Code\\Plant DISEASE\\plant-api\\plant-api\\backend\\disease_classes.txt","r")
            storing_text1 = reading_text1.read()
            disease_classes = json.loads(storing_text1)
            prediction = disease_classes[predicted.item()]
            solution = get_solution(prediction)
            return jsonify({
                'disease': prediction,
                'confidence': round(float(confidence), 4),
                'solution': solution,
                'timestamp': datetime.now().isoformat()
            })
    except Exception as e:
        print("ERROR OCCURRED")
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

# Weather analysis routes unchanged
def get_city_from_ip():
    try:
        ip_info = requests.get('https://ipinfo.io').json()
        return ip_info.get('city', 'Unknown location')
    except Exception as e:
        print(f"Error getting location: {e}")
        return None

def get_weather_forecast(city, api_key):
    try:
        url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
        response = requests.get(url)
        data = response.json()
        if data['cod'] != '200':
            raise Exception(f"Error fetching weather data: {data.get('message', 'Unknown error')}")
        forecast_data = {}
        for entry in data.get('list', []):
            time = entry.get('dt_txt')
            date = datetime.strptime(time, '%Y-%m-%d %H:%M:%S').date().strftime('%Y-%m-%d')
            if date not in forecast_data:
                forecast_data[date] = []
            forecast_data[date].append({
                'time': time,
                'temperature': entry['main'].get('temp', 0),
                'humidity': entry['main'].get('humidity', 0),
                'wind_speed': entry['wind'].get('speed', 0),
                'accumulation': entry.get('rain', {}).get('3h', 0)
            })
        return forecast_data
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        return None

def analyze_weather_data(forecast):
    diseases = []
    for date, entries in forecast.items():
        for entry in entries:
            temp = entry['temperature']
            humidity = entry['humidity']
            accumulation = entry['accumulation']
            wind_speed = entry['wind_speed']
            if temp > 35 and humidity > 80:
                diseases.append(f"{entry['time']}: High temperature and humidity - Risk of heat and humidity-related diseases.")
    return diseases

@app.route('/weather-analysis', methods=['GET'])
def weather_analysis():
    city_name = get_city_from_ip()
    if city_name:
        forecast = get_weather_forecast(city_name, WEATHER_API_KEY)
        if forecast:
            potential_diseases = analyze_weather_data(forecast)
            if potential_diseases:
                return jsonify({'city': city_name, 'forecast': forecast, 'output': potential_diseases})
            else:
                return jsonify({'city': city_name, 'forecast': forecast, 'output': "No significant disease risks detected based on the current forecast."})
        else:
            return jsonify({'error': 'Could not fetch weather data.'}), 500
    else:
        return jsonify({'error': 'Could not detect location.'}), 500

@app.route('/get-solution', methods=['POST'])
def get_disease_solution():
    data = request.get_json()
    if not data or 'disease' not in data:
        return jsonify({'error': 'No disease specified'}), 400
    solution = get_solution(data['disease'])
    speak_text(f"Solution for {data['disease']}: {solution}")
    return jsonify({'disease': data['disease'], 'solution': solution, 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True)
