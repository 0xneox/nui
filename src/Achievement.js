import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Images/logo.png";
import coin from "./Images/achievementCoin.png";
import {
  FaHome,
  FaSyncAlt,
  FaChartBar,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";

function Achievement() {
  return (
    <section id="Achievement" className="Achievement">
      <div className="container">
        <img src={logo} className="logo" />
      </div>

      <div className="container">
        <img src={coin} alt="fan image" className="fan"></img>
      </div>

      <div className="container achievement-cnt">
        <a href="#" className="earn-button quest-btn">
          7 Daily Quest
        </a>
        <h1 className="leader-h1 timer-h1 quest-h1">19 : 12 : 49</h1>
      </div>

      <div className="quest-page">
        <div className="header">
          <div className="dropdown">
            Daily Quest{" "}
            <FaChevronDown className="icon down-arw"></FaChevronDown>
          </div>
          {/* <div className="xp-earned">
          350 XP earned
        </div> */}
          <a href="#" className="copy-button xp-earned">
            350 XP earned
          </a>
        </div>

        <div className="tabs">
          <div className="tab quest-tab">
            <span className="icon">💎</span> Quest
          </div>
          <div className="tab achievement-tab active">
            <span className="icon">🎖️</span> Achievement
          </div>
        </div>

        <div className="content">
          <div className="check-in">
            Check-in Bonus <br />
            <span className="count">Count: 4</span>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6 achievement-col acol-1">
              <h1 className="content-h1">10XP</h1>
              <p className="content-p">3/5</p>
              <a
                href="#"
                className="copy-button xp-earned collect-btn"
                style={{ marginTop: "50px" }}
              >
                Collect
              </a>
            </div>
            <div className="col-6 achievement-col acol-2">
              <h1 className="content-h1">100XP</h1>
              <p className="content-p">3/5</p>
              <a href="#" className="copy-button xp-earned collect-btn">
                Collect
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-6 achievement-col acol-1">
              <h1 className="content-h1">20XP</h1>
              <p className="content-p">3/5</p>
              <a
                href="#"
                className="copy-button xp-earned collect-btn"
                style={{ marginTop: "50px" }}
              >
                Collect
              </a>
            </div>
            <div className="col-6 achievement-col acol-2">
              <h1 className="content-h1">500XP</h1>
              <p className="content-p">3/5</p>
              <a href="#" className="copy-button xp-earned collect-btn">
                Collect
              </a>
            </div>
          </div>
        </div>
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

export default Achievement;
