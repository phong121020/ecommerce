import React, { useEffect, useState } from "react";
// MUI
import { Button, ButtonGroup } from "@material-ui/core";
// SCSS
import styles from "./FilterCategory.module.scss";

function FilterCategory({ categories, filterItems }) {
  return (
    <div className={styles.container}>
      <ButtonGroup variant="outlined" className={styles.categoryList}>
        {categories?.map((category, index) => (
          <Button
            key={index}
            color="primary"
            onClick={() => filterItems(category)}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default FilterCategory;
