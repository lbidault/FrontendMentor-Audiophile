import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    name: "headphones",
    img: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
  },
  {
    name: "speakers",
    img: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
  },
  {
    name: "earphones",
    img: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
  },
];

function CategoriesSection() {
  return (
    <section className="categories-section container margin">
      {data.map((category, index) => (
        <Category name={category.name} img={category.img} key={index} />
      ))}
    </section>
  );
}

function Category(props) {
  return (
    <div className="category-section margin-char">
      <div className="category-section-layout">
        <img className="category-section-img" src={props.img} height="160" />
        <h6 className="h6 category-section-name">{props.name.toUpperCase()}</h6>
        <Link
          className="category-section-link"
          to={`/category/${props.name}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <p className="sub">SHOP</p>
          <img src={"/assets/shared/desktop/icon-arrow-right.svg"} />
        </Link>
      </div>
    </div>
  );
}

export default { CategoriesSection };
