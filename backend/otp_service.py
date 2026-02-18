from twilio.rest import Client
import random
from datetime import datetime, timedelta

otp_storage = {}

def send_otp(client, phone, twilio_number):
    otp = str(random.randint(100000, 999999))
    expiry = datetime.now() + timedelta(minutes=5)

    otp_storage[phone] = {
        "otp": otp,
        "expiry": expiry
    }

    client.messages.create(
        body=f"Your OTP is {otp}. Valid for 5 minutes.",
        from_=twilio_number,
        to=phone
    )

def verify_otp(phone, user_otp):
    if phone not in otp_storage:
        return False

    stored = otp_storage[phone]

    if datetime.now() > stored["expiry"]:
        del otp_storage[phone]
        return False

    if stored["otp"] == user_otp:
        del otp_storage[phone]
        return True

    return False
