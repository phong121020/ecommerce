import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// MUI
import { Button, Grid, Typography } from "@mui/material";
// Components
import CartItem from "../../components/CartItem/CartItem";
import Header from "../../Layout/Header/Header";
// REDUX
import { selectCart } from "../../features/cart/cartSlice";
import { useSelector } from "react-redux";
// SCSS
import styles from "./Shopping.module.scss";

function Shopping() {
  const cart = useSelector(selectCart);
  const [cartItems, setCartItems] = useState(cart);
  const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 20;
  const total = itemsPrice + shippingPrice;

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (cart.length === 0) {
      localStorage.setItem("cartItems", []);
    }
  }, [cart]);
  return (
    <>
      <Header />
      {cart.length === 0 && <h2 className={styles.emptyCart}>Add To Cart!</h2>}
      <div className={styles.wrapper}>
        <Grid
          columnSpacing="10px"
          container
          direction="column"
          className={styles.listCart}
        >
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Grid>
        {cart.length !== 0 && (
          <div className={styles.wrapperCheckout}>
            <Grid className={styles.checkout}>
              <div className={styles.price}>
                <div className={styles.item}>
                  <Typography variant="h5">Subtotal </Typography>
                  <Typography>${itemsPrice.toFixed(2)}</Typography>
                </div>
                <div className={styles.item}>
                  <Typography variant="h5">Shipping </Typography>
                  <Typography>${shippingPrice}</Typography>
                </div>
              </div>
              <div className={styles.total}>
                <Typography variant="h5">Total </Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </div>
            </Grid>
            <hr />
            <Button component={Link} to="/checkout" fullWidth>
              Check Out
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Shopping;
