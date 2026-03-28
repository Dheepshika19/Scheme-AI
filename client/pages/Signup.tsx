import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to role selection page
    navigate("/signup/role");
  }, [navigate]);

  return null;
}
