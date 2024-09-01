import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems } = useContext(StoreContext);

  const [first_name, setFirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [nameQty, setNameQty] = useState("");
  const [total, setTotal] = useState("");

  const getInfo = () => {
    let itemQuantity = [];
    let totalAmount;

    food_list.map((item, index) => {
      if (cartItems[item._id] > 0) {
        itemQuantity.push(`${item.name} x ${cartItems[item._id]}`);
        totalAmount = getTotalCartAmount() + 2;

        // console.log(itemName);
        // console.log(itemQuantity);
        // console.log(totalAmount);

        setNameQty(itemQuantity.join(", "));
        setTotal(totalAmount);
      }
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const order = {
        first_name,
        last_name,
        email,
        street,
        city,
        state,
        zip_code,
        country,
        phone,
        nameQty,
        total,
      };

      const response = await axios.post(
        "http://localhost:4000/api/order/place",
        order
      );
      console.log(response);

      if ((response.status = 201)) {
        toast.success("Place order completed");
        setTimeout(() => {
          window.location.replace("/");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip code"
            value={zip_code}
            onChange={(e) => setZip_code(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs. {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
