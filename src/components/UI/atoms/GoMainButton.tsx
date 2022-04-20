import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

/**
 * 메인으로 가는 버튼
 */
function GoMainButton() {
  const navigate = useNavigate();

  const handleGoMain = () => {
    navigate("/");
  };

  return (
    <Button variant="contained" size="large" onClick={handleGoMain}>
      Main
    </Button>
  );
}

export default GoMainButton;
