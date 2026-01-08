# **AgriCarePro – Plant Disease Detection & Weather-Based Farming Advisor**



## Overview

**AgriCarePro** is an intelligent agricultural assistant that combines:

- **AI-powered plant disease detection** using a custom-trained ResNet9 model
- **Weather forecast analysis** with disease risk prediction
- **Real-time farming recommendations** based on weather conditions
- **Voice-enabled solution delivery** using text-to-speech
- **Secure user authentication** with JWT and MongoDB

---

## Features

| Feature | Description |
|-------|-----------|
| **Plant Disease Detection** | Upload leaf images → Get disease name + confidence + treatment |
| **Weather Forecasting** | 5-day, 3-hourly forecast with precipitation, humidity, wind |
| **Disease Risk Alerts** | Predicts fungal/bacterial outbreaks based on temp + humidity |
| **Smart Recommendations** | Actionable farming advice (irrigation, fungicide timing, etc.) |
| **Voice Assistant** | Speaks treatment solutions aloud |
| **User Auth System** | Secure signup/login with JWT tokens |
| **Responsive Frontend** | React + Lucide icons + Drag-to-scroll forecast |

---

## Tech Stack

### Backend
- **Python 3.9+**
- **Flask** – Web framework
- **PyTorch** – Deep learning
- **OpenCV / PIL** – Image processing
- **PyMongo** – MongoDB driver
- **JWT + Bcrypt** – Authentication
- **pyttsx3** – Text-to-speech
- **requests** – API calls

### Frontend
- **React 18** (Vite)
- **Lucide React** – Icons
- **Axios** – HTTP client
- **Tailwind CSS** (or custom CSS)

### Database
- **MongoDB** – User data, tokens, predictions (optional)

### APIs
- **OpenWeatherMap** – Weather data
- **ipinfo.io** – Location detection

---

```markdown
## Project Structure

```
## Project Structure

```text
AgriCarePro/
├── backend/
│   ├── app.py                                 # Main Flask server
│   ├── plant-disease-model.pth                # Trained PyTorch model (ResNet9, 38 classes)
│   ├── disease_solution_json.txt              # JSON mapping of diseases → treatment solutions
│   ├── disease_classes.txt                    # List of 38 disease class names (model output)
│   ├── uploads/                               # Uploaded user images for disease prediction
│   │   ├── WhatsApp Image 2024-10-26...
│   │   └── WhatsApp Image 2024-10-30...
│   └── README.md                              # Backend-specific documentation
│
├── frontend/
│   ├── public/                                # Static assets
│   │   ├── abhik.png
│   │   ├── background_leaf.jpg
│   │   ├── features.jpg
│   │   ├── rikk.jpg
│   │   └── vite.svg
│   │
│   └── src/
│       ├── assets/
│       │   └── CSS/
│       │       ├── AgriCarePro.css
│       │       ├── Contributor.css
│       │       ├── Header.css
│       │       └── Weather_Forecast_css/
│       │           ├── CurrentWeather.css
│       │           ├── forecast_footer.css
│       │           ├── UpcomingWeather.css
│       │           └── WeatherImpact.css
│       │
│       ├── components/
│       │   ├── AuthNav.jsx
│       │   ├── Contributor.jsx
│       │   ├── Header.jsx
│       │   ├── Landingpage.jsx
│       │   └── Weather_Forecast_JSX/
│       │       ├── CurrentWeather.jsx
│       │       ├── forecast_footer.jsx
│       │       ├── UpcomingWeather.jsx
│       │       └── WeatherImpact.jsx
│       │
│       ├── pages/
│       │   ├── AgriCarePro.jsx
│       │   ├── Login.jsx
│       │   ├── Plantpage.jsx
│       │   ├── Signup.jsx
│       │   └── weatherForecastPage.jsx
│       │
│       ├── api.js                             # API calls to backend
│       ├── App.jsx                            # Root component
│       ├── App.css
│       ├── index.css
│       └── main.jsx                           # Entry point (React 18+)
│
├── .env                                       # Environment variables (MongoDB, JWT, API keys)
├── README.md
└── requirements.txt                           # Python dependencies (Flask, PyTorch, etc.)
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/abyy05/plant-api.git
cd AgriCarePro
```

