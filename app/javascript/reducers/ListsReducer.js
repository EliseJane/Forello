export default function listsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const { lists } = action.board;
    return lists.sort((a, b) => a.position - b.position);
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    const newList = action.list;
    newList.position = Number(newList.position);
    newList.id = Number(newList.id);
    newList.board_id = Number(newList.board_id);

    return state.concat(newList);
  } else if (action.type === 'UPDATE_LIST_SUCCESS') {
    const newList = action.list;
    newList.position = Number(newList.position);
    newList.id = Number(newList.id);
    newList.board_id = Number(newList.board_id);

    return state.map(list => {
      if (list.id === newList.id) {
        return { ...newList }
      } else {
        return list;
      }
    }).sort((a, b) => a.position - b.position);
  } else {
    return state;
  }
}
