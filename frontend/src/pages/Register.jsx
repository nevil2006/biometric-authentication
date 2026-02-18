import { useState } from "react";
import axios from "axios";
import CameraCapture from "../components/CameraCapture";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [image, setImage] = useState(null);

  const fullPhone = countryCode + phone;

  // -----------------------------
  // SEND OTP
  // -----------------------------
  const handleSendOtp = async () => {
    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/send-otp", {
        phone: fullPhone
      });

      setStep(2);
    } catch (err) {
      alert("OTP Send Failed");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // VERIFY OTP
  // -----------------------------
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/verify-otp", {
        phone: fullPhone,
        otp
      });

      setStep(3);
    } catch (err) {
      alert("Invalid or Expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // FINAL REGISTER
  // -----------------------------
  const handleRegister = async () => {
    if (!image) {
      alert("Please capture face");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/register", {
        name,
        email,
        phone: fullPhone,
        image
      });

      alert("Registration Successful 🎉");
      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Create Account</h2>

        {/* STEP 1 - USER DETAILS */}
        {step === 1 && (
          <>
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="phone-row">
              <input
                className="code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
              <input
                className="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button onClick={handleSendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <p>
              Already have account? <Link to="/">Login</Link>
            </p>
          </>
        )}

        {/* STEP 2 - OTP VERIFICATION */}
        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={handleVerifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 - FACE CAPTURE */}
        {step === 3 && (
          <>
            <p>Capture Face for Registration</p>

            <CameraCapture setImage={setImage} />

            <button onClick={handleRegister} disabled={loading}>
              {loading ? "Processing..." : "Complete Registration"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
