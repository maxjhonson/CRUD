import { useEffect, useState } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import { saveProduct, removeCurrent, updateProduct } from "../actions";

function ProductForm({
  saveProduct,
  currentProduct,
  removeCurrent,
  updateProduct,
  errorMessage,
}) {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");

  const onSave = () => {
    if (id) {
      updateProduct(product, price, id);
    } else {
      saveProduct(product, price);
    }
  };

  const onRemoveCurrent = () => {
    removeCurrent();
  };

  useEffect(() => {
    setPrice(currentProduct?.price || "");
    setProduct(currentProduct?.name || "");
    setId(currentProduct?._id || "");
  }, [currentProduct]);

  useEffect(() => {
    if (errorMessage) swal("!", errorMessage, "error");
  }, [errorMessage]);

  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="inline fields">
          <div className="eight wide field">
            <label>Product</label>
            <input
              type="text"
              placeholder="Product Name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="four wide field">
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="four wide field">
            <button type="button" onClick={onSave} className="ui primary button">
              {!id ? "Save Product" : "Update Product"}
            </button>
            {id && (
              <button type="button" onClick={onRemoveCurrent} className="ui red button">
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    currentProduct: state.product.currentProduct,
    isLoading: state.product.isLoading,
    errorMessage: state.product.errorMessage,
  };
};

export default connect(mapStateToProp, { saveProduct, removeCurrent, updateProduct })(
  ProductForm
);
