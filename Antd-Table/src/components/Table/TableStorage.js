class TableStorage {

    columns = [];
    widths = {};
    orders = [];

    _setWidthsFromColumns = () => {

        const widths = {};

        this.columns.forEach(column => {
            widths[column.key] = column.width;
        });

        this.widths = widths;

    };

    _setOrdersFromColumns = () => {

        const orders = [];

        this.columns.forEach(column => {
            orders.push(column.key);
        });

        this.orders = orders;

    };

    updateColumns = (columns) => {
        this.columns = columns;
        this._setWidthsFromColumns();
        this._setOrdersFromColumns();
    };

    updateWidth = ({key, width}) => {
        this.widths = {...this.widths, [key]:width};
    };

    getWidth = key => {
        return this.widths[key];
    };

    constructor({columns}) {
        this.updateColumns(columns);
    }

}

export default TableStorage;