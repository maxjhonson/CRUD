import coreApi from "../api/coreApi";
import {
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  LOG_OUT,
  PRODUCT_SERVER_ERROR,
  PRODUCT_SERVER_START,
  REMOVE_PRODUCT,
  SET_CURRENT_PRODUCT,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  UPDATE_PRODUCT,
} from "./types";
import Cookies from "js-cookie";

//USER MANAGEMENT
export const loadUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_IN });
      const userData = await coreApi.get("/auth/profile", {
        headers: {
          Authorization: token,
        },
      });
      dispatch({ type: SIGN_IN_SUCCESS, payload: userData.data.data.user });
    } catch (e) {
      dispatch({ type: SIGN_IN_ERROR });
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    Cookies.remove("token");
    dispatch({ type: LOG_OUT });
  };
};

//PRODUCT MANAGEMENT
export const saveProduct = (product, price) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_SERVER_START });
      const response = await coreApi.post("/products", { product, price });
      dispatch({ type: CREATE_PRODUCT, payload: response.data.data.product });
    } catch (err) {
      dispatch({ type: PRODUCT_SERVER_ERROR, payload: err.response.data.message });
    }
  };
};

export const updateProduct = (product, price, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_SERVER_START });
      const response = await coreApi.put(`/products/management`, {
        id,
        product,
        price,
      });
      dispatch({ type: UPDATE_PRODUCT, payload: response.data.data.product });
    } catch (err) {
      dispatch({ type: PRODUCT_SERVER_ERROR, payload: err.response.data.message });
    }
  };
};

//fetch Products
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_SERVER_START });
      const response = await coreApi.get("/products");
      dispatch({ type: FETCH_PRODUCTS, payload: response.data.data.products });
    } catch (err) {
      dispatch({ type: PRODUCT_SERVER_ERROR, payload: err.response.data.message });
    }
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    try {
      await coreApi.delete(`/products/${id}`);
      dispatch({ type: REMOVE_PRODUCT, payload: id });
    } catch (err) {
      dispatch({ type: PRODUCT_SERVER_ERROR, payload: err.response.data.message });
    }
  };
};

export const setCurrent = (id) => {
  return (dispatch) => {
    dispatch({ type: SET_CURRENT_PRODUCT, payload: id });
  };
};

export const removeCurrent = () => {
  return (dispatch) => {
    dispatch({ type: SET_CURRENT_PRODUCT, payload: -1 });
  };
};
