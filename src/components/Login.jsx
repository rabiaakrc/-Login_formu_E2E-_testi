import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Geçerli bir email giriniz.";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Şifre en az 8 karakter, bir büyük harf ve bir sayı içermelidir.";
    }

    if (!termsAccepted) {
      newErrors.terms = "Şartları kabul etmelisiniz.";
    }

    setErrors(newErrors);

    // Hata yoksa yönlendir
    if (Object.keys(newErrors).length === 0) {
      navigate("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-message email-error">{errors.email}</p>}
      </div>

      <div>
        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-message password-error">{errors.password}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          Şartları kabul ediyorum
        </label>
        {errors.terms && <p className="error-message terms-error">{errors.terms}</p>}
      </div>

      <button type="submit" disabled={!email || !password || !termsAccepted}>
        Giriş Yap
      </button>
    </form>
  );
};

export default Login;
