import { wallet, abi } from '@vite/vitejs';
import axios from 'axios';
import { contractAbi } from './consts';

const addrTypes = {
  0: 'Illegal',
  1: 'User',
  2: 'Contract'
};

export function fillIdForAbi(item) {
  let id = '';
  if (item.type === 'function' && item.id === undefined) {
    id = abi.encodeFunctionSignature(item);
  } else if (item.type === 'event' && item.id === undefined) {
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
  return value.length === 64;
}

export function isAddress(value) {
  return value.startsWith('vite_') && value.length === 55;
}

export function isTti(value) {
  return value.startsWith('tti_') && value.length === 28;
}

export function isBuiltInContract(value) {
  return !!contractAbi[value];
}

export const viteAbi = loopAbi(JSON.parse(JSON.stringify(contractAbi)));
