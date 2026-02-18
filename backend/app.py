from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client
import numpy as np
import json

from config import Config
from models import db, User
from otp_service import send_otp, verify_otp
from face_service import generate_embedding
from liveness_service import check_liveness
from utils import cosine_similarity

# -----------------------------------
# App Initialization
# -----------------------------------
app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()

# Twilio Client
client = Client(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_AUTH_TOKEN)

# -----------------------------------
# HOME ROUTE
# -----------------------------------
@app.route("/")
def home():
    return "Backend is Running Successfully"


# -----------------------------------
# CHECK USER (Login Step 1)
# -----------------------------------
@app.route("/check-user", methods=["POST"])
def check_user():
    data = request.json

    if not data or "email" not in data:
        return jsonify({"error": "Email required"}), 400

    email = data.get("email").strip().lower()

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"exists": True}), 200
    else:
        return jsonify({"exists": False}), 200


# -----------------------------------
# SEND OTP
# -----------------------------------
@app.route("/send-otp", methods=["POST"])
def send_otp_route():
    data = request.json
    phone = data.get("phone")

    if not phone:
        return jsonify({"error": "Phone number required"}), 400

    try:
        send_otp(client, phone, Config.TWILIO_PHONE_NUMBER)
        return jsonify({"message": "OTP Sent Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------------
# VERIFY OTP
# -----------------------------------
@app.route("/verify-otp", methods=["POST"])
def verify_otp_route():
    data = request.json
    phone = data.get("phone")
    user_otp = data.get("otp")

    if verify_otp(phone, user_otp):
        return jsonify({"message": "OTP Verified"}), 200
    else:
        return jsonify({"error": "Invalid or Expired OTP"}), 400


# -----------------------------------
# REGISTER USER
# -----------------------------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    if not data:
        return jsonify({"error": "Invalid request"}), 400

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    image = data.get("image")

    if not all([name, email, phone, image]):
        return jsonify({"error": "Missing required fields"}), 400

    email = email.strip().lower()

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    # Liveness Check
    if not check_liveness(image):
        return jsonify({"error": "Liveness failed"}), 401

    # Generate Face Embedding
    embedding = generate_embedding(image)

    new_user = User(
        name=name,
        email=email,
        phone=phone,
        embedding=json.dumps(embedding.tolist())
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User Registered Successfully"}), 200


# -----------------------------------
# LOGIN USER
# -----------------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if not data:
        return jsonify({"error": "Invalid request"}), 400

    email = data.get("email")
    image = data.get("image")

    if not all([email, image]):
        return jsonify({"error": "Missing email or image"}), 400

    email = email.strip().lower()

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Liveness Check
    if not check_liveness(image):
        return jsonify({"error": "Spoof detected"}), 401

    # Generate New Embedding
    new_embedding = generate_embedding(image)

    # Load Stored Embedding
    stored_embedding = np.array(json.loads(user.embedding))

    # Cosine Similarity
    similarity = cosine_similarity(new_embedding, stored_embedding)

    print("Similarity Score:", similarity)

    if similarity > 0.75:
        return jsonify({
            "message": "Authentication Successful",
            "similarity": float(similarity)
        }), 200
    else:
        return jsonify({"error": "Face mismatch"}), 401


# -----------------------------------
# RUN SERVER
# -----------------------------------
if __name__ == "__main__":
    app.run(debug=True)
