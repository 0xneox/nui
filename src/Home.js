import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaHome, FaSyncAlt, FaChartBar, FaUser, FaCog } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import homeUser from "./Images/home_user.png";
import home_gpu from "./Images/home_gpu.png";
import logo from "./Images/logo.png";
import coin from "./Images/coin.png";
import "./index.css";

function Home() {
  return (
    <section className="home">
      <div className="container">
        <img src={logo} className="logo" />
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

      <div className="container-fluid">
        <div className="row xp-row">
          <div className="col-md-4 col-4 col-sm-4 col-lg-4 xp-col-1">
            <p className="home-p">
              XP
            </p>
            <h1 className="home-h1">
              17,200
            </h1>
          </div>
          <div className="col-md-4 col-4 col-sm-4 col-lg-4">
            
            </div>
            <div className="col-md-4 col-4 col-sm-4 col-lg-4">
              <button className="btn btn-dark point" style={{
                padding:"12px 30px",
                fontWeight:"700",
                background: "linear-gradient(to bottom right, #17e6eb 0%, #1160d9 100%)",
                marginTop:"10px"
              }}>
               <img src={coin} className="coin-home-img" /> 1000
              </button>
            </div>
        </div>
      </div>
      <div className="container" style={{textAlign:"center"}}>
      
        <img src={home_gpu} className="home-bg"></img><br></br>
        <button type="button" class="btn btn-dark earn-btn" style={{padding:"6px 30px", borderRadius:"40px"}}>
          Earn
        </button>
      
      </div>
      <div className="menuContainer">
        <div className="iconContainer">
          <FaHome className="icon active" />
        </div>
        <div className="iconContainer">
          <FaSyncAlt className="icon" />
        </div>
        <div className="iconContainer">
          <FaChartBar className="icon" />
        </div>
        <div className="iconContainer">
          <FaUser className="icon" />
        </div>
      </div>
    </section>
  );
}

export default Home;
