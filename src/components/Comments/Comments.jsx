import React, { useEffect, useState } from "react";
// MUI
import { Button, TextField } from "@material-ui/core";
// SCSS
import styles from "./Comments.module.scss";
// FIREBASE
import { db } from "../../firebase.config";
import { collection, query, orderBy, limit } from "firebase/firestore";

// REDUX
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { selectSingleProduct } from "../../features/products/productsSilce";

function Comments({ comments }) {
  const user = useSelector(selectUser);
  const singleProduct = useSelector(selectSingleProduct);

  // const commentsRef = collection(db, "comments");
  // const q = query(commentsRef, orderBy("createAt"), limit(20));
  // console.log(q);

  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmitComment}
        // fullWidth
        className={styles.formControl}
      >
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="Comment"
          className={styles.comment}
        />
        <Button type="submit">Comment</Button>
      </form>

      <div className={styles.listComments}>
        {/* {comments.map((comment) => (
          <div key={comment.id} className={styles.userComment}>
            <div className={styles.user}>
              <div className={styles.email}>{comment.email}</div>
              <div>10h</div>
            </div>
            <div className={styles.commentContent}>{comment.comment}</div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Comments;
