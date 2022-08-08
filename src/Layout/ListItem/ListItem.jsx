import React, { useEffect, useState } from "react";
// Components
import Item from "./Item/Item";
// SCSS
import styles from "./ListItem.module.scss";

function ListItem({ data }) {
  return (
    <div className={styles.cardList}>
      {data?.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ListItem;
