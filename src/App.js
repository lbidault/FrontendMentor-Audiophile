import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav";
import Footer from "./components/footer";
import About from "./components/about";
import Shared from "./components/shared";
import Home from "./components/home";
import Category from "./components/category";
import Product from "./components/product";
import Checkout from "./components/checkout";

const SMALL_DESKTOP = 1378,
  TABLET = 1100,
  MOBILE = 654;

const CATEGORIES = ["earphones", "headphones", "speakers"];

function smallDesktop(device) {
  if (device === "medium-desktop" || device === "small-desktop") {
    return "desktop";
  }
  return device;
}

function mediumDesktop(device) {
  if (device === "medium-desktop") {
    return "desktop";
  } else if (device === "small-desktop") {
    return "tablet";
  }
  return device;
}

function App() {
  const [device, setDevice] = useState("medium-desktop");
  const [slugs, setSlugs] = useState([]);
  const [loader, setLoader] = useState(() => {});
  const [cartDisabled, setCartDisabled] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSlugs(data.map((product) => product.slug));
      });
  }, []);

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
    if (screenWidth <= MOBILE && device != "mobile") {
      setDevice("mobile");
    } else if (
      screenWidth > MOBILE &&
      screenWidth <= TABLET &&
      device != "tablet"
    ) {
      setDevice("tablet");
    } else if (
      screenWidth > TABLET &&
      screenWidth < SMALL_DESKTOP &&
      device != "small-desktop"
    ) {
      setDevice("small-desktop");
    } else if (screenWidth > SMALL_DESKTOP && device != "medium-desktop") {
      setDevice("medium-desktop");
    }
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home.Top load={loader} />} />
          <Route
            path="*"
            element={
              <Nav
                device={smallDesktop(device)}
                load={loader}
                disableCart={cartDisabled}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path="/" element={null} />
          {slugs.map((slug, index) => (
            <Route
              path={`/product/${slug}`}
              element={<Product device={smallDesktop(device)} slug={slug} />}
              key={index}
            />
          ))}
          {CATEGORIES.map((categoryName, index) => (
            <Route
              path={`/category/${categoryName}`}
              element={
                <Category
                  device={smallDesktop(device)}
                  category={categoryName}
                  setReload={setLoader}
                />
              }
              key={index}
            />
          ))}
          <Route
            path="/checkout"
            element={
              <Checkout
                device={smallDesktop(device)}
                setCartDisabled={setCartDisabled}
              />
            }
          />
          {slugs.length > 0 ? (
            <Route path="*" element={<Navigate to="/" />} />
          ) : null}
        </Routes>
        <Routes>
          <Route exact path="/checkout" element={null} />
          <Route path="*" element={<Shared.CategoriesSection />} />
        </Routes>
        <Routes>
          <Route exact path="/" element={<Home.Showcase />} />
        </Routes>
        <Routes>
          <Route exact path="/checkout" element={null} />
          <Route path="*" element={<About device={mediumDesktop(device)} />} />
        </Routes>
        <Footer load={loader} />
      </div>
    </BrowserRouter>
  );
}

export default App;
