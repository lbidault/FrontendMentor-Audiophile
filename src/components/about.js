import React, { useState, useEffect } from "react";

const images = {
  desktop: "/assets/shared/desktop/image-best-gear.jpg",
  tablet: "/assets/shared/tablet/image-best-gear.jpg",
  mobile: "/assets/shared/mobile/image-best-gear.jpg",
};

export default function About(props) {
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
    } else if (screenWidth > 654 && screenWidth <= 1378 && device != "tablet") {
      setDevice("tablet");
    } else if (screenWidth > 1378 && device != "desktop") {
      setDevice("desktop");
    }
  }

  return (
    <section className="about container margin">
      <div className="about-text">
        <h2 className="h2">
          BRINGING YOU THE <span className="brown-text">BEST</span> AUDIO GEAR
        </h2>
        <p className="about-p">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <img className="about-img" src={images[props.device]} />
    </section>
  );
}
