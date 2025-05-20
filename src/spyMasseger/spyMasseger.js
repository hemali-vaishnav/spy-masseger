import React, { useState } from "react";
import "./spyMasseger.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SpyMessenger() {
  const [message, setMessage] = useState("");
  const [expireMinutes, setExpireMinutes] = useState(10);
  const [oneTimeView, setOneTimeView] = useState(true);
  const [generatedLink, setGeneratedLink] = useState("");
  const navigate = useNavigate();

  const handleGenerateLink = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/send-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            expiresInMinutes: expireMinutes,
            oneTimeView,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Link generated!", data.link || "View your secret message.");
        setGeneratedLink(data.link);
      } else {
        Swal.fire("Error:", data.message || JSON.stringify(data));
      }
    } catch (error) {
      console.error("Network error:", error);
      Swal.fire("Network error", error.message);
    }
  };

   const handleOpenMessage = (e) => {
       navigate(`/:uuid`);
  };

  return (
    <div className="spy-container">
      <div className="spy-card">
        <h2 className="spy-title">Secret Message Drop</h2>

        <form onSubmit={handleGenerateLink}>
          <label className="spy-subtitle">Create Secret Message</label>
          <textarea
            placeholder="Your secret message will self-destruct after being read once or after a time limit."
            className="spy-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="spy-row">
            <label>Expire after (minutes):</label>
            <input
              type="number"
              min="1"
              value={expireMinutes}
              onChange={(e) => setExpireMinutes(Number(e.target.value))}
              className="spy-input"
              required
            />
          </div>

          <div className="spy-checkbox-row">
            <input
              type="checkbox"
              checked={oneTimeView}
              onChange={() => setOneTimeView(!oneTimeView)}
            />
            <label>One-time view</label>
          </div>

          <button type="submit" className="spy-button">
            Generate Link
          </button>
        </form>

        {generatedLink && (
          <div className="spy-link">
            <span>🔗</span>
            <a href={generatedLink} onClick={handleOpenMessage}>
              {generatedLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
