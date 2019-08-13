import React from 'react';
import PropTypes from 'prop-types';
import "./Card.css";
class Card extends React.Component {
    state = {
        product: this.props.product,
        viewCard: this.props.viewCard,
    };
    static propTypes = {
        viewCard: PropTypes.string
    };
    componentWillUnmount() {
        this.updateState({});
    }
    changeName = (EO) => {
        this.setState({name: EO.target.value});
    }
    changeID = (EO) => {
        this.setState({id: EO.target.value});
    }
    changePrice = (EO) => {
        this.setState({price: EO.target.value});
    }
    createCard = () => {
        switch(this.props.viewCard) {
            case "EDIT": 
            return (
                <div className="card">
                    <h3 className="title">Editing product</h3>
                    <input className="name"  value = {this.state.product.name} onChange={this.changeName}/>
                    <input className="ID"  value = {this.state.product.id}  onChange={this.changeID}/>
                    <input className="price"  value = {this.state.product.price}  onChange={this.changePrice}/>
                </div>
            );
        }
        return null;
    }
    render() {
        console.log(this.state.product);
        return (this.createCard());
    }
}
export default Card;