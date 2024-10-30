// reducers/loadingReducer.ts

const initialState = {
    loading: false,
};

const loadingReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case 'LOADING_START':
            return { ...state, loading: true };
        case 'LOADING_END':
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default loadingReducer;