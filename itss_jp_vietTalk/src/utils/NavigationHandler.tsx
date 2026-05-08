import { useNavigate } from "react-router-dom";
const goToHome = () => {
    const navigate = useNavigate();
    navigate("/");
    };
export default goToHome;