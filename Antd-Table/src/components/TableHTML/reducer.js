export const SET_TBODY_TABLE_WIDTH = 'SET_TBODY_TABLE_WIDTH';

export const initialState = {
    tbodyTableWidth: 0
};

export const reducer = (state, action) => {

    switch (action.type) {
        case SET_TBODY_TABLE_WIDTH:
            return {...state, tbodyTableWidth: action.payload};

        default: return state;
    }

};