var IShop = React.createClass({
    displayName: "IShop",
    getInitialState: function () {
        return {
            goods: this.props.goods,
            currentElementHighlighted: null,
            lastElementHighlighted: null
        };
    },
    highlight: function(element) {
        element.classList.toggle("highlight");
        this.setState({currentElementHighlighted: element, lastElementHighlighted: this.state.currentElementHighlighted}, function() {
            if(this.state.lastElementHighlighted && this.state.lastElementHighlighted != this.state.currentElementHighlighted)
                this.state.lastElementHighlighted.classList.remove("highlight");
        });
    },
    cbDeleteItem: function(name) {
        var newGoods = this.state.goods.slice();
        newGoods = newGoods.filter(product => {
            return product.name != name;
        });
        this.setState({goods: newGoods});        
    },
    createTable: function () {
        var goods = [];
        this.state.goods.forEach(product => {
            var elem = React.createElement(Product, {
                product: product,
                key: product.name,
                cbHighlight: this.highlight,
                cbDeleteItem: this.cbDeleteItem
            });
            goods.push(elem);
        });
        return goods;
    },
    render: function () {
        return React.DOM.div({
                className: "IShop"
            },
            React.DOM.h1({
                className: "Header"
            }, this.props.name),
            React.DOM.div({
                className: "Goods"
            }, this.createTable()),
        );
    }
});