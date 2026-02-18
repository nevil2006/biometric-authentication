"# Biometric-Authentication-System" 
# 🔐 AI-Powered Biometric Authentication System

A full-stack biometric authentication system implementing OTP verification + Face Recognition + Liveness Detection to provide secure multi-factor authentication.

---

## 🚀 Features

### 👤 User Registration
- Email + Phone number
- OTP verification via Twilio
- Live face capture
- Face embedding generation
- Embedding stored securely in database

### 🔐 User Login
- Email verification
- Face capture
- Liveness detection (anti-spoofing)
- Cosine similarity comparison
- Secure authentication decision

### 🛡 Security Mechanisms
- Multi-factor authentication (OTP + Face)
- Liveness detection to prevent spoof attacks
- Cosine similarity threshold validation
- SQLAlchemy ORM for secure DB operations
- Modular backend architecture

---

## 🏗 Tech Stack

### 🔹 Frontend
- React.js
- Axios
- React Router
- React Webcam

### 🔹 Backend
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- Twilio API
- NumPy

### 🔹 AI / Computer Vision
- Face Embedding Model
- Cosine Similarity Matching
- Liveness Detection Module
- OpenCV (image decoding)

### 🔹 Database
- SQLite (Development)
- Easily upgradeable to PostgreSQL / MySQL

---

## 📂 Project Structure

biometric-authentication/

│

├── backend/

│   ├── app.py  
│   ├── config.py  
│   ├── models.py  
│   ├── otp_service.py  
│   ├── face_service.py  
│   ├── liveness_service.py  
│   ├── utils.py  
│   └── database.db  

│

├── frontend/

│   ├── src/  
│   │   ├── pages/  
│   │   │   ├── Login.jsx  
│   │   │   ├── Register.jsx  
│   │   ├── components/  
│   │   │   └── CameraCapture.jsx  
│   │   ├── App.jsx  
│   │   └── main.jsx  

│

└── README.md  

---

## 🔄 Authentication Flow

### 📝 Registration Flow
1. User enters name, email, phone
2. OTP sent via Twilio
3. OTP verification
4. Face captured
5. Liveness check
6. Face embedding generated
7. Embedding stored in database

### 🔓 Login Flow
1. Email check
2. Face capture
3. Liveness detection
4. Embedding generation
5. Cosine similarity comparison
6. Authentication granted if similarity > 0.75

---

## 🧠 Cosine Similarity Formula

similarity = (A · B) / (||A|| * ||B||)

If similarity score > 0.75 → Authentication successful.

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

cd backend  
python -m venv venv  
venv\Scripts\activate  
pip install -r requirements.txt  
python app.py  

Backend runs at:  
http://localhost:5000  

---

### 🔹 Frontend Setup

cd frontend  
npm install  
npm run dev  

Frontend runs at:  
http://localhost:5173  

---

## 🔐 Environment Variables (.env)

TWILIO_ACCOUNT_SID=your_sid  
TWILIO_AUTH_TOKEN=your_token  
TWILIO_PHONE_NUMBER=+1234567890  

---

## 📈 Why This Project Is Strong

This project demonstrates:

✔ Full-stack development  
✔ API integration  
✔ Secure authentication flow  
✔ AI/ML integration  
✔ Database management  
✔ Real-world biometric system design  
✔ Anti-spoof security implementation  

---

## 🚀 Future Improvements

- JWT Token Authentication  
- Cloud Deployment (AWS / GCP)  
- PostgreSQL production database  
- Real FaceNet model integration  
- Advanced CNN-based liveness detection  
- Dockerization  

---

## 👨‍💻 Author

Developed as a secure AI-based authentication system combining:

- Computer Vision  
- Backend Engineering  
- Security Design  
- Full-stack Integration  
