import { useState } from "react";
import axios from "axios";
import CameraCapture from "../components/CameraCapture";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // STEP 1 → CHECK USER
  // -----------------------------
  const handleNext = async () => {
    if (!email) {
      setError("Enter email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/check-user", {
        email
      });

      if (res.data.exists) {
        setStep(2);
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // STEP 2 → FACE LOGIN
  // -----------------------------
  const handleLogin = async () => {
    if (!image) {
      setError("Please capture your face first");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/login", {
        email,
        image
      });

      alert("Login Successful 🎉");
      navigate("/dashboard"); // change if needed
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Login</h2>

        {/* STEP 1 - EMAIL */}
        {step === 1 && (
          <>
            <input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleNext} disabled={loading}>
              {loading ? "Checking..." : "Next"}
            </button>

            <p>
              New User? <Link to="/register">Create Account</Link>
            </p>
          </>
        )}

        {/* STEP 2 - FACE CAPTURE */}
        {step === 2 && (
          <>
            <p>Capture Face for Authentication</p>

            <CameraCapture setImage={setImage} />

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Verifying..." : "Verify Face & Login"}
            </button>
          </>
        )}

        {/* ERROR MESSAGE */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
