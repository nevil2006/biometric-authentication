import { useRef, useState } from "react";
import Webcam from "react-webcam";

function CameraCapture({ setImage }) {
  const webcamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const startCamera = () => {
    setCameraOn(true);
  };

  const handleCapture = () => {
    if (!webcamRef.current || !cameraReady) {
      alert("Camera not ready. Please wait...");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) {
      alert("Failed to capture image.");
      return;
    }

    setImage(imageSrc);

    // Stop camera stream properly
    const stream = webcamRef.current.video.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    setCameraOn(false);
    setCameraReady(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {!cameraOn ? (
        <button onClick={startCamera}>
          Start Camera
        </button>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
            videoConstraints={{ facingMode: "user" }}
            onUserMedia={() => setCameraReady(true)}
          />

          <br /><br />

          <button 
            onClick={handleCapture}
            disabled={!cameraReady}
          >
            {cameraReady ? "Capture" : "Loading Camera..."}
          </button>
        </>
      )}
    </div>
  );
}

export default CameraCapture;
