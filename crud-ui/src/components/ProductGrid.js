import { Spin } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts, removeProduct, setCurrent } from "../actions";

function ProductGrid({ fetchProducts, products, removeProduct, setCurrent, isLoading }) {
  useEffect(() => {
    fetchProducts();
  }, []);

  const onEdit = (id) => {
    setCurrent(id);
  };

  const onRemove = (id) => {
    removeProduct(id);
  };

  const renderProducts = () => {
    if (!products) return;
    return products.map((product) => {
      return (
        <tr key={product._id}>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <button
              onClick={() => onEdit(product._id)}
              className="ui primary icon button"
            >
              <i className="edit  icon"></i>
            </button>
          </td>
          <td>
            <button onClick={() => onRemove(product._id)} className="ui red icon button">
              <i className="trash alternate icon"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Spin spinning={isLoading}>
      <table className="ui celled striped table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th className="collapsing">Product Price</th>
            <th className="collapsing"></th>
            <th className="collapsing"></th>
          </tr>
        </thead>
        <tbody>{renderProducts()}</tbody>
      </table>
    </Spin>
  );
}

const mapStateToProp = (state) => {
  return { products: state.product.products, isLoading: state.product.isLoading };
};

export default connect(mapStateToProp, { fetchProducts, removeProduct, setCurrent })(
  ProductGrid
);
