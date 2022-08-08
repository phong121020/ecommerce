import React, { useState, useEffect } from "react";
// MUI
import { Button, CardMedia, Typography } from "@material-ui/core";
import { AiFillStar } from "react-icons/ai";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectSingleProduct } from "../../features/products/productsSilce";
import { addToCart } from "../../features/cart/cartSlice";
// Components
import Comments from "../../components/Comments/Comments";
import Header from "../../Layout/Header/Header";
// SCSS
import styles from "./SingleProduct.module.scss";
// FIREBASE
import { db } from "../../firebase.config";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  limit,
  query,
} from "firebase/firestore";

import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

function SingleProduct() {
  const singleProduct = useSelector(selectSingleProduct);
  const dispatch = useDispatch();

  const commentsRef = collection(db, "comments");
  const q = query(commentsRef, orderBy("createAt"), limit(20));
  console.log("q", q);

  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
          <CardMedia
            component="img"
            image={singleProduct?.image}
            className={styles.cardImg}
          />
          <div className={styles.cardContent}>
            <Typography className={styles.title}>
              {singleProduct?.title}
            </Typography>
            <Typography className={styles.desc}>
              {singleProduct?.description}
            </Typography>
            <Typography className={styles.price}>
              Price: ${singleProduct?.price}
            </Typography>
            <div className={styles.rating}>
              <Typography className={styles.rate}>
                {singleProduct?.rating.rate}
                <AiFillStar className={styles.starIcon} />
              </Typography>
              <Typography className={styles.count}>
                {singleProduct?.rating.count} sold
              </Typography>
            </div>
            <Button
              className={styles.button}
              variant="outlined"
              color="primary"
              onClick={() => dispatch(addToCart(singleProduct))}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>

      <Comments />
    </>
  );
}

export default SingleProduct;
