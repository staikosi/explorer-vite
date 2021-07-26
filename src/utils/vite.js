import { wallet, abi } from '@vite/vitejs';
import { contract_abi } from './consts';

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

export const vite_abi = fill_method_sig(contract_abi);


function fill_method_sig(_abi) {
  let result = {};
  for (const key in _abi) {
    result[key] = {};
    _abi[key].forEach(ele => {
      if (ele['type'] === 'function') {
        result[key][abi.encodeFunctionSignature(ele)] = ele;
      }
    })
  }
  return result;
}