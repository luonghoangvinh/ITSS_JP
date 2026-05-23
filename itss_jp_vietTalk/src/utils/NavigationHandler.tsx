import { useNavigate } from "react-router-dom";
export const goToHome = () => {
    const navigate = useNavigate();
    navigate("/");
    };

export const goToLevelSelect=()=>{
    const navigate = useNavigate();
    navigate("/home/levelselect");
}