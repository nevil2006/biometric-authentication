from deepface import DeepFace
import base64
import numpy as np
import cv2

def generate_embedding(base64_image):
    header, encoded = base64_image.split(",", 1)
    img_bytes = base64.b64decode(encoded)
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    embedding = DeepFace.represent(
        img_path = img,
        model_name = "Facenet",
        enforce_detection = False
    )[0]["embedding"]

    return np.array(embedding)
