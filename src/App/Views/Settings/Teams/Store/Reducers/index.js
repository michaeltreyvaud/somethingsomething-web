import {
  LIST_TEAM_ITEM_ATTEMPT,
  LIST_TEAM_ITEM_SUCCESS,
  LIST_TEAM_ITEM_FAIL,

  CREATE_TEAM_ITEM_SUCCESS,

  DELETE_TEAM_ITEM_SUCCESS,

  UPDATE_TEAM_ITEM_SUCCESS,
} from '../ActionTypes';

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  success: false,
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TEAM_ITEM_ATTEMPT: {
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
        success: false,
        items: [],
      };
    }
    case LIST_TEAM_ITEM_SUCCESS: {
      const { response } = action.payload;
      //  TODO - store the next key etc for pagination
      // TODO - fix the result on the back end?
      const { Groups } = response;
      const items = Groups.map(group => ({
        name: group.GroupName,
        description: group.Description,
      }));
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        success: true,
        items,
      };
    }
    case LIST_TEAM_ITEM_FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: '',
        success: false,
        items: [],
      };
    }
    case CREATE_TEAM_ITEM_SUCCESS: {
      const { response } = action.payload;
      const currentItems = Object.assign(state.items);
      const sortByName = (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      };
      currentItems.push(response);
      currentItems.sort((a, b) => sortByName(a, b));
      return {
        ...state,
        items: currentItems,
      };
    }
    case DELETE_TEAM_ITEM_SUCCESS: {
      const { index } = action.payload;
      const currentItems = Object.assign(state.items);
      currentItems.splice(index, 1);
      return {
        ...state,
        items: currentItems,
      };
    }
    case UPDATE_TEAM_ITEM_SUCCESS: {
      const { index, item } = action.payload;
      const currentItems = Object.assign(state.items);
      currentItems.splice(index, 1);
      const sortByName = (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      };
      currentItems.push(item);
      currentItems.sort((a, b) => sortByName(a, b));
      return {
        ...state,
        items: currentItems,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
