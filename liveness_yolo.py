from ultralytics import YOLO

# Load YOLOv8 liveness model
model = YOLO(r"C:\Users\ADMIN\OneDrive\Desktop\biometric autheication\best.pt")

def detect_liveness(frame):
    results = model(frame, conf=0.5)[0]

    detections = []

    for box, cls, conf in zip(
        results.boxes.xyxy,
        results.boxes.cls,
        results.boxes.conf
    ):
        x1, y1, x2, y2 = map(int, box)
        label = int(cls)

        # NOTE: Check label mapping once
        # 0 = SPOOF, 1 = LIVE (usually)
        if label == 1:
            status = "LIVE"
            access = "ACCESS GRANTED"
            color = (0, 255, 0)
        else:
            status = "SPOOF"
            access = "ACCESS DENIED"
            color = (0, 0, 255)

        detections.append({
            "bbox": (x1, y1, x2, y2),
            "status": status,
            "access": access,
            "color": color
        })

    return detections
