import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Images/logo.png";
import coin from "./Images/achievementCoin.png";
import questIcon from "./Images/questIcon.png";
import {
  FaHome,
  FaSyncAlt,
  FaChartBar,
  FaUser,
  FaChevronDown,
  FaLock,
} from "react-icons/fa";

function Quest() {
  return (
    <section id="Quest" className="Quest">
      <div className="container">
        <img src={logo} className="logo" />
      </div>

      <div className="container">
        <img src={coin} alt="fan image" className="fan"></img>
      </div>

      <div className="quest-page quest-mypage">
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
          <div className="tab quest-tab active">
            <span className="icon">💎</span> Quest
          </div>
          <div className="tab achievement-tab">
            <span className="icon">🎖️</span> Achievement
          </div>
        </div>
      </div>

      <div className="container quest-cnt">
          <div className="row invite-row">
            <div className="col-0.5"></div>
            <div className="col-11 invite-section">
              <div className="row">
                <div className="col-2">
                    <img src={questIcon} className="quest-ic"></img>
                </div>

                <div className="col-6">
                    <h1 className="coin-name follow">
                        Follow
                    </h1>
                    <p className="twitter-acc">
                        Follow our Twitter Account
                    </p>
                </div>

                <div className="col-4" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point claim-btn"
                  style={{
                    padding: "12px 20px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(to bottom right, #17e6eb 0%, #1160d9 100%)",
                    marginTop: "0px",
                    textAlign: "right",
                    position:"relative",
                    top:"14px"
                  }}
                >
                  Claim &gt;
                </button>
                </div>
              </div>
            </div>
            <div className="col-0.5"></div>
          </div>

          <div className="row invite-row">
            <div className="col-0.5"></div>
            <div className="col-11 invite-section">
              <div className="row">
                <div className="col-2">
                    <img src={questIcon} className="quest-ic"></img>
                </div>

                <div className="col-6">
                    <h1 className="coin-name follow">
                        Follow
                    </h1>
                    <p className="twitter-acc">
                        Follow our Twitter Account
                    </p>
                </div>

                <div className="col-4" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point claim-btn"
                  style={{
                    padding: "12px 20px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(to bottom right, #17e6eb 0%, #1160d9 100%)",
                    marginTop: "0px",
                    textAlign: "right",
                    position:"relative",
                    top:"14px"
                  }}
                >
                  Claim &gt;
                </button>
                </div>
              </div>
            </div>
            <div className="col-0.5"></div>
          </div>

          <div className="row invite-row">
            <div className="col-0.5"></div>
            <div className="col-11 invite-section">
              <div className="row">
                <div className="col-2">
                    <img src={questIcon} className="quest-ic"></img>
                </div>

                <div className="col-6">
                    <h1 className="coin-name follow">
                        Follow
                    </h1>
                    <p className="twitter-acc">
                        Follow our Twitter Account
                    </p>
                </div>

                <div className="col-4" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point claim-btn"
                  style={{
                    padding: "12px 20px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(to bottom right, #17e6eb 0%, #1160d9 100%)",
                    marginTop: "0px",
                    textAlign: "right",
                    position:"relative",
                    top:"14px"
                  }}
                >
                  Claim &gt;
                </button>
                </div>
              </div>
            </div>
            <div className="col-0.5"></div>
          </div>


          <div className="row invite-row">
            <div className="col-0.5"></div>
            <div className="col-11 invite-section">
              <div className="row">
                <div className="col-2">
                    <img src={questIcon} className="quest-ic"></img>
                </div>

                <div className="col-6">
                    <h1 className="coin-name follow">
                        Follow
                    </h1>
                    <p className="twitter-acc">
                        Follow our Twitter Account
                    </p>
                </div>

                <div className="col-4" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point"
                  style={{
                    padding: "12px 20px",
                    fontWeight: "700",
                    background:"white",
                    marginTop: "0px",
                    textAlign: "right",
                    position:"relative",
                    color:"black",
                    top:"13px"
                  }}
                >
                  Locked <FaLock className="lock-icon" />
                </button>
                </div>
              </div>
            </div>
            <div className="col-0.5"></div>
          </div>
          <div className="row invite-row">
            <div className="col-0.5"></div>
            <div className="col-11 invite-section">
              <div className="row">
                <div className="col-2">
                    <img src={questIcon} className="quest-ic"></img>
                </div>

                <div className="col-6">
                    <h1 className="coin-name follow">
                        Follow
                    </h1>
                    <p className="twitter-acc">
                        Follow our Twitter Account
                    </p>
                </div>

                <div className="col-4" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point"
                  style={{
                    padding: "12px 20px",
                    fontWeight: "700",
                    background:"gray",
                    marginTop: "0px",
                    textAlign: "right",
                    position:"relative",
                    top:"13px"
                  }}
                >
                  Claimed &gt;
                </button>
                </div>
              </div>
            </div>
            <div className="col-0.5"></div>
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

export default Quest;