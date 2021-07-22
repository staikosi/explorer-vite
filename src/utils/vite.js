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