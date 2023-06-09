import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer >
    <div className="container text-center ">
    <div className="footer bg-light">
      
        <p className="font-italic text-muted mb-0">
          &copy;{" "}
          <span className="copyright">
            {new Date().getFullYear()} NFThouse All rights reserved to Foram and Gaurav .
          </span>
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
