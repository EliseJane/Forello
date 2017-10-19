export default function listsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const { lists } = action.board;

    return lists.reduce((acc, list) => {
      return acc.concat(list.cards);
    }, []);
  } else {
    return state;
  }
}
