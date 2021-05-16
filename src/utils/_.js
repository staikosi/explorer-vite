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


export function atos(amount, decimals, showDecimals = 8) {
  if (amount == 0 || decimals === 0) {
    return `${amount}`;
  }
  if (amount.length > decimals) {
    return withCommas(amount.slice(0, -decimals)) + "." + amount.slice(amount.length - decimals, amount.length).slice(0, showDecimals).replace(/0*$/, '');
  } else {
    const b = "0".repeat(decimals - amount.length) + amount.slice(0, showDecimals - (decimals - amount.length)).replace(/0*$/, '');
    if (b.length != 0) {
      return "0." + b;
    } else {
      const ab = "0".repeat(decimals - amount.length) + amount.slice(0, (decimals - amount.length)).replace(/0*$/, '');
      return parseFloat(ab).toString();
    }
  }
}

export function withCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getSbpName(sbps, producer) {
  const sbp = sbps.find(sbp => sbp.blockProducingAddress === producer);
  if (sbp) {
    return sbp.sbpName;
  }
  return '';
}

export function blockTypeText(blockType) {
  switch (blockType) {
    case 1:
      return 'SendCreate';
    case 2:
      return 'SendCall';
    case 3:
      return 'SendReward';
    case 4:
      return 'Receive';
    case 5:
      return 'ReceiveError';
    case 6:
      return 'SendRefund';
    case 7:
      return 'GenesisReceive';
    default:
      return 'Unknown';
  }
}
export function isReceive(blockType) {
  switch (blockType) {
    case 4:
      // return 'Receive';
      return true;
    case 5:
      // return 'ReceiveError';
      return true;
    case 7:
      // return 'GenesisReceive';
      return true;
    default:
      return false;
  }
}
