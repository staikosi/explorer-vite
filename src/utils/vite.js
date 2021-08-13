import { wallet, abi } from '@vite/vitejs';
import { contract_abi } from './consts';
import axios from 'axios';
const addrTypes = {
  0: 'Illegal',
  1: 'User',
  2: 'Contract'
}
export function addrType(addr) {
  const addrType = wallet.isValidAddress(addr);
  return addrTypes[addrType];
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
  return contract_abi[value] ? true : false;
}

export const vite_abi = loop_abi(JSON.parse(JSON.stringify(contract_abi)));

function loop_abi(abi_map) {
  for (const key in abi_map) {
    fill_id(abi_map[key]);
  }
  return abi_map;
}

export function fill_id(address_abi) {
  address_abi.forEach(item => {
    if (item['type'] === 'function' && item['id'] === undefined) {
      item['id'] = abi.encodeFunctionSignature(item);
    } else if (item['type'] === 'event' && item['id'] === undefined) {
      item['id'] = abi.encodeLogSignature(item);
    }
  });
  return address_abi;
}


export async function getAbiJsonFromGithub(address) {
  const url = `https://raw.githubusercontent.com/vitelabs/vite-contracts/master/${address}/abi.json`;
  const content = await axios.get(url);
  return JSON.stringify(content.data);
}