import cv2
from camera import get_camera
from liveness_yolo import detect_liveness

cap = get_camera()

print(" Biometric Authentication Started")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    detections = detect_liveness(frame)

    for det in detections:
        x1, y1, x2, y2 = det["bbox"]
        status = det["status"]
        access = det["access"]
        color = det["color"]

        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        cv2.putText(frame, status, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

        cv2.putText(frame, access, (30, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

    cv2.imshow("Face Liveness Authentication", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
