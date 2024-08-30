import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Images/logo.png";
import fan from "./Images/newfan.png";
import { FaHome, FaSyncAlt, FaChartBar, FaUser } from "react-icons/fa";

function CheckIn() {
  return (
    <section id="checkIn" className="checkIn">
      <div className="container">
        <img src={logo} className="logo" />
      </div>

      <div className="container">
        <div className="row fan-row">
          <img src={fan} alt="fan image" className="fan"></img>
          <h1 className="fan-h1">Check-in</h1>
        </div>
      </div>

      <div className="container checkin-cnt">
        <h1 className="xp-text">+100 XP</h1>
        <button
                  className="btn btn-dark point"
                  style={{
                    padding: "15px 60px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(to bottom right, #17e6eb 0%, #1160d9 100%)",
                    marginTop: "10px",
                  }}
                >
                  Claim &gt;
                </button>
      </div>

      <div className="menuContainer">
        <div className="iconContainer">
          <FaHome className="icon" />
        </div>
        <div className="iconContainer">
          <FaSyncAlt className="icon" />
        </div>
        <div className="iconContainer">
          <FaChartBar className="icon active" />
        </div>
        <div className="iconContainer">
          <FaUser className="icon" />
        </div>
      </div>
    </section>
  );
}

export default CheckIn;
