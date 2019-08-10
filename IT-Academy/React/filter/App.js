var App = React.createClass({
    displayName: "App",
    propTypes: {
        arrStr: React.PropTypes.array
    },
    getInitialState() {
        return {
            strInfo: arrStr,
            strInfoChanged: arrStr,
            strDefault: "",
            strSort: false
        }
    },
    strChange: function (EO) {
        let str = EO.target.value.toLowerCase();
        this.setState({
            strInfoChanged: this.state.strInfo.filter(element => {
                if (element.toLowerCase().indexOf(str) >= 0) return true;
            })
        });
        this.setState({
            strDefault: str
        });
    },
    strReset: function () {
        this.setState({
            strDefault: "",
            strInfoChanged: this.state.strInfo,
            strSort: false
        });
    },
    sortStr: function (EO) {
        this.setState({
            strSort: EO.target.checked
        });
    },
    render() {
        return React.DOM.div({
            className: "App"
        }, React.DOM.input({
            type: "checkbox",
            onChange: this.sortStr,
            checked: this.state.strSort
        }), React.DOM.input({
            type: "text",
            onChange: this.strChange,
            value: this.state.strDefault
        }), React.DOM.div({
            className: "btn reset",
            onClick: this.strReset
        }, "Reset"), React.createElement(Info, {
            arrStr: this.state.strInfoChanged,
            strSort: this.state.strSort
        }));
    }
});