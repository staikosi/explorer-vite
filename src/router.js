import VueRouter from 'vue-router';

import Snapshot from './views/snapshot';

import Account from './views/account';
import AccountDetail from './views/account/detail';

import Token from './views/token';
import TokenDetail from './views/token/detail';

import Sbp from './views/sbp';

import TxDetail from './views/tx/detail';

const routes = [
  {
    path: '/sbps',
    component: Sbp
  },
  {
    path: '/tokens/:tid',
    component: TokenDetail
  },
  {
    path: '/tokens',
    component: Token
  },
  {
    path: '/accounts/:address',
    component: AccountDetail
  },
  {
    path: '/accounts',
    component: Account
  },
  {
    path: '/tx/:hash',
    component: TxDetail
  },
  {
    path: '/',
    component: Snapshot
  }
];

export default new VueRouter({
  routes,
  linkActiveClass: 'uk-active'
});
