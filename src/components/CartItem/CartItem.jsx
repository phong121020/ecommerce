import React from "react";
// MUI
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
// ICONS
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCartItem,
  increaseCartItem,
} from "../../features/cart/cartSlice";
// SCSS
import styles from "./CartItem.module.scss";
function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = (id) => {
    dispatch(increaseCartItem(id));
  };
  const handleDecrease = (id) => {
    dispatch(decreaseCartItem(id));
  };
  return (
    <>
      <Card className={styles.cart}>
        <div className={styles.cartContent}>
          <CardMedia className={styles.image} image={item.image} />
          <CardContent>
            <Typography sx={{ fontWeight: "bold" }} variant="h7">
              {item.title}
            </Typography>
            <Typography>
              {item.qty} x ${item.price}
            </Typography>
          </CardContent>
        </div>
        <CardActions>
          <IconButton onClick={() => handleIncrease(item.id)}>
            <AiOutlinePlus />
          </IconButton>
          <span>{item.qty}</span>
          <IconButton onClick={() => handleDecrease(item.id)}>
            <AiOutlineMinus />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default CartItem;
