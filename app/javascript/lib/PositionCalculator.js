export default function PositionCalculator(items, targetIndex, originalIndex) {
  const itemsClone = items.slice();
  const isOnly = itemsClone.length === 0;
  const isFirst = targetIndex === 0;

  itemsClone.sort((a, b) => a.position - b.position);

  if (originalIndex === 0 || originalIndex > 0) itemsClone.splice(originalIndex, 1);

  const isLast = targetIndex >= itemsClone.length;

  if (isOnly || itemsClone.length === 0) {
    return 65535;
  } else if (isFirst) {
    return itemsClone[0].position / 2;
  } else if (isLast) {
    return itemsClone[itemsClone.length - 1].position + 65536;
  } else {
    let itemBefore, itemAfter;

    itemBefore = itemsClone[targetIndex - 1];
    itemAfter = itemsClone[targetIndex];

    return (itemBefore.position + itemAfter.position) / 2;
  }
};
