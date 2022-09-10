import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Cart from "./cart";

export default function Nav(props) {
  const [onCart, toggleCart] = useState(false);
  if (!onCart) {
    return (
      <Navbar
        home={props.home}
        load={props.load}
        toggleCart={() => toggleCart(!onCart)}
        disableCart={props.disableCart}
      />
    );
  } else {
    return (
      <div className="navAndCart">
        <Navbar
          home={props.home}
          load={props.load}
          toggleCart={() => toggleCart(!onCart)}
        />
        <div style={{ position: "relative" }}>
          <Cart device={props.device} close={() => toggleCart(false)} />
        </div>
      </div>
    );
  }
}

function Navbar(props) {
  const [onMenu, toggleMenu] = useState(false);

  function click(event) {
    const element = $(event.target);
    const clickOnMenu =
      element.parents(".nav-men").length > 0 ||
      element[0].className === "nav-menu" ||
      element[0].className === "nav-links" ||
      element[0].className === "nav-link";
    if (!clickOnMenu) {
      closeMenu();
    }
  }

  const openMenu = () => {
    toggleMenu(true);
  };

  const closeMenu = () => {
    toggleMenu(false);
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    if (props.home && scrollY == 0) {
      $("nav").addClass("nav-home");
    }
  });

  return (
    <nav className={"nav "}>
      <div className="nav-layout container">
        <button
          className="nav-open nav-open-mobile"
          onClick={openMenu}
          style={{ cursor: "pointer" }}
        >
          <img src={"/assets/shared/tablet/icon-hamburger.svg"} />
        </button>
        <div className="nav-logo">
          <button
            className="nav-open nav-open-tablet"
            onClick={openMenu}
            style={{ cursor: "pointer" }}
          >
            <img src={"/assets/shared/tablet/icon-hamburger.svg"} />
          </button>
          <img src={"/assets/shared/desktop/logo.svg"} />
        </div>
        <div className="nav-links">
          <Link className="nav-link" to="/">
            HOME
          </Link>
          <Link
            className="nav-link"
            to="/category/headphones"
            onClick={props.load}
          >
            HEADPHONES
          </Link>
          <Link
            className="nav-link"
            to="/category/speakers"
            onClick={props.load}
          >
            SPEAKERS
          </Link>
          <Link
            className="nav-link"
            to="/category/earphones"
            onClick={props.load}
          >
            EARPHONES
          </Link>
        </div>
        {props.disableCart ? (
          <button className="nav-cart disable-cart">
            <img
              className="nav-cart-img"
              src={"/assets/shared/desktop/icon-cart.svg"}
            />
          </button>
        ) : (
          <button className="nav-cart " onClick={props.toggleCart}>
            <img
              className="nav-cart-img"
              src={"/assets/shared/desktop/icon-cart.svg"}
            />
          </button>
        )}
      </div>
      {onMenu ? (
        <div className="fill-screen" onClick={click}>
          <div className="nav-menu">
            <div className="nav-links">
              <Link className="nav-link" to="/" onClick={closeMenu}>
                HOME
              </Link>
              <Link
                className="nav-link"
                to="/category/headphones"
                onClick={() => {
                  closeMenu();
                  props.load();
                }}
              >
                HEADPHONES
              </Link>
              <Link
                className="nav-link"
                to="/category/speakers"
                onClick={() => {
                  closeMenu();
                  props.load();
                }}
              >
                SPEAKERS
              </Link>
              <Link
                className="nav-link"
                to="/category/earphones"
                onClick={() => {
                  closeMenu();
                  props.load();
                }}
              >
                EARPHONES
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
