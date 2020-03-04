import { SELECT_ITEM, EDIT_ITEM, ADD_ITEM, RESET_LIST } from '../action_types';

const initialState = {
    edit: false,
    new: false
}

export default function (state = initialState, action) {
    switch (action.type) {
      case SELECT_ITEM:
        console.log(action.selectedID)
          return {
              ...state,
              edit: false,
              selectedID: action.selectedID
          }
      case EDIT_ITEM:
        return {
            ...state,
            edit: true,
            editID: action.editID
        }
        case ADD_ITEM:
            return {
                ...state,
                edit: false,
                new: true
            }
        case RESET_LIST:
            return {
                ...state,
                edit: false,
                new: false
            }
      default:
        return { ...state }
    }
}