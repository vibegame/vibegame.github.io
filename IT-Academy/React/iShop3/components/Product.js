import PropTypes from 'prop-types';
import React from 'react';
import './Product.css';

class Product extends React.Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        cbDeleteItem: PropTypes.func.isRequired,
        cbHighlight: PropTypes.func.isRequired,
        cbEdit: PropTypes.func.isRequired
    };
    editProduct = () => {
        this.props.cbEdit(this.props.product);
    }
    deleteProduct = () => {
        let answer = confirm(`Вы действительно хотите удалить ${this.props.product.name}?`);
        if(answer)
            this.props.cbDeleteItem(this.props.product.id);
    }
    highlight = (EO) => {
        this.props.cbHighlight(EO);
    }
    render() {
        return (
            <div className="product" onClick={this.highlight}>
                <span className="name">{this.props.product.name}</span>
                <span className="ID">{this.props.product.id}</span>
                <span className="price">{this.props.product.price}</span>
                <span className="btn edit" onClick={this.editProduct}>Изменить</span>
                <span className="btn delete" onClick={this.deleteProduct}>Удалить</span>
            </div>
        );
    }
}

export default Product;