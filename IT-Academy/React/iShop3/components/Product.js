import PropTypes from 'prop-types';
import React from 'react';
import './Product.css';

class Product extends React.Component {
    static propTypes = {
        product: PropTypes.object,
        btnDeleteEnable: PropTypes.bool,
        btnEditEnable: PropTypes.bool,
        cbDeleteProduct: PropTypes.func,
        cbHighlightProductId: PropTypes.func,
        highlight: PropTypes.bool,
        cbEditProduct: PropTypes.func
    }
    btnDeleteClick = (event) => {
        if(!event.currentTarget.classList.contains("active")) return;
        let answer = confirm("Вы действительно хотите удалить этот товар?");
        if(answer) this.props.cbDeleteProduct(this.props.product);
    }
    btnEditClick = (event) => {
        if(!event.currentTarget.classList.contains("active")) return;
        this.props.cbEditProduct(this.props.product.id, this.props.product);
    }
    productHighlight = (event) => {
        if(event.target.classList.contains("btn")) return;
        this.props.cbHighlightProductId(this.props.product.id, this.props.product);
    }
    render() {
        return (
        <div className={"product" + (this.props.highlight ? " highlight" : "")} onClick={this.productHighlight}>
            <span className="id">{this.props.product.id}</span>
            <span className="name">{this.props.product.name}</span>
            <span className="price">{this.props.product.price}</span>
            <div onClick = {this.btnDeleteClick} className={"btn delete" + (this.props.btnDeleteEnable ? " active" : "")}>Delete</div>
            <div onClick = {this.btnEditClick} className={"btn edit" + (this.props.btnEditEnable ? " active" : "")}>Edit</div>
        </div>
        )
    }
}

export default Product;