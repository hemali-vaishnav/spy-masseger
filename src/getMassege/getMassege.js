/* GetMessage.jsx */
import React, { useState } from "react";
import "./getMassege.css";
import { useParams } from "react-router-dom";

export default function GetMessage() {
  const { uuid } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleClick = async () => {
    setShowMessage(false);
    setLoading(true);

    const count = 600;
    const newHearts = Array.from({ length: count }).map(() => {
      const translateX = (Math.random() - 0.5) * 500;
      const translateY = -(300 + Math.random() * 300);
      const duration = 1.5 + Math.random() * 1.5;
      const delay = Math.random() * 0.5;
      const size = 10 + Math.random() * 15;

      return {
        id: Math.random().toString(36).substr(2, 9),
        translateX,
        translateY,
        duration,
        delay,
        size,
      };
    });

    setHearts(newHearts);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users/message-receive/${uuid}`
      );
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "No message found.");
      } else {
        setError(data.message || "Failed to retrieve message.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setShowMessage(true), 2000);
      setTimeout(() => setHearts([]), 4000);
    }
  };

  return (
    <div className="container">
      <button className="heart-button" onClick={handleClick}>
        ❤️ Click me!
      </button>

      {/* Hearts */}
      <div className="hearts-container">
        {hearts.map(({ id, translateX, translateY, duration, delay, size }) => (
          <span
            key={id}
            className="heart"
            style={{
              fontSize: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              transform: `translate(0, 0)`,
              "--translateX": `${translateX}px`,
              "--translateY": `${translateY}px`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Message */}
      {showMessage && (
        <div className="message-box">
          {loading ? "Loading…" : error ? `Error: ${error}` : message}
        </div>
      )}
    </div>
  );
}
