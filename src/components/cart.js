import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

var pointer = null;

function clickEvent(event) {
  const element = $(event.target);
  const clickOnCart =
    element.parents(".cart").length > 0 ||
    element[0].className === "cart" ||
    element[0].className === "nav-cart-img";
  if (!clickOnCart) {
    pointer.props.close();
  }
}

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      data: [],
    };
  }
  componentDidMount() {
    this.fetchStorage();
    fetch("/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data });
      });
    pointer = this;
    window.addEventListener("click", clickEvent);
  }

  componentWillUnmount() {
    window.removeEventListener("click", clickEvent);
  }

  addItem = (id) => {
    const pointer = this;
    var newCart = [...this.state.cart];
    newCart.filter((storedItem) => storedItem.id === id)[0].quantity++;
    this.setState({ cart: newCart }, pointer.updateStorage);
  };

  removeItem = (id) => {
    const pointer = this;
    var newCart = [...this.state.cart];
    var item = newCart.filter((storedItem) => storedItem.id === id)[0];
    if (item.quantity > 1) {
      item.quantity--;
      this.setState({ cart: newCart }, pointer.updateStorage);
    } else {
      this.setState(
        { cart: newCart.filter((storedItem) => storedItem.id != id) },
        pointer.updateStorage
      );
    }
  };

  clear = () => {
    const pointer = this;
    this.setState({ cart: [] }, pointer.clearStorage);
  };

  fetchStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      this.setState({ cart: cart });
    } else {
      this.setState({ cart: [] });
    }
  };

  updateStorage = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  clearStorage = () => {
    localStorage.removeItem("cart");
  };

  render() {
    if (this.state.data.length > 0 && this.state.cart.length > 0) {
      var total = 0;
      return (
        <div className="fill-screen">
          <div className="cart-container container">
            <div className="cart">
              <header className="cart-header">
                <h5 className="h5 margin-short">{`CART(${this.state.cart.length})`}</h5>
                <p className="sub margin-short" onClick={this.clear}>
                  Remove All
                </p>
              </header>
              <div
                className="
              cart-product-container"
              >
                {this.state.cart.map((item) => {
                  const fullItem = this.state.data.filter(
                    (itemData) => itemData.id === item.id
                  )[0];
                  total += item.quantity * fullItem.price;
                  return (
                    <Product
                      name={fullItem.shortName}
                      slug={fullItem.slug}
                      price={fullItem.price}
                      image={fullItem.image[this.props.device]
                        .split("")
                        .slice(1)
                        .join("")}
                      quantity={item.quantity}
                      add={() => this.addItem(item.id)}
                      remove={() => this.removeItem(item.id)}
                      close={this.props.close}
                      key={fullItem.id}
                    />
                  );
                })}
              </div>

              <div className="cart-field margin-short">
                <p className="p">TOTAL</p>
                <p className="p">
                  <strong>{`$${total}`}</strong>
                </p>
              </div>
              <Link className="cart-link" to="/checkout">
                <button className="shared-button" onClick={this.props.close}>
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="fill-screen">
          <div className="cart-container container">
            <div className="cart">
              <header className="cart-header">
                <h5 className="h5 margin-short">{`CART(${this.state.cart.length})`}</h5>
              </header>
              <p className="p margin" style={{ textAlign: "center" }}>
                Your cart is empty.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

function Product(props) {
  return (
    <div className="cart-product margin-char">
      <Link className="cp-block" to={`/product/${props.slug}`} target="_blank">
        <img src={props.image} onClick={props.close} />
        <div className="cp-info">
          <h6 className="h6 margin-char">{props.name}</h6>
          <p className="p margin-char">{`$${props.price}`}</p>
        </div>
      </Link>
      <div style={{ display: "flex" }}>
        <div className="cp-add-settings">
          <button className="sign p" onClick={props.remove}>
            -
          </button>
          <p className="margin-char">{props.quantity}</p>
          <button className="sign p" onClick={props.add}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
