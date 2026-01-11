import { useState, useEffect } from "react";

const SESSION_ID_KEY = "risk_assessment_session_id";

const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let storedId = localStorage.getItem(SESSION_ID_KEY);
    
    if (!storedId) {
      storedId = generateSessionId();
      localStorage.setItem(SESSION_ID_KEY, storedId);
    }
    
    setSessionId(storedId);
  }, []);

  return sessionId;
};
