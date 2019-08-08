var IShop = React.createClass({
    displayName: "IShop",
    render: function() {
        var goods = [];
        this.props.goods.forEach(product => {
            var elem = React.DOM.div({className:product.name, key:product.name},
                React.DOM.h2({className:"Header"}, product.name),
                React.DOM.span({className:"Price"}, `${product.price} ${product.currency}`),
                React.DOM.img({className:"Photo", src:product.photo}),
                React.DOM.span({className:"Count"}, `На складе осталось ${product.count}`),
                );
                goods.push(elem);
        });
        return React.DOM.div({className: "IShop"}, 
        React.DOM.h1({className:"Header"}, this.props.name),
        React.DOM.div({className: "Goods"}, goods));
    }
});