### 2. Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r backend/requirements.txt
```

### 3. Environment Variables (`.env`)

```env
MONGO_URI= add your MONGO URI
JWT_SECRET=your-super-secret-jwt-key
WEATHER_API_KEY=your_openweathermap_api_key
```

> Get free API key from [OpenWeatherMap](https://openweathermap.org/api)

### 4. Start Backend

```bash
cd backend
python app.py
```

Server runs at: `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint | Description |
|-------|----------|-----------|
| `POST` | `/signup` | Register user |
| `POST` | `/signin` | Login → get JWT |
| `POST` | `/predict` | Upload image → get disease |
| `GET`  | `/weather-analysis` | Get 5-day forecast + risks |
| `POST` | `/get-solution` | Get + speak solution |

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

---

## Model Details

- **Architecture**: ResNet9 (custom lightweight)
- **Classes**: 38 common plant diseases
- **Input**: 256×256 RGB image
- **Accuracy**: ~92% on validation set
- **File**: `plant-disease-model.pth`

---

## Disease Database

Edit `disease_solution_json.txt`:

```json
{
  "tomato late blight": "Remove infected leaves. Apply copper-based fungicide...",
  "potato early blight": "Use chlorothalonil every 7-10 days..."
  .....add your custom disease solution......
}
```

---

## Screenshots

*Landing Page*
![WhatsApp Image 2025-10-31 at 15 25 03_793e1994](https://github.com/user-attachments/assets/31ac5ca2-d615-41c4-88ad-7a11c057b52c)
![WhatsApp Image 2025-10-31 at 15 26 25_8c207b25](https://github.com/user-attachments/assets/be5c7a3b-268e-453d-9eef-24ef6ff70895)

*Sign up,Sign in page*
![WhatsApp Image 2025-10-31 at 15 27 27_fe2cba69](https://github.com/user-attachments/assets/939c3b6a-002f-44b5-906a-08b395794dea)
![WhatsApp Image 2025-10-31 at 15 26 59_2064d94a](https://github.com/user-attachments/assets/5a50f473-4061-47af-a4d1-79bd8c421e2c)

*Plant disease  page*
![WhatsApp Image 2025-10-31 at 15 29 45_8702361b](https://github.com/user-attachments/assets/74bca28b-631f-4260-a283-e909227218c0)

*Weather analysis page*
![WhatsApp Image 2025-10-31 at 15 31 45_099e2cc8](https://github.com/user-attachments/assets/ffeefd41-bad1-4eac-97c1-db3577efeb3f)


---

---

## Future Possibilities

We are committed to evolving **AgriCarePro** into a full-fledged **smart farming ecosystem**. Here are the upcoming features:

| Feature | Description |
|--------|-----------|
| **Notification System** | Real-time alerts via email, SMS, or push notifications when disease risk is high or treatment is due. Farmers will never miss a critical action. |
| **Pesticide Recommendation Engine** | AI-driven suggestions for **specific pesticides**, dosage, and application timing based on detected disease, crop type, and weather forecast. |
| **E-Commerce Integration** | Built-in **payment gateway** (Razorpay, Stripe, etc.) to purchase recommended medicines directly from the platform with **fast delivery**. |
| **Enhanced Security** | End-to-end encryption, audit logs, 2FA, and data anonymization to ensure **ethical and secure** use of farmer data. |
| **Crop-Specific Profiles** | Save farm details (crop, soil type, location) for **personalized forecasting and recommendations**. |
| **Offline Mode** | Cache weather and disease data for use in **low-connectivity rural areas**. |
| **Multilingual Support** | Interface and voice output in **Hindi, Tamil, Telugu**, and other regional languages. |

---

---


## Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit: `git commit -m "Add amazing feature"`
4. Push: `git push origin feature/amazing`
5. Open Pull Request

---

## License

This project is licensed under the **MIT License** – see [LICENSE](LICENSE) file.

---

## Authors

- **[Abhik Halder](https://github.com/abyy05)** – Full-stack Developer & AI Engineer  
- **[Piyush Mitra](https://github.com/PiyushMitra)** – Full-stack Developer & AI Engineer  
- **[Rikk Bera](https://github.com/Rikk-Bera)** – Full-stack Developer & AI Engineer  
- **[Suprakash Saha](https://github.com/SuprakashSaha)** – Full-stack Developer & AI Engineer


---

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org)
- [PyTorch](https://pytorch.org)
- [Flask](https://flask.palletsprojects.com)
- [React](https://react.dev)
- Farmers worldwide

---

**AgriCarePro – Empowering Farmers with AI & Weather Intelligence**

---
Made with ❤️ for sustainable agriculture

