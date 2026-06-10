import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import './SignUp.css';
import vietTalkLogoImage from "../../assets/Viettalkpic.jpg";
// Using the logo image

export function SignUp() {
  const [formData, setFormData] = useState({
    userName: '',
    gmail: '',
    password: '',
    confirmPassword: '',
  });
  const API_BASE = import.meta.env.VITE_API_URL || '';
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('パスワードが一致しません。');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.userName,
          gmail: formData.gmail,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || 'Signup failed';
        throw new Error(message);
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      navigate('/home');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'サインアップに失敗しました。');
    }
  };

  return (
    <div className="signup-container h-full w-full flex">
      <div className="signup-left w-3/5">
        <div className="brand-section">
          <h1 className="brand-title">VietTalk</h1>
          <p className="brand-subtitle">VietTalkはベトナムとつながる。</p>
        </div>
        <img src={vietTalkLogoImage} alt="VietTalk Logo" className="main-visual-image" />
      </div>

      <div className="signup-right w-2/5 bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-center">
        <div className="form-wrapper w-full max-w-xs">
          <form onSubmit={handleSubmit} className="form">
            <h2 className="form-title">新規登録</h2>

            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="userName" className="form-label">ユーザー名</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="viet_talker"
                  value={formData.userName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* gmail Field */}
            <div className="form-group">
              <label htmlFor="gmail" className="form-label">メールアドレス</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  placeholder="example@gmail.com"
                  value={formData.gmail}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">パスワード</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">パスワード（確認）</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              登録
              <span className="arrow">→</span>
            </button>

            {/* Divider */}
            <div className="divider">
              <span>または</span>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <button type="button" className="social-btn google">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="social-btn facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Login Link */}
            <div className="login-link">
              <p>すでにアカウントをお持ちですか？<Link to="/login">ログイン</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
