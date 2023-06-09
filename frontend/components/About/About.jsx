import React from "react";
import { Link } from "react-router-dom";
import './About.css'

const About = () => {
  return (
    <>
      <div>
        <div className="bg-white">
          <div className="container py-5">
            <div className="row h-100 align-items-center py-8">
              <div className="col-lg-6">
                <br></br>
                <h1 className="about display-4">
                  <center>
                    <font size="8">About</font>
                  </center>
                </h1>
                <br></br>
                <font size="5">
                  <p className="lead text-muted mb-0">
                    NFThouse Group is a full-service commercial
                    real estate firm with a special focus on nft's.
                  </p>
                </font>
                <font size="5">
                  <p className="lead text-muted ">
                    <br />
                    We believe the best approach to building structures begins
                    with building relationships and understanding a community’s
                    needs.We are firm believers in knowing, understanding, and
                    respecting the community’s values - and treating everyone.
                  </p>
                  <p className="lead text-muted mb-5">
                  <br/>
                    we come in contact with respect, honesty and integrity.
                    Connect with us today to discuss ways we can help you.
                  </p>
                </font>
              </div>
              <br />
              <div className="col-lg-6 d-none d-lg-block">
                <img
                  src="https://www.rmzcorp.com/assets/jpegs/about-us/our-connections.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
};

export default About;
