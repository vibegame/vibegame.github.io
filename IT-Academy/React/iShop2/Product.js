var Product = React.createClass({
    displayName: "Product",
    getInitialState: function () {
        return {
            goods: this.props.product
        };
    },
    highlight: function (EO) {
        let element = EO.currentTarget;
        let product = this.props.product;
        if(!EO.target.classList.contains("Delete"))
            this.props.cbHighlight(element);
        else
            this.deleteItem(product);
    },
    deleteItem: function(product) {
        let answer = confirm(`Вы действительно хотите удалить ${product.name}?`);
        if(answer)
            this.props.cbDeleteItem(product.id);
    },
    render: function () {
        return React.DOM.div({
                className: this.props.product.name,
                key: this.props.product.id,
                onClick: this.highlight
            },
            React.DOM.h2({
                className: "Header"
            }, this.props.product.name),
            React.DOM.span({
                className: "Price"
            }, `${this.props.product.price} ${this.props.product.currency}`),
            React.DOM.span({
                className: "Count"
            }, `На складе осталось ${this.props.product.count}`),
            React.DOM.div({
                className: "Delete",
            }, "Удалить")
        );
    }
});