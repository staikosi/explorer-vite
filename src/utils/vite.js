import { wallet } from '@vite/vitejs';

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