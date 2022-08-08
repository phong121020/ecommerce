import React, { useEffect, useState } from "react";
import axios from "axios";
// Components
import Header from "./Header/Header";
import FilterCategory from "./FilterCategory/FilterCategory";
import ListItem from "./ListItem/ListItem";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
} from "../features/products/productsSilce";
// MUI
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
// SCSS
import styles from "./Layout.module.scss";

function Layout() {
  const categories = useSelector(selectProducts);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const allCategories = [
    "all",
    "men's clothing",
    "electronics",
    "women's clothing",
    "jewelery",
  ];

  const filterItems = (product) => {
    if (product === "all") {
      setQuery("");
      return;
    }
    setQuery(product);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: query ? `category/${query}` : "",
        baseURL: "https://fakestoreapi.com/products/",
      });
      dispatch(fetchProducts(response.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);
  return (
    <div className={styles.container}>
      <Header />
      <FilterCategory categories={allCategories} filterItems={filterItems} />
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {loading === false && <ListItem data={categories} />}
    </div>
  );
}

export default Layout;
