"use client";

import React, { useState } from 'react';
import styles from './styles.module.css';
import { FaGoogle, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  
  const router=useRouter();

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPass: "",
    userTypeId: "688527b160ff9a18b84ecdb4" 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { userName, userEmail, userPass, userTypeId } = formData;

    if (!userName || !userEmail || !userPass || !userTypeId) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, userEmail, userPass, userTypeId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("✅ User Registered Successfully");
      setIsSignUpActive(false);
    } catch (err) {
      console.error("Registration Error:", err);
      alert("❌ Internal Server Error");
    }
  };

  // Handle Sign In (Login)
  // const handleSignInSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const { userEmail, userPass } = formData;

  //   if (!userEmail || !userPass) {
  //     alert("Please fill in email and password");
  //     return;
  //   }

  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ userEmail, userPass }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       alert(data.message || "Invalid credentials");
  //       return;
  //     }

  //     alert("✅ Login Successful");
  //     router.push("/complete-profile");      

  //   } catch (err) {
  //     console.error("Login Error:", err);
  //     alert("❌ Internal Server Error");
  //   }
  // };
  const handleSignInSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { userEmail, userPass } = formData;

  if (!userEmail || !userPass) {
    alert("Please fill in email and password");
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail, userPass }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Invalid credentials");
      return;
    }

    alert("✅ Login Successful");
    router.push(data.redirect); // <-- Use redirect path from server
    router.refresh();

  } catch (err) {
    console.error("Login Error:", err);
    alert("❌ Internal Server Error");
  }
};


  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.container} ${isSignUpActive ? styles.rightPanelActive : ''}`}>
        {/* Sign Up Form */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form className={styles.form} onSubmit={handleSignUpSubmit}>
            <h1 className={styles.title}>Create Account</h1>
            <input
              className={styles.input}
              type="text"
              name="userName"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="email"
              name="userEmail"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="password"
              name="userPass"
              placeholder="Password"
              onChange={handleChange}
            />
            <button className={styles.button} type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} onSubmit={handleSignInSubmit}>
            <h1 className={styles.title}>Sign In</h1>
            <input
              className={styles.input}
              type="text"
              name="userEmail"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="password"
              name="userPass"
              placeholder="Password"
              onChange={handleChange}
            />
            <a href="#" className={styles.link}>Forgot your password?</a>
            <button className={styles.button} type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.title}>Welcome Back!</h1>
              <p className={styles.paragraph}>To keep connected with us please login with your personal info</p>
              <button className={`${styles.button} ${styles.ghost}`} onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.title}>Hello, Friend!</h1>
              <p className={styles.paragraph}>Enter your personal details and start your journey with us</p>
              <button className={`${styles.button} ${styles.ghost}`} onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

