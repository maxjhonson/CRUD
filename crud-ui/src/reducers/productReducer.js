import {
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  PRODUCT_SERVER_ERROR,
  PRODUCT_SERVER_START,
  REMOVE_PRODUCT,
  SET_CURRENT_PRODUCT,
} from "../actions/types";

const initialState = {
  products: [],
  currentProduct: {},
  isLoading: false,
  errorMessage: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SERVER_START:
      return { ...state, isLoading: true, errorMessage: "" };
    case CREATE_PRODUCT:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        products: [...state.products, action.payload],
      };
    case PRODUCT_SERVER_ERROR: {
      return { ...state, isLoading: false, errorMessage: action.payload };
    }
    case FETCH_PRODUCTS: {
      return { ...state, isLoading: false, errorMessage: "", products: action.payload };
    }
    case REMOVE_PRODUCT: {
      const products = state.products.filter((x) => x._id !== action.payload);
      return { ...state, isLoading: false, errorMessage: "", products };
    }
    case SET_CURRENT_PRODUCT: {
      const product = state.products.find((x) => x._id === action.payload);
      return { ...state, currentProduct: product };
    }
    default:
      return state;
  }
};
