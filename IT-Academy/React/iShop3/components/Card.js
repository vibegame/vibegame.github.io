import React from 'react';
import PropTypes from 'prop-types';
import "./Card.css";
class Card extends React.Component {
    static propTypes = {
        view: PropTypes.string,
        product: PropTypes.object,
        cbSaveProduct: PropTypes.func,
        cbCancel: PropTypes.func
    }
    static defaultProps = {
        product: {}
    }
    state = {
        currentName: this.props.product.name,
        currentPrice: this.props.product.price,
        allValidated: false
    }
    btnSaveClick = () => {
        if(!this.state.allValidated) return;
        let product = {
            id: this.props.product.id,
            name: this.state.currentName,
            price: this.state.currentPrice
        };
        this.props.cbSaveProduct(this.props.product.id, product);
    }
    showMessage = (element, message) => {
        element.className = `message ${message}`;
    }
    validateName = (event) => {
        this.setState({currentName: event.target.value});
        let value = event.target.value;
        let message = this.refs["message-name"];
        if(value.length < 3) {
            this.setState({allValidated: false});
            message.innerHTML = "Слишком коротко!";
            this.showMessage(message, "error");
        }
        else if(!/^[A-zА-яЁё]+$/.test(value)) {
            this.setState({allValidated: false});
            message.innerHTML = "Только буквы";
            this.showMessage(message, "error");
        }
        else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            this.setState({allValidated: false});
            message.innerHTML = "Недопустимые символы(ENG)";
            this.showMessage(message, "error");
        } 
        else {
            this.setState({allValidated: true});
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
        }
        message.classList.add("active");
    }

    validatePrice = (event) => {
        this.setState({currentPrice: event.target.value});
        let value = event.target.value;
        let message = this.refs["message-price"];
        if(!value.length) {
            this.setState({allValidated: false});
            message.innerHTML = "Пусто!";
            this.showMessage(message, "error");
        }
        else if (!/^\d+$/.test(value)) {
            this.setState({allValidated: false});
            message.innerHTML = "Только число!";
            this.showMessage(message, "error");
        } 
        else {
            this.setState({allValidated: true});
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
        }
        message.classList.add("active");
    }

    renderCard() {
        function renderEdit(className, text) {
            return (
                <div className={"card " + className}>
                    <h3>{text + this.props.product.id}</h3>
                    <label className="id"> ID: <input type="text" readOnly value={this.props.product.id} /> </label>
                    <label className="name"> Name: <input name="name" type="text" value={this.state.currentName} onChange={this.validateName}/> <span ref="message-name" className="message"></span></label>
                    <label className="price"> Price: <input name="price" type="text" value={this.state.currentPrice} onChange={this.validatePrice}/> <span ref="message-price" className="message"></span></label>
                    <div className={"btn save"+(this.state.allValidated ? " active" : "")} onClick={this.btnSaveClick}>Save</div>
                    <div className="btn cancel active" onClick={this.props.cbCancel}>Cancel</div>
                </div>
            );
        }
        switch(this.props.view) { 
            case "LOOK": 
                return (
                    <div className="card look">
                        <h3>Product with ID: {this.props.product.id}</h3>
                        <div className="ID">ID of product: <span>{this.props.product.id}</span></div>
                        <div className="name">Name of product: <span>{this.props.product.name}</span></div>
                        <div className="price">Price of product: <span>{this.props.product.price}</span></div>
                    </div>
                );
            case "EDIT": return renderEdit.call(this, "edit", "Edit product with ID: ");
            case "ADD": return renderEdit.call(this, "add", "Add new product with ID: ");
        }
    }
    render() {
        return (
            this.renderCard()
        );
    }
}
export default Card;