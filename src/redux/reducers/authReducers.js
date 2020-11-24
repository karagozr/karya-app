import { syncUserConstants as types } from '../constants';

export default function (state = {}, { type, payload }) {
    switch (type) {
        case types.LOGIN_SUCCESS:
            return payload;
        case types.LOGIN_ERROR:
            return payload;
        case types.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
};