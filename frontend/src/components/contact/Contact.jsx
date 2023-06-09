import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import { FaLinkedin } from "react-icons/fa";
import sir from "../../assets/sir2.jpg"
// import sir from "../../assets/sir.jpg"
import foram from "../../assets/fora.jpg"
import gaurav from "../../assets/gaurav.jpg"

const Contact = () => {
  return (
    <>
      <div>
        <div className="bg-white">
          <div className="container">
            <div className="row h-100 align-items-center"></div>
          </div>
        </div>

        <div className="bg-light py-5">
          <div className="container py-5">
            <div className="row mb-4">
              <div className="col-lg-7">
                <h2 className="ourTeam display-4 font-weight-light">
                  <center>
                    <font size="8">Our Team</font>
                  </center>
                </h2>
                <br />
                <center>
                  <p className="font-italic text-muted">
                    <font size="4">
                      {" "}
                      This Project is created by Foram Dalsaniya And Gauravkumar
                      Bilandani under the guidance of their Mentor Pratik
                      Limbachiya.
                    </font>
                  </p>
                </center>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src={sir}
                    alt=""
                    width="100"
                    height="130"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <br />
                  <h2 className="mb-0">
                    <b>Pratik Limbachiya</b>
                  </h2>
                  <br />
                  <span className="small text-uppercase text-muted">
                    Senior Blockchain Developer
                  </span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <Link
                        to="https://www.linkedin.com/in/pratik-limbachiya-984573128/"
                        className="social-link"
                      >
                        <FaLinkedin />
                      </Link>
                    </li>
                  </ul>
                  <br />
                  <b>Contact my Mentor</b>
                </div>
              </div>
              <br />
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src={foram}
                    alt=""
                    width="100"
                    height="130"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <br />
                  <h2 className="mb-0">Foram Dalsaniya</h2>
                  <br />
                  <span className="small text-uppercase text-muted">
                    Web3 Developer (Intern)
                  </span>
                  <br />
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <Link
                        to="https://www.linkedin.com/in/dalsaniya-foram-223a2624b/"
                        className="social-link"
                      >
                        <FaLinkedin />
                      </Link>
                    </li>
                  </ul>
                  <br />
                  <b>Contact me</b>
                </div>
              </div>
              <br />
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src={gaurav}
                    alt=""
                    width="100"
                    height="130"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <br />
                  <h2 className="mb-0">Gauravkumar Bilandani</h2>
                  <br />
                  <span className="small text-uppercase text-muted">
                    Web3 Developer (Intern)
                  </span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <Link
                        to="https://www.linkedin.com/in/gauravkumar-bilandani-4490a4244/"
                        className="social-link">

                        <FaLinkedin />
                      </Link>
                    </li>
                  </ul>
                  <br/>
                  <b>Contact me</b>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default Contact;
