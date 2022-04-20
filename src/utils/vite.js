import { wallet, abi, utils } from '@vite/vitejs';

import axios from 'axios';
import { contractAbi, settings, hosts } from './consts';
import { mergeArr } from './basic';

const addrTypes = {
  0: 'Illegal',
  1: 'User',
  2: 'Contract'
};

export function fillIdForAbi(item) {
  let id = '';
  if (item.type === 'function' && !item.id) {
    id = abi.encodeFunctionSignature(item);
  } else if (item.type === 'event' && !item.id) {
    id = abi.encodeLogSignature(item);
  }
  return Object.assign(item, { id });
}

// export function fillId(addressAbi) {

//   addressAbi.map(function)

//   addressAbi.forEach((item) => {
//     if (item.type === 'function' && item.id === undefined) {
//       item.id = abi.encodeFunctionSignature(item);
//     } else if (item.type === 'event' && item.id === undefined) {
//       item.id = abi.encodeLogSignature(item);
//     }
//   });
//   return addressAbi;
// }

function loopAbi(abiMap) {
  const result = {};
  Object.keys(abiMap).forEach(key => {
    result[key] = abiMap[key].map(fillIdForAbi);
  });
  return result;
}

export async function getAbiJsonFromGithub(address) {
  const url = `https://raw.githubusercontent.com/vitelabs/vite-contracts/master/${address}/abi.json`;
  const content = await axios.get(url);
  return JSON.stringify(content.data);
}

export function addrType(addr) {
  return addrTypes[wallet.isValidAddress(addr)];
}

export function isContract(addr) {
  return wallet.isValidAddress(addr) === 2;
}

export function isHash(value) {
  if (value.startsWith('0x') && value.length == 66) {
    return /^[0-9a-fA-F]+$/.test(value.slice(2));
  }
  if (value.length === 64) {
    return /^[0-9a-fA-F]+$/.test(value);
  }
  return false;
}

export function isAddress(value) {
  return wallet.isValidAddress(value) > 0;
}

export function isTti(value) {
  return utils.isValidTokenId(value);
}

export function isBuiltInContract(value) {
  return !!contractAbi[value];
}

export const viteAbi = loopAbi(JSON.parse(JSON.stringify(contractAbi)));

export function availableNodes(customNodes) {
  const net = whichNet();
  if (net === 'Mainnet') {
    return settings.nodes.filter(node => node.net === 'Mainnet');
  }
  if (net === 'Buidl') {
    return settings.nodes.filter(node => node.net === 'Buidl');
  }
  let selected = undefined;
  if (customNodes) {
    selected = customNodes.find(v => v.selected === true);
  } else {
    selected = settings.nodes.find(v => v.selected === true);
  }
  var nodes = mergeArr(settings.nodes, customNodes, function key(item) {
    return item.url;
  });
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.url && node.url === selected.url) {
      node.selected = true;
    } else {
      node.selected = false;
    }
  }
  return nodes;
}

export function selectedNode(customNodes) {
  const avaNodes = availableNodes(customNodes);
  console.log('avaible', avaNodes, avaNodes.length);
  if (avaNodes.length > 0) {
    const result = avaNodes.find(v => v.selected === true);
    console.log('result', result);
    if (!result) {
      avaNodes[0].selected = true;
      return avaNodes[0];
    }
    return result;
  }
  return [];
}

export function whichNet() {
  let host = window.location.hostname;
  if (hosts.Mainnet.indexOf(host) >= 0) {
    console.log('host', host, 'Mainnet');
    return 'Mainnet';
  }
  if (hosts.Buidl.indexOf(host) >= 0) {
    console.log('host', host, 'Buidl');
    return 'Buidl';
  }
  console.log('host', host, 'Custom');
  return 'Custom';
}

export function decodeWithdrawData(data) {
  try {
    const dataBuf = Buffer.from(data, 'base64');
    if (dataBuf.length <= 3) {
      return 'parse failed';
    }
    if (3011 != parseInt(dataBuf.slice(0, 2).toString('hex'), 16)) {
      return 'parse failed';
    }

    const typeInt = parseInt(dataBuf.slice(2, 3).toString('hex'), 16);
    if (typeInt === 0) {
      const address = dataBuf.slice(3, dataBuf.length).toString('utf8');

      return address;
    } else if (typeInt === 1) {
      const addressSize = parseInt(dataBuf.slice(3, 4).toString('hex'), 16);
      // parse address
      const address = dataBuf.slice(4, 4 + addressSize).toString('utf8');
      const labelSize = parseInt(
        dataBuf.slice(4 + addressSize, 4 + addressSize + 1).toString('hex'),
        16
      );

      // parse label
      const label = dataBuf
        .slice(4 + addressSize + 1, 4 + addressSize + 1 + labelSize)
        .toString('utf8');
      return {
        address,
        memo: label
      };
    } else {
      return 'parse failed';
    }
  } catch (e) {
    console.error(e);
    return 'parse failed';
  }
}
