import { Link } from "react-router-dom";
//import { background, homeBtn, home_span } from "../styles/LandingPage.module.css";
import { background, homeBtn, home_span } from "./LandingPage.module.css";
function LandingPage() {
  return (
    <div className={background}>
      <Link to="/countries">
        <div className={homeBtn}></div>
        <span className={home_span}>Home</span>
      </Link>
    </div>
  );
}

export default LandingPage;
