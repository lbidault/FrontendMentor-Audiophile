import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    fetch("/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          product: data.find((product) => product.slug === this.props.slug),
        });
      });
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="product">
        <div style={{ display: "flex" }}>
          <Link
            className="back"
            to={
              this.state.product.category
                ? `/category/${this.state.product.category}`
                : "/"
            }
          >
            <p>Go Back</p>
          </Link>
        </div>

        <Detail
          device={this.props.device}
          main={{
            id: this.state.product.id,
            name: this.state.product.name,
            price: this.state.product.price,
            description: this.state.product.description,
            new: this.state.product.new,
            image: this.state.product.image,
          }}
          features={this.state.product.features}
          box={this.state.product.includes}
          gallery={this.state.product.gallery}
        />
        <Related
          device={this.props.device}
          products={this.state.product.others}
          reload={this.render}
        />
      </div>
    );
  }
}

function Detail(props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (added) {
      addToCart();
      setAdded(false);
    }
  });

  function addToCart() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = [];
    }
    if (cart.map((storedItem) => storedItem.id).includes(props.main.id)) {
      cart.filter((storedItem) => storedItem.id === props.main.id)[0].quantity =
        quantity;
    } else {
      cart.push({ id: props.main.id, quantity: quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function add() {
    setQuantity(quantity + 1);
  }

  function remove() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  if (props.main.image && props.features && props.box && props.gallery) {
    return (
      <main className="detail container ">
        <section className="detail-main">
          <img
            className="detail-img"
            src={props.main.image[props.device].split("").slice(1).join("")}
          />
          <div className="detail-main-content margin-char">
            {props.main.new ? (
              <p className="overline brown-text margin-char">NEW PRODUCT</p>
            ) : (
              <p className="hide-text overline margin-char">HIDEN</p>
            )}
            <h2 className="h2 margin-char">{props.main.name}</h2>
            <p className="p margin-char">{props.main.description}</p>
            <h6 className="h6 margin-char">
              <strong>{`$${props.main.price}`}</strong>
            </h6>
            <div className="dm-add margin-char">
              <div className="dm-add-settings">
                <button className="sign p" onClick={remove}>
                  -
                </button>
                <p>{quantity}</p>
                <button className="sign p" onClick={add}>
                  +
                </button>
              </div>
              <button className="shared-button" onClick={() => setAdded(true)}>
                ADD TO CART
              </button>
            </div>
          </div>
        </section>
        <div className="detail-features_box">
          <section className="detail-features margin-short">
            <h3 className="h3 margin-short">FEATURES</h3>
            {props.features.split("\n\n").map((paragraph, index) => (
              <p className="p" key={index}>
                {paragraph}
              </p>
            ))}
          </section>
          <section className="detail-box margin-short">
            <h3 className="h3 margin-short">IN THE BOX</h3>
            <ul className="">
              {props.box.map((element, index) => (
                <li className="p margin-short" key={index}>
                  <span className="brown-text">{`${element.quantity}x`}</span>
                  {element.item}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <section className="detail-gallery margin">
          <div className="dg-small">
            <img
              className="dg1"
              src={props.gallery.first[props.device]
                .split("")
                .slice(1)
                .join("")}
            />
            <img
              className="dg2"
              src={props.gallery.second[props.device]
                .split("")
                .slice(1)
                .join("")}
            />
          </div>
          <img
            className="dg3"
            src={props.gallery.third[props.device].split("").slice(1).join("")}
          />
        </section>
      </main>
    );
  }
  return null;
}

function Related(props) {
  if (props.products) {
    return (
      <section className="related container">
        <h3 className="h3 margin-short">YOU MAY ALSO LIKE</h3>
        <div className="related-products margin-short">
          {props.products.map((product, index) => (
            <div className="related-product margin-short" key={index}>
              <img
                src={product.image[props.device].split("").slice(1).join("")}
              />
              <h5 className="h5">{product.name}</h5>
              <Link to={`/product/${product.slug}`} onClick={props.reload}>
                <button className="shared-button">SEE PRODUCT</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return null;
}
