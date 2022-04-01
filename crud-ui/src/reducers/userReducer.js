import { LOG_OUT, SIGN_IN, SIGN_IN_ERROR, SIGN_IN_SUCCESS } from "../actions/types";

const initialState = {
  isSignedIn: false,
  fullName: "",
  role: "",
  isloading: false,
  errorMessage: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isloading: true, isSignedIn: false };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        fullName: action.payload.fullName,
        role: action.payload.role,
        isSignedIn: true,
        isloading: false,
      };
    case SIGN_IN_ERROR: {
      return { ...state, isloading: false, errorMessage: "temp message" };
    }
    case LOG_OUT: {
      return initialState;
    }
    default:
      return state;
  }
};
