import { loadConstants as type } from '../constants';

export const loadActions = {
    open,
    close
};

function open() {
    return { type: type.OPEN_LOAD };
}

function close() {
    return { type: type.CLOSE_LOAD };
}
