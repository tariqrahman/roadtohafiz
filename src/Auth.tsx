import { useState } from "react";
import { supabase } from "./services/supabaseClient";
import LoginForm from "./components/auth/LoginForm";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      setOtpSent(true);
      alert("Check your email for the OTP");
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Successfully logged in");
      // Handle successful login, e.g., redirect or update state
    }

    setLoading(false);
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <form
          className="form-widget"
          onSubmit={otpSent ? handleVerifyOtp : handleLogin}
        >
          <LoginForm
            inputVal={otpSent ? otp : email}
            setInputVal={otpSent ? setOtp : setEmail}
            placeHolder={otpSent ? "Enter OTP" : "Enter email address"}
          />

          <div>
            <button className={"button block"} disabled={loading}>
              {loading ? (
                <span>Loading</span>
              ) : (
                <span>{otpSent ? "Verify OTP" : "Send magic link"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
