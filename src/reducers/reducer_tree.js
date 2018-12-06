import { TREE } from '../constants/constants';

let tree = null;

export default (state = tree, action) => {
    switch(action.type){
        case TREE:
            return {
                ...state,
                tree: action.tree
            }
        default:
            return state;
    }
}