export default function cardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const { lists } = action.board;
    return lists.reduce((acc, list) => {
      return acc.concat(list.cards);
    }, []);
  } else if (action.type === 'CREATE_CARD_SUCCESS') {
    const newCard = action.card;
    newCard.position = Number(newCard.position);
    newCard.id = Number(newCard.id);
    newCard.list_id = Number(newCard.list_id);

    return state.concat(newCard);
  } else if (action.type === 'FETCH_CARD_SUCCESS') {
    const excludedCards = state.filter(card => card.id !== action.card.id);
    const { other, ...newCard } = action.card;

    return excludedCards.concat(newCard);
  } else {
    return state;
  }
}
