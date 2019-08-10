var Info = React.createClass({
    displayName: "Info",
    propTypes: {
        arrStr: React.PropTypes.array,
        strSort: React.PropTypes.bool
    },
    render() {
        var text = [];
        var arrStr = this.props.arrStr.slice();
        if (this.props.strSort)
            arrStr.sort();
        arrStr.forEach(element => {
            text.push(React.DOM.span({
                key: element
            }, element));
            text.push(React.DOM.br({
                key: element + "-br"
            }));
        });
        var element = React.DOM.div({
            className: "Info"
        }, text);
        return element;
    }
});