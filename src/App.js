import { BrowserRouter, Routes, Route } from "react-router-dom";
// REDUX
import { useSelector } from "react-redux";
import { selectUser } from "./features/user/userSlice";
import { selectProducts } from "./features/products/productsSilce";

// Components
import Layout from "./Layout/Layout";
import Shopping from "./pages/Shopping/Shopping";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Login from "./screens/Login/Login";
// import { useEffect, useState } from "react";
// Firebase
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db } from "./firebase.config";

function App() {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      {!user ? (
        <Login />
      ) : (
        <>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
