// reducers/userReducer.ts

import { Dispatch } from 'redux';

interface UserState {
    name: string;
    email: string;
    dob: string;
    sex: string;
    height: string;
    weight: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    dob: '',
    sex: '',
    height: '',
    weight: '',
};

const userReducer = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case 'REGISTER_USER':
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default userReducer;
