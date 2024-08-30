import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import first from "./Images/first.png";
import second from "./Images/second.png";
import third from "./Images/third.png";
import trophy from "./Images/trophy.png";
import coin from "./Images/coin.png";
import light from "./Images/lightening.png";
import table_user from "./Images/table-user.png";
import { FaHome, FaSyncAlt, FaChartBar, FaUser } from "react-icons/fa";

function Leaderboard() {
  return (
    <>
      <section className="leaderboard">
        <div className="container">
          <div className="leaderboard-banner">
            <h1 className="leader-h1">Wall of Fame</h1>
            <p className="leader-p">
              Play games <span className="bold">daily</span> and stand a chance
              <br /> to <span className="bold">win rewards!</span>
            </p>
            <img src={trophy} className="trophy-img" alt="trophy image" />
          </div>

          <div className="leaderboard-timer">
            <p className="leader-p">The leaderboard will reset in :</p>
            <h1 className="leader-h1 timer-h1">00 : 00 : 00</h1>
          </div>

          <div className="row leader-row">
            <div className="col-md-4 col-4 col-sm-4 col-lg-4 bottom-user">
              <img src={first} className="user-img" />
              <h3 className="username">Meghan Jes...</h3>
              <p className="balance">
                <img src={coin} className="table-coin" /> 2.5k Gold
              </p>
            </div>
            <div className="col-md-4 col-4 col-sm-4 col-lg-4">
              <img src={second} className="user-img first-rank" />
              <h3 className="username">Bryan Wolf</h3>
              <p className="balance">
                <img src={coin} className="table-coin" /> 5k Gold
              </p>
            </div>
            <div className="col-md-4 col-4 col-sm-4 col-lg-4 bottom-user">
              <img src={third} className="user-img" />
              <h3 className="username">Alex Turner</h3>
              <p className="balance">
                <img src={coin} className="table-coin" /> 2.5k Gold
              </p>
            </div>
          </div>

          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Username(12.6k)</th>
                <th scope="col">Total Power</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>
               
                  <img src={table_user} className="table-user" /> Marsha Fisher
                </td>
            
                <td>
                 
                  <img src={light} className="table-light" /> 35000
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>
                
                  <img src={table_user} className="table-user" /> Marsha Fisher
                </td>
               
                <td>
                
                  <img src={light} className="table-light" /> 35000
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>
              
                  <img src={table_user} className="table-user" /> Marsha Fisher
                </td>
              
                <td>
                
                  <img src={light} className="table-light" /> 35000
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>
                 
                  <img src={table_user} className="table-user" /> Marsha Fisher
                </td>
              
                <td>
                 
                  <img src={light} className="table-light" /> 35000
                </td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>
             
                  <img src={table_user} className="table-user" /> Marsha Fisher
                </td>
               
                <td>
                
                  <img src={light} className="table-light" /> 35000
                </td>
              </tr>
            </tbody>
          </table>
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

export default Leaderboard;
