import React from "react";
import { connect } from "react-redux";
import { logOut } from "../actions";
import ProductForm from "../components/ProductForm";
import ProductGrid from "../components/ProductGrid";
function PrincipalPage({ user, logOut }) {
  return (
    <div className="ui segment">
      <div className="ui clearing segment">
        <div className="ui right floated header">
          <a className="ui large label">
            {user.fullName} - {user.role}
          </a>
          <button className="ui primary button" onClick={logOut}>
            Log out
          </button>
        </div>
      </div>
      <div>
        <ProductForm />
        <ProductGrid />
      </div>
    </div>
  );
}

const mapStateToProp = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProp, { logOut })(PrincipalPage);
