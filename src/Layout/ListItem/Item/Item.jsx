import React, { useState } from "react";
import { Link } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCart } from "../../../features/cart/cartSlice";
import { fetchSingleProduct } from "../../../features/products/productsSilce";
import SingleProduct from "../../../pages/SingleProduct/SingleProduct";
// MUI
import { Button } from "@mui/material";
// SCSS
import styles from "./Item.module.scss";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useCollection } from "react-firebase-hooks/firestore";

function Item({ item }) {
  const cart = useSelector(selectCart);

  const dispatch = useDispatch();

  // const [products, loading, error] = useCollection(collection(db, "comments"), {
  //   title: item.id,
  // });
  // console.log(products);

  const onAddCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    localStorage.setItem("cartItems", JSON.stringify([...cart, product]));
  };

  const handleClickProduct = async (product) => {
    dispatch(fetchSingleProduct(product));
    localStorage.setItem("singleProduct", JSON.stringify(product));

    await addDoc(collection(db, "comments"), {
      title: product.id,
    });
  };

  return (
    <Link
      to={`/product/${item.id}`}
      className={styles.cardItem}
      onClick={() => handleClickProduct(item)}
    >
      <div className={styles.cardImg}>
        <img src={item.image} alt={item.title} className={styles.img} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{item.title}</h3>
        <div className={styles.cardBottom}>
          <div>
            <p className={styles.price}>${item.price}</p>
            <p className={styles.meta}>{item.category}</p>
          </div>
          <Button type="button" onClick={(e) => onAddCart(e, item)}>
            Add To Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default Item;
