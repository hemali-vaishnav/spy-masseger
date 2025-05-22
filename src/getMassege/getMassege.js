import React, { useEffect, useState } from "react";
import "./getMassege.css";
import { useParams } from "react-router-dom";

export default function GetMessage() {
  const { uuid } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/message-receive/${uuid}`
        );

        const data = await response.json();

        if (response.ok) {
          console.log(data.message || "No message found.");
        }
      } catch (err) {
        console.log("Failed to retrieve message.");
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="message-container">
      <div>
        <h2>
          Secret Message: <span>{message}</span>
        </h2>
      </div>
    </div>
  );
}
