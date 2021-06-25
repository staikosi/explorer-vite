// TODO the real node address
export const NODE = 'http://116.63.158.55:48132';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const PAGE_SIZE = 10;

export const VITE = 'tti_5649544520544f4b454e6e40';



export const settings = {
	nodes: [{
		net: 'Mainnet',
		selected: true,
		url: 'https://node.vite.net/gvite',
	},
	{
		net: 'Buidl',
		selected: false,
		url: 'https://buidl.vite.net/gvite',
	}]
}