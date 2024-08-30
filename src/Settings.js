import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Images/logo.png";
import coin from "./Images/achievementCoin.png";
import questIcon from "./Images/questIcon.png";
import homeUser from "./Images/home_user.png";
import {
  FaHome,
  FaSyncAlt,
  FaChartBar,
  FaUser,
  FaChevronDown,
  FaLock,
  FaCog
} from "react-icons/fa";

function Settings() {
  return (
    <section id="Settings" className="Settings">
     
<div className="container">
      <div className="row">
          <div className="col-md-5 col-5 col-sm-5 col-md-5">
            <div className="row">
              <div className="col-md-4 col-4 col-sm-4 col-lg-4">
                <img src={homeUser} className="home_user" />
              </div>
              <div className="col-md-8 col-8 col-sm-8 col-lg-8">
                <h4 className="user-name">Gokul Ravi</h4>
                <p className="level">Level: CP1</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-3 col-sm-3 col-md-3">

          </div>
          <div className="col-md-4 col-4 col-sm-4 col-md-4 referral-right">
          <div className="referral-info">
          <div className="referrals">
            Referrals: 6
          </div>
          <FaCog className="settings-icon" />
        </div>
          </div>
        </div>
        </div>

        <div className="container">
            <form action="post" ></form>
        </div>
    </section>


  );
}

export default Settings;
