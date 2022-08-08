import React, { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
// REDUX
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../features/products/productsSilce";
// ICONS
import { AiOutlineSearch } from "react-icons/ai";
// SCSS
import styles from "./SearchForm.module.scss";
import { IconButton } from "@mui/material";

function SearchForm() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const debounced = useDebounce(query, 1000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url: debounced ? `category/${debounced}` : "",
          baseURL: "https://fakestoreapi.com/products/",
        });
        dispatch(fetchProducts(response.data));
      } catch (error) {}
    };

    fetchData();
  }, [debounced]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!debounced) {
      setQuery("");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Enter your product name..."
        />
        <AiOutlineSearch className={styles.searchIcon} />
      </form>
    </div>
  );
}

export default SearchForm;
