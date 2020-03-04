import { SELECT_ITEM, EDIT_ITEM, ADD_ITEM, RESET_LIST } from './action_types';

export const setSelected = (selectedID) => {
    return ({type: SELECT_ITEM, selectedID})
}

export const setEdit = (editID) => {
    return ({type: EDIT_ITEM, editID})
}

export const resetList = () => {
    return ({type: RESET_LIST, })
}