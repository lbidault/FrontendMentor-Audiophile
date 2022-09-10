import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import $ from "jquery";

function Validation(props) {
  const [view, setView] = useState(false);
  useEffect(() => {
    if (view) {
      $(".validation-price").removeClass("center");
    } else {
      $(".validation-price").addClass("center");
    }
  });

  function clearCart() {
    localStorage.removeItem("cart");
  }

  let total = 0;
  return (
    <div className="fill-screen" style={{ alignItems: "center", zIndex: 9999 }}>
      <div className="validation">
        <img src="/assets/checkout/icon-order-confirmation.svg" />
        <h2 className="h2 margin-short">THANK YOU FOR YOUR ORDER</h2>
        <p className="p margin-char">
          You will receive an email confirmation shortly.
        </p>
        <div className="validation-content margin-short">
          {props.data.length > 0 && props.cart.length > 0 ? (
            <div className="validation-items">
              <div className="checkout-cart-product-container">
                {props.cart.map((item, index) => {
                  const fullItem = props.data.filter(
                    (itemData) => itemData.id === item.id
                  )[0];
                  total += item.quantity * fullItem.price;
                  if (!(!view && index != 0)) {
                    return (
                      <Product
                        name={fullItem.shortName}
                        price={fullItem.price}
                        image={fullItem.image[props.device]
                          .split("")
                          .slice(1)
                          .join("")}
                        quantity={item.quantity}
                        key={fullItem.id}
                      />
                    );
                  }
                })}
              </div>
              {props.cart.length > 1 ? (
                <div className="validation-view" onClick={() => setView(!view)}>
                  <p className="op">
                    {view
                      ? "View less"
                      : `and ${props.cart.length - 1} other item(s)`}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="validation-price">
            <div className="">
              <p className="p margin-char">GRAND TOTAL</p>
              <p className=" margin-char">
                <strong className="">{`$${formatNumber(total + 50)}`}</strong>
              </p>
            </div>
          </div>
        </div>
        <Link className="margin-short" to="/">
          <button className="shared-button " onClick={clearCart}>
            BACK TO HOME
          </button>
        </Link>
      </div>
    </div>
  );
}

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cash: false,
      cart: [],
      cartLoaded: false,
      data: [],
      content: {
        name: { text: "", error: "", max: 30, min: 1 },
        email: { text: "", error: "", max: 30, min: 1 },
        phone: { text: "", error: "", max: 16, min: 10 },
        address: { text: "", error: "", max: 60, min: 1 },
        city: { text: "", error: "", max: 30, min: 1 },
        zip: { text: "", error: "", max: 5, min: 5 },
        country: { text: "", error: "", max: 30, min: 1 },
        enum: { text: "", error: "", max: 9, min: 9 },
        epin: { text: "", error: "", max: 4, min: 4 },
      },
      validation: false,
    };
  }
  componentDidMount() {
    this.props.setCartDisabled(true);
    window.scrollTo(0, 0);
    this.fetchStorage();
    fetch("/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data });
      });
    $("body").addClass("body-checkout");
    const pointer = this;
    $("#e-money").attr("checked", true);
    $("#e-money").parents(".cc-input").addClass("selected");
    $(".radio").click(function () {
      $(".radio").parents(".cc-input").removeClass("selected");
      if ($(this).is(":checked")) {
        $(this).parents(".cc-input").addClass("selected");
        pointer.setState({ cash: $(this)[0].id == "cash" });
      }
    });
  }

  componentWillUnmount() {
    this.props.setCartDisabled(false);
    $("body").removeClass("body-checkout");
  }

  fetchStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      this.setState({ cart: cart, cartLoaded: true });
    } else {
      this.setState({ cart: [], cartLoaded: true });
    }
  };

  handleInput = (fieldName, text) => {
    var content = this.state.content;
    var field = content[fieldName];
    if (text.length <= field.max) {
      field.text = text;
      field.error = "";
      content[fieldName] = field;
      this.setState({ content: content });
    }
  };

  validate = () => {
    var content = this.state.content;
    var validation = true;
    for (const fieldName in content) {
      if (content.hasOwnProperty(fieldName)) {
        let field = content[fieldName];
        if (field.text.length < field.min) {
          if (field.text.length == 0) {
            if (
              !(
                (fieldName === "enum" && this.state.cash) ||
                (fieldName === "epin" && this.state.cash)
              )
            ) {
              field.error = "Shouldn't be empty";
              validation = false;
            }
          } else {
            if (
              !(
                (fieldName === "enum" && this.state.cash) ||
                (fieldName === "epin" && this.state.cash)
              )
            ) {
              field.error = `Min:${field.min} characters`;
              validation = false;
            }
          }
        } else if (fieldName === "email" && !verifyEmail(field.text)) {
          field.error = "Wrong format";
          validation = false;
        } else {
          field.error = "";
        }
        content[fieldName] = field;
      }
    }
    this.setState({ content: content, validation: validation });
  };

  render() {
    var total = 0;
    if (this.state.cartLoaded && this.state.cart.length == 0) {
      return <Navigate to="/" />;
    } else {
      return (
        <div className="checkout-page">
          {this.state.validation ? (
            <Validation
              device={this.props.device}
              cart={this.state.cart}
              data={this.state.data}
            />
          ) : null}
          <div style={{ display: "flex" }}>
            <Link className="back" to="/">
              <p>Go Back</p>
            </Link>
          </div>
          <main className="checkout container">
            <div className="form">
              <h4 className="h4 margin-short">CHECKOUT</h4>
              <div className="margin-short">
                <p className="sub brown-text margin-char">BILLING DETAILS</p>
                <div className="checkout-group">
                  <div className="checkout-input margin-char">
                    <div className="checkout-field-header">
                      <p
                        className={
                          "sub margin-char " +
                          (this.state.content.name.error.length
                            ? "checkout-sub-error"
                            : "")
                        }
                      >
                        Name
                      </p>
                      <p className="checkout-error margin-char">
                        {this.state.content.name.error}
                      </p>
                    </div>
                    <input
                      className={
                        "input " +
                        (this.state.content.name.error.length
                          ? "checkout-input-error"
                          : "")
                      }
                      type="text"
                      placeholder="Alexei Ward"
                      value={this.state.content.name.text}
                      onChange={(event) => {
                        this.handleInput("name", event.target.value);
                      }}
                    />
                  </div>
                  <div className="checkout-input margin-char">
                    <div className="checkout-field-header">
                      <p
                        className={
                          "sub margin-char " +
                          (this.state.content.email.error.length
                            ? "checkout-sub-error"
                            : "")
                        }
                      >
                        Email Adress
                      </p>
                      <p className="checkout-error margin-char">
                        {this.state.content.email.error}
                      </p>
                    </div>
                    <input
                      className={
                        "input " +
                        (this.state.content.email.error.length
                          ? "checkout-input-error"
                          : "")
                      }
                      type="text"
                      placeholder="alexei@mail.com"
                      value={this.state.content.email.text}
                      onChange={(event) => {
                        this.handleInput("email", event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="checkout-input margin-char">
                  <div className="checkout-field-header">
                    <p
                      className={
                        "sub margin-char " +
                        (this.state.content.phone.error.length
                          ? "checkout-sub-error"
                          : "")
                      }
                    >
                      Phone Number
                    </p>
                    <p className="checkout-error margin-char">
                      {this.state.content.phone.error}
                    </p>
                  </div>
                  <input
                    className={
                      "input " +
                      (this.state.content.phone.error.length
                        ? "checkout-input-error"
                        : "")
                    }
                    type="text"
                    placeholder="+1202-555-0136"
                    value={this.state.content.phone.text}
                    onChange={(event) => {
                      this.handleInput("phone", event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="margin-short">
                <p className="sub brown-text margin-char">SHIPPING INFO</p>
                <div className="checkout-input checkout-input-large margin-char">
                  <div className="checkout-field-header">
                    <p
                      className={
                        "sub margin-char " +
                        (this.state.content.address.error.length
                          ? "checkout-sub-error"
                          : "")
                      }
                    >
                      Address
                    </p>
                    <p className="checkout-error margin-char">
                      {this.state.content.address.error}
                    </p>
                  </div>
                  <input
                    className={
                      "input " +
                      (this.state.content.address.error.length
                        ? "checkout-input-error"
                        : "")
                    }
                    type="text"
                    placeholder="1137 Williams Avenue"
                    value={this.state.content.address.text}
                    onChange={(event) => {
                      this.handleInput("address", event.target.value);
                    }}
                  />
                </div>
                <div className="checkout-group">
                  <div className="checkout-input margin-char">
                    <div className="checkout-field-header">
                      <p
                        className={
                          "sub margin-char " +
                          (this.state.content.zip.error.length
                            ? "checkout-sub-error"
                            : "")
                        }
                      >
                        ZIP Code
                      </p>
                      <p className="checkout-error margin-char">
                        {this.state.content.zip.error}
                      </p>
                    </div>
                    <input
                      className={
                        "input " +
                        (this.state.content.zip.error.length
                          ? "checkout-input-error"
                          : "")
                      }
                      type="text"
                      placeholder="10001"
                      value={this.state.content.zip.text}
                      onChange={(event) => {
                        this.handleInput("zip", event.target.value);
                      }}
                    />
                  </div>
                  <div className="checkout-input margin-char">
                    <div className="checkout-field-header">
                      <p
                        className={
                          "sub margin-char " +
                          (this.state.content.city.error.length
                            ? "checkout-sub-error"
                            : "")
                        }
                      >
                        City
                      </p>
                      <p className="checkout-error margin-char">
                        {this.state.content.city.error}
                      </p>
                    </div>
                    <input
                      className={
                        "input " +
                        (this.state.content.city.error.length
                          ? "checkout-input-error"
                          : "")
                      }
                      type="text"
                      placeholder="New York"
                      value={this.state.content.city.text}
                      onChange={(event) => {
                        this.handleInput("city", event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="checkout-input margin-char">
                  <div className="checkout-field-header">
                    <p
                      className={
                        "sub margin-char " +
                        (this.state.content.country.error.length
                          ? "checkout-sub-error"
                          : "")
                      }
                    >
                      Country
                    </p>
                    <p className="checkout-error margin-char">
                      {this.state.content.country.error}
                    </p>
                  </div>
                  <input
                    className={
                      "input " +
                      (this.state.content.country.error.length
                        ? "checkout-input-error"
                        : "")
                    }
                    type="text"
                    placeholder="United States"
                    value={this.state.content.country.text}
                    onChange={(event) => {
                      this.handleInput("country", event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="margin-short">
                <p className="sub brown-text margin-char">PAYMENT DETAILS</p>
                <div className="checkout-group">
                  <p className="sub margin-char">Payment Method</p>
                  <div className="checkout-method checkout-input">
                    <div className="input cc-input ">
                      <div className="radio-container selected">
                        <input
                          id="e-money"
                          className="radio"
                          type="radio"
                          name="radios"
                        />
                      </div>
                      <label htmlFor="e-money" className="sub">
                        e-Money
                      </label>
                    </div>
                    <div className="input cc-input margin-short">
                      <div className="radio-container">
                        <input
                          id="cash"
                          className="radio"
                          type="radio"
                          name="radios"
                        />
                      </div>
                      <label htmlFor="cash" className="sub">
                        Cash on delivery
                      </label>
                    </div>
                  </div>
                </div>
                {this.state.cash ? (
                  <div className="checkout-cash">
                    <img src="/assets/checkout/icon-cash-on-delivery.svg" />
                    <p className="p">
                      The ‘Cash on Delivery’ option enables you to pay in cash
                      when our delivery courier arrives at your residence. Just
                      make sure your address is correct so that your order will
                      not be cancelled.
                    </p>
                  </div>
                ) : (
                  <div className="checkout-group">
                    <div className="checkout-input margin-char">
                      <div className="checkout-field-header">
                        <p
                          className={
                            "sub margin-char " +
                            (this.state.content.enum.error.length
                              ? "checkout-sub-error"
                              : "")
                          }
                        >
                          e-Money Number
                        </p>
                        <p className="checkout-error margin-char">
                          {this.state.content.enum.error}
                        </p>
                      </div>
                      <input
                        className={
                          "input " +
                          (this.state.content.enum.error.length
                            ? "checkout-input-error"
                            : "")
                        }
                        type="text"
                        placeholder="238521993"
                        value={this.state.content.enum.text}
                        onChange={(event) => {
                          this.handleInput("enum", event.target.value);
                        }}
                      />
                    </div>
                    <div className="checkout-input margin-char">
                      <div className="checkout-field-header">
                        <p
                          className={
                            "sub margin-char " +
                            (this.state.content.epin.error.length
                              ? "checkout-sub-error"
                              : "")
                          }
                        >
                          e-Money PIN
                        </p>
                        <p className="checkout-error margin-char">
                          {this.state.content.epin.error}
                        </p>
                      </div>
                      <input
                        className={
                          "input " +
                          (this.state.content.epin.error.length
                            ? "checkout-input-error"
                            : "")
                        }
                        type="text"
                        placeholder="6891"
                        value={this.state.content.epin.text}
                        onChange={(event) => {
                          this.handleInput("epin", event.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="checkout-cart ">
              <header className="cart-header">
                <h5 className="h5 margin-char">SUMMARY</h5>
              </header>
              {this.state.data.length > 0 && this.state.cart.length > 0 ? (
                <div className="checkout-cart-product-container margin-short">
                  {this.state.cart.map((item) => {
                    const fullItem = this.state.data.filter(
                      (itemData) => itemData.id === item.id
                    )[0];
                    total += item.quantity * fullItem.price;
                    return (
                      <Product
                        name={fullItem.shortName}
                        price={fullItem.price}
                        image={fullItem.image[this.props.device]
                          .split("")
                          .slice(1)
                          .join("")}
                        quantity={item.quantity}
                        key={fullItem.id}
                      />
                    );
                  })}
                </div>
              ) : null}
              <div className="checkout-price margin-short">
                <div className="cart-field">
                  <p className="p">TOTAL</p>
                  <p className="p">
                    <strong>{`$${formatNumber(total)}`}</strong>
                  </p>
                </div>
                <div className="cart-field ">
                  <p className="p">SHIPPING</p>
                  <p className="p">
                    <strong>{`$50`}</strong>
                  </p>
                </div>
                <div className="cart-field">
                  <p className="p">VAT (INCLUDED)</p>
                  <p className="p">
                    <strong>{`$${formatNumber(
                      Math.round(total * 0.2)
                    )}`}</strong>
                  </p>
                </div>
              </div>
              <div className="cart-field">
                <p className="p">GRAND TOTAL</p>
                <p className="p">
                  <strong className="brown-text">{`$${formatNumber(
                    total + 50
                  )}`}</strong>
                </p>
              </div>
              <button
                className="shared-button margin-short"
                onClick={this.validate}
              >
                CONTINUE & PAY
              </button>
            </div>
          </main>
        </div>
      );
    }
  }
}

function Product(props) {
  return (
    <div className="cart-product margin-char">
      <div className="cp-block">
        <img src={props.image} />
        <div className="cp-info">
          <h6 className="h6 margin-char">{props.name}</h6>
          <p className="op margin-char">
            <strong>{`$${formatNumber(props.price)}`}</strong>
          </p>
        </div>
      </div>
      <p className="p">{`x${props.quantity}`}</p>
    </div>
  );
}

function formatNumber(num) {
  const str = num.toString();
  const arr = str.split("");
  if (arr.length > 3) {
    for (let i = arr.length - 3; i > 0; i -= 3) {
      arr.splice(i, 0, ",");
    }
  }
  return arr.join("");
}

function verifyEmail(email) {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}
