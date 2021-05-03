// arr should be sorted from large to small
export function insertList(arr, newItem, prop, maxLen = Number.MAX_VALUE) {
  let i = 0;
  for (; i < arr.length; i++) {
    const item = arr[i];
    if (item[prop] < newItem[prop]) {
      arr.splice(i, 0, newItem);

      break;
    }
    // already in list
    if (item[prop] === newItem[prop]) {
      return arr.slice(0, maxLen);
    }
  }

  if (i === arr.length && i < maxLen) {
    arr.push(newItem);
  }

  return arr.slice(0, maxLen);
}

export function aToS(amount, decimals) {
  if (amount == 0 || decimals === 0) {
    return `${amount}`;
  }

  return `${amount}`.slice(0, -decimals);
}
