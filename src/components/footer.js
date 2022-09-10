import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {
  return (
    <footer className="footer margin-top">
      <div className="footer-layout container">
        <div className="footer-rectangle" />
        <div className="footer-head">
          <img
            className="footer-logo"
            src={"/assets/shared/desktop/logo.svg"}
          />
          <div className="footer-links">
            <Link className="footer-link" to="/">
              HOME
            </Link>
            <Link
              className="footer-link"
              to="/category/headphones"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              HEADPHONES
            </Link>
            <Link
              className="footer-link"
              to="/category/speakers"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              SPEAKERS
            </Link>
            <Link
              className="footer-link"
              to="/category/earphones"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              EARPHONES
            </Link>
          </div>
        </div>
        <div className="footer-content">
          <div className="footer-paragraphs">
            <p className="footer-description">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we’re open 7 days a week.
            </p>
            <div className="footest">
              <p className="footer-rights">
                Copyright 2021. All Rights Reserved
              </p>
              <div className="footer-icons footer-icons-mobile">
                <a className="footer-icon">
                  <img src={"/assets/shared/desktop/icon-facebook.svg"} />
                </a>
                <a className="footer-icon">
                  <img src={"/assets/shared/desktop/icon-twitter.svg"} />
                </a>
                <a className="footer-icon">
                  <img src={"/assets/shared/desktop/icon-instagram.svg"} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-icons footer-icons-nomobile">
            <a className="footer-icon">
              <img src={"/assets/shared/desktop/icon-facebook.svg"} />
            </a>
            <a className="footer-icon">
              <img src={"/assets/shared/desktop/icon-twitter.svg"} />
            </a>
            <a className="footer-icon">
              <img src={"/assets/shared/desktop/icon-instagram.svg"} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
