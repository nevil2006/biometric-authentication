from ultralytics import YOLO
import base64
import numpy as np
import cv2

model = YOLO("best.pt")   # path to model

def check_liveness(base64_image):
    header, encoded = base64_image.split(",", 1)
    img_bytes = base64.b64decode(encoded)
    nparr = np.frombuffer(img_bytes, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model(frame)

    for r in results:
        for box in r.boxes:
            cls = int(box.cls[0])
            confidence = float(box.conf[0])

            # Example class mapping
            # 0 = real
            # 1 = fake
            if cls == 0 and confidence > 0.7:
                return True

    return False
