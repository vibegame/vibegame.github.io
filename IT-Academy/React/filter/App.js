var App = React.createClass({
    displayName: "App",
    propTypes: {
        arrStr: React.PropTypes.array
    },
    getInitialState() {
        return {
            strInfo: arrStr,
            strInfoChanged: arrStr,
            strNow: "",
            strSort: false,
        }
    },
    processList: function () {
        let arrStr = this.props.arrStr.slice();
        let str = this.state.strNow.toLowerCase();
        arrStr = arrStr.filter(element => {
            if (element.toLowerCase().indexOf(str) >= 0) return true;
        });
        if (this.state.strSort)
            arrStr.sort();
        this.setState({strInfoChanged: arrStr});
    },
    strChange: function (EO) {
        this.setState({
            strNow: EO.target.value
        }, this.processList);
    },
    reset: function () {
        this.setState({
            strNow: "",
            strInfoChanged: this.state.strInfo,
            strSort: false
        });
    },
    needSort: function (EO) {
        this.setState({
            strSort: EO.target.checked
        }, this.processList);
    },
    createList: function () {
        let text = [];
        this.state.strInfoChanged.forEach(element => {
            text.push(React.DOM.span({
                key: element
            }, element));
            text.push(React.DOM.br({
                key: element + "-br"
            }));
        });
        return text;
    },
    render() {
        return React.DOM.div({
                className: "App"
            }, React.DOM.input({
                type: "checkbox",
                onChange: this.needSort,
                checked: this.state.strSort
            }), React.DOM.input({
                type: "text",
                onChange: this.strChange,
                value: this.state.strNow
            }), React.DOM.div({
                className: "btn reset",
                onClick: this.reset
            }, "Reset"),
            React.DOM.div({
                className: "info"
            }, this.createList())
        );
    }
});