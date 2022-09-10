import React from "react";
import { Link } from "react-router-dom";

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }

  update = () => {
    fetch("/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          category: data.filter(
            (product) => product.category === this.props.category
          ),
        });
      });
  };

  componentDidMount() {
    this.update();
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    this.update();
  }

  render() {
    return (
      <main className="category ">
        <header className="category-head">
          <h3 className="h3 ">{this.props.category.toUpperCase()}</h3>
        </header>
        <div className="category-products container ">
          {this.state.category.map((product, index) => (
            <Product
              device={this.props.device}
              name={product.name}
              slug={product.slug}
              description={product.description}
              new={product.new}
              image={product.categoryImage}
              className={
                "cp " +
                ((this.state.category.length - index) % 2 == 0 &&
                this.props.device === "desktop"
                  ? "cp-reverse"
                  : "")
              }
              key={index}
            />
          ))}
        </div>
      </main>
    );
  }
}

function Product(props) {
  return (
    <div className={props.className}>
      <img
        className="cp-img"
        src={props.image[props.device].split("").slice(1).join("")}
      />
      <div className="cp-content">
        {props.new ? (
          <p className="overline brown-text margin-short">NEW PRODUCT</p>
        ) : (
          <p className="hide-text overline margin-short">HIDEN</p>
        )}
        <h3 className="h3 margin-short">{props.name}</h3>
        <p className="p margin-short">{props.description}</p>
        <Link to={`/product/${props.slug}`}>
          <button className="shared-button margin-short">SEE PRODUCT</button>
        </Link>
      </div>
    </div>
  );
}
