import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Nav from "./nav";

const images = {
  header: {
    desktop: {
      url: "/assets/home/desktop/image-hero.jpg",
      aspect: 1.975,
    },
    tablet: {
      url: "/assets/home/tablet/image-header.jpg",
      aspect: 1.05,
    },
    mobile: {
      url: "/assets/home/mobile/image-header.jpg",
      aspect: 0.625,
    },
  },
  earphones: {
    desktop: {
      url: "/assets/home/desktop/image-earphones-yx1.jpg",
      aspect: 1.688,
    },
    tablet: {
      url: "/assets/home/tablet/image-earphones-yx1.jpg",
      aspect: 1.059,
    },
    mobile: {
      url: "/assets/home/mobile/image-earphones-yx1.jpg",
      aspect: 1.635,
    },
  },
  speakers: [
    {
      desktop: {
        url: "/assets/home/desktop/image-speaker-zx7.jpg",
        aspect: 3.469,
      },
      tablet: {
        url: "/assets/home/tablet/image-speaker-zx7.jpg",
        aspect: 2.153,
      },
      mobile: {
        url: "/assets/home/mobile/image-speaker-zx7.jpg",
        aspect: 1.022,
      },
    },
    {
      desktop: {
        url: "/assets/home/desktop/image-speaker-zx9.png",
        aspect: 0.823,
      },
      tablet: {
        url: "/assets/home/tablet/image-speaker-zx9.png",
        aspect: 0.825,
      },
      mobile: {
        url: "/assets/home/mobile/image-speaker-zx9.png",
        aspect: 0.825,
      },
    },
  ],
};

function Top(props) {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    window.addEventListener("resize", manageDevice);
    manageDevice();
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener("resize", manageDevice);
    };
  });

  function manageDevice() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 654 && device != "mobile") {
      setDevice("mobile");
    } else if (screenWidth > 654 && screenWidth <= 1100 && device != "tablet") {
      setDevice("tablet");
    } else if (screenWidth > 1100 && device != "desktop") {
      setDevice("desktop");
    }
  }
  const image = images.header[device];
  const height = 100 / image.aspect;

  return (
    <header
      className="home-bg"
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundSize: "cover",
        minWidth: "100vw",
        minHeight: `${height}vw`,
      }}
    >
      <Nav home={true} device={device} load={props.load} />
      <New height={height} />
    </header>
  );
}

function New(props) {
  return (
    <section
      className="new"
      style={{ minHeight: `calc(${props.height}vw - 6em)` }}
    >
      <div className="new-layout container">
        <div className="new-text">
          <p className="overline margin-char">New product</p>
          <h1 className="h1">XX99 Mark II Headphones</h1>
          <p className="margin-char ">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link className="margin-char" to="/product/xx99-mark-two-headphones">
            <button className="shared-button">SEE PRODUCT</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("resize", manageDevice);
    window.addEventListener("scroll", manageScroll);
    manageDevice();
    manageScroll();
    return () => {
      window.removeEventListener("resize", manageDevice);
      window.removeEventListener("scroll", manageScroll);
    };
  });

  function manageScroll() {
    const scrollY = window.scrollY;
    if (scrollY == 0) {
      $(".nav").addClass("nav-home");
    } else {
      $(".nav").removeClass("nav-home");
    }
  }

  function manageDevice() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 654 && device != "mobile") {
      setDevice("mobile");
    } else if (screenWidth > 654 && screenWidth <= 1100 && device != "tablet") {
      setDevice("tablet");
    } else if (screenWidth > 1100 && device != "desktop") {
      setDevice("desktop");
    }
  }
  return (
    <section className="showcase margin container">
      <div className="showcase-main margin-short radius-short">
        <div className="showcase-main-img">
          <img
            src={"/assets/home/desktop/pattern-circles.svg"}
            className="circle-pattern"
          />
          <img
            src={images.speakers[1][device].url}
            className="showcase-main-speaker"
          />
        </div>
        <div className="showcase-main-content">
          <h1 className="h1 margin-char">ZX9 SPEAKER</h1>
          <p className="margin-char ">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Link className="margin-char" to="/product/zx9-speaker">
            <button className="showcase-button showcase-button-main">
              SEE PRODUCT
            </button>
          </Link>
        </div>
      </div>
      <div
        className="showcase-mid margin-short radius-short"
        style={{
          backgroundImage: `url(${images.speakers[0][device].url})`,
          backgroundSize: "cover",
          minWidth: "100%",
          aspectRatio: images.speakers[0][device].aspect,
        }}
      >
        <div className="showcase-mid-content">
          <div>
            <h2 className="h2">ZX7 SPEAKER</h2>
            <Link className="margin-char" to="/product/zx7-speaker">
              <button className="showcase-button">SEE PRODUCT</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="showcase-last margin-short radius-short">
        <img
          className="showcase-last-child"
          src={images.earphones[device].url}
        />
        <div
          className="showcase-last-content showcase-last-child"
          style={{ aspectRatio: images.earphones[device].aspect }}
        >
          <div>
            <h2 className="h2">YX1 EARPHONES</h2>
            <Link className="margin-char" to="/product/yx1-earphones">
              <button className="showcase-button">SEE PRODUCT</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default {
  Top,
  Showcase,
};
