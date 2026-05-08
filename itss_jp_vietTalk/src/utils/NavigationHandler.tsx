import { useNavigate } from "react-router-dom";
export const goToHome = () => {
    const navigate = useNavigate();
    navigate("/");
    };
export default goToHome;