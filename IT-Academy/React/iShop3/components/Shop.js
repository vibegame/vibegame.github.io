import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import Card from './Card';
import "./Shop.css";
class Shop extends React.Component {
    static PropTypes = {
        goods: PropTypes.array
    }
    state = {
        btnDeleteEnable: true,
        btnEditEnable: true,
        goods: this.props.goods,
        highlightedProductId: undefined,
        cardProduct: undefined,
        cardView: undefined
    }
    closeCard = () => {
        this.setState(
            {            
                cardProduct: undefined,
                cardView: undefined
            }
        );
    }
    unHighlight = () => {
        this.setState( 
            {
                highlightedProductId: undefined
            }
        );
    }
    cbDeleteProduct = (product) => {
        let newGoods = [];
        newGoods = this.state.goods.filter(element => {
            if(product.id == element.id) return false;
            return true;
        });
        if((this.state.cardProduct && this.state.cardProduct.id == product.id) || this.state.highlightedProductId == product.id) 
            this.closeCard();
        this.setState({goods: newGoods});
    }
    cbHighlightProductId = (id, product) => {
        if(this.state.highlightedProductId == id) {
            this.setState({
                highlightedProductId: undefined,
                cardProduct: undefined,
                cardView: undefined
            });
        } else  
        this.setState({
            highlightedProductId: id,
            cardProduct: product,
            cardView: "LOOK"
        });
    }
    cbEditProduct = (id, product) => {
        this.setState({
            highlightedProductId: id,
            cardProduct: product,
            cardView: "EDIT"
        });
        this.unHighlight();
    }
    cbSaveProduct = (id, product) => {
        let newGoods = [],
            found = false;
        this.state.goods.forEach(element => {
            if(element.id == id) {
                let newProduct = {};
                Object.assign(element, product);
                found = true;
            }
            newGoods.push(element);
        });
        if(!found) {
            newGoods.push(product);
        }
        this.setState({goods: newGoods});
        this.closeCard();
        this.unHighlight();
    }
    renderId = (max) => {
        let accept,
            id;
        do {
            accept = false;
            id = Math.floor(Math.random()*max + 1);
            for(let i = 0; i < this.state.goods.length; i++) {
                let elem = this.state.goods[i];
                if(elem.id == id) {
                    accept = true;
                    break;
                }
            }
        }while(accept)
        return id;
    }
    addProduct = () => {
        let newID = this.renderId(10000);
        let newProduct = {
            id: newID,
            name: "",
            price: ""
        };
        this.setState({
            cardProduct: newProduct,
            cardView: "ADD"
        });
    }
    renderProducts() {
        let products = [];
        this.state.goods.forEach(product => {
            let element = 
            (<Product 
            key={product.id} 
            product={product} 
            btnDeleteEnable = {this.state.btnDeleteEnable} 
            btnEditEnable = {this.state.btnEditEnable}
            cbDeleteProduct = {this.cbDeleteProduct}
            cbHighlightProductId = {this.cbHighlightProductId}
            highlight = {this.state.highlightedProductId == product.id}
            cbEditProduct = {this.cbEditProduct}
            />);
            products.push(element);
        });
        return products;
    }
    render() {
        return (
            <div className="shop">
                <div className="titles">            
                    <span className="id">ID</span>
                    <span className="name">NAME</span>
                    <span className="price">PRICE</span>
                    <span className="controls">Controls</span>
                </div>
                <div className="products">
                    {this.renderProducts()}
                </div>
                {this.state.cardView ? 
                <Card 
                view = {this.state.cardView}
                product = {this.state.cardProduct}
                key = {this.state.cardProduct.id}
                cbSaveProduct = {this.cbSaveProduct}
                cbCancel = {this.closeCard}
                /> : <div className="btn add" onClick={this.addProduct}>+</div>}
            </div>
        );
    }
}
export default Shop;