export default class ColumnsStorage {

    constructor(columns) {
        this.columns = columns;
        this.columnsByKey = this.getColumnsByKey();
    }

    getColumnsByKey() {
        const columnsByKey = {};
        this.columns.forEach(({key, ...data}) => {columnsByKey[key] = data});
        return columnsByKey;
    }

    getItem = key => {
        return this.columnsByKey[key];
    };

}
