import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Images/logo.png";
import neurolovCoin from "./Images/neurolovCoin.png";
import { FaHome, FaSyncAlt, FaChartBar, FaUser, FaRegCopy } from "react-icons/fa";

function Invite() {
  return (
    <>
      <section className="invite">
        <div className="container">
          <img src={logo} className="logo" />
        </div>

        <div className="container">
          <div className="row">
            <img
              src={neurolovCoin}
              alt="fan image"
              className="invite-img"
            ></img>
            <h1 className="invite-h1">
              Invite Friends to <br /> Earn More
            </h1>
          </div>
        </div>

        <div className="container button-cnt">
        <a href="#" className="copy-button">
        <FaRegCopy className="icon copy-icon" /> Copy Code
    </a>
    <a href="#" className="earn-button">
      350 XP earned
    </a>
        </div>

        <div className="container invite-cnt">
          <div className="row invite-row">
            <div className="col-1"></div>
            <div className="col-10 invite-section">
              <div className="row">
                <div className="col-4">
                    <h1 className="xp-h1">
                      100XP
                    </h1>
                </div>

                <div className="col-3">
                    <h1 className="coin-name">
                        $NLOV
                    </h1>
                </div>

                <div className="col-5" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point"
                  style={{
                    padding: "12px 30px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(to bottom right, #17e6eb 0%, #1160d9 100%)",
                    marginTop: "0px",
                    textAlign: "right"
                  }}
                >
                  Claim &gt;
                </button>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="row invite-row">
            <div className="col-1"></div>
            <div className="col-10 invite-section">
              <div className="row">
                <div className="col-4">
                <h1 className="xp-h1">
                      100XP
                    </h1>
                </div>

                <div className="col-3">
                    <h1 className="coin-name">
                        $NLOV
                    </h1>
                </div>

                <div className="col-5" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point"
                  style={{
                    padding: "12px 30px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(to bottom right, #17e6eb 0%, #1160d9 100%)",
                    marginTop: "0px",
                    textAlign: "right"
                  }}
                >
                  Claim &gt;
                </button>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="row invite-row">
            <div className="col-1"></div>
            <div className="col-10 invite-section">
              <div className="row">
                <div className="col-4">
                <h1 className="xp-h1">
                      100XP
                    </h1>
                </div>

                <div className="col-3">
                    <h1 className="coin-name">
                        $NLOV
                    </h1>
                </div>

                <div className="col-5" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point"
                  style={{
                    padding: "12px 30px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(to bottom right, #17e6eb 0%, #1160d9 100%)",
                    marginTop: "0px",
                    textAlign: "right"
                  }}
                >
                  Claim &gt;
                </button>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="row invite-row">
            <div className="col-1"></div>
            <div className="col-10 invite-section">
              <div className="row">
                <div className="col-4">
                <h1 className="xp-h1">
                      100XP
                    </h1>
                </div>

                <div className="col-3">
                    <h1 className="coin-name">
                        $NLOV
                    </h1>
                </div>

                <div className="col-5" style={{textAlign: "right"}}>
                <button
                  className="btn btn-dark point"
                  style={{
                    padding: "12px 30px",
                    fontWeight: "700",
                    background:"gray",
                    marginTop: "0px",
                    textAlign: "right"
                  }}
                >
                  Claimed &gt;
                </button>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>

        <div className="container" style={{textAlign:"center"}}>
            <p className="invite-p">
            With each friend you invite, you can get upto <br /> 1000 XP and 10% of XP he earned.
            </p>
            <button className="invite-button">
      Invite Friends
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
    </>
  );
}

export default Invite;
