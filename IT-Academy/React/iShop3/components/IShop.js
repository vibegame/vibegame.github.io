import PropTypes from 'prop-types';
import React from 'react';
import Product from './Product';
import Card from './Card';
import './IShop.css';

class IShop extends React.Component {
    static propTypes = {
        goods: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired
    };
    state = {
        goods: this.props.goods,
        currentHighlightedItem: null,
        viewCard: null,
        itemCard: null
    }
    cbEdit = (product) => {
        this.setState({viewCard: "EDIT", itemCard: product});
    }
    cbNew = () => {
        this.setState({viewCard: "NEW"});
    }
    cbDeleteItem = (ID) => {
        let newGoods = this.state.goods.slice();
        newGoods = newGoods.filter(element => {
            return ID != element.id;
        });
        this.setState({goods: newGoods});
    }
    cbHighlight = (EO) => {
        if(EO.target.classList.contains("btn"))
            return false;
        if(this.state.currentHighlightedItem) {
            this.state.currentHighlightedItem.classList.remove("highlighting");
        }
        EO.currentTarget.classList.add("highlighting");
        this.setState({
            currentHighlightedItem: EO.currentTarget
        });
    }
    createTable = () => {
        var table = [];
        var goods = this.state.goods;
        goods.forEach(element => {
            let elem = <Product product={element} key={element.id} cbDeleteItem={this.cbDeleteItem} cbHighlight={this.cbHighlight} cbEdit={this.cbEdit}></Product>
            table.push(elem);
        });
        return table;
    }
    render() {
        console.log(this.state.itemCard);
        return (
        <div className="iShop">
            <h1 className="header">{this.props.name}</h1>
            <div className="goods">
                <div className="titles">
                    <span className="name">Название</span>
                    <span className="ID">ID товара</span>
                    <span className="price">Цена</span>
                    <span className="controls">Управление</span>
                </div>
                {this.createTable()}
            </div>
            <Card product={this.state.itemCard} viewCard={this.state.viewCard}/>
        </div>
        );

    }
}

export default IShop;