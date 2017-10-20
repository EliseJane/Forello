export default function listsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const { lists } = action.board;
    return lists;
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    const newList = action.list;
    newList.position = Number(action.list.position);
    newList.id = Number(action.list.id);
    newList.board_id = Number(action.board_id);
    return state.concat(newList);
  } else {
    return state;
  }
}
