import VueRouter from 'vue-router';

import Snapshot from './views/snapshot';
import SnapshotPage from './views/snapshot';
import SnapshotDetail from './views/snapshot/detail';

import AccountDetail from './views/account/detail';
import Accounts from './views/account';

import Token from './views/token';
import TokenDetail from './views/token/detail';

import Sbp from './views/sbp';
import SbpDetail from './views/sbp/detail';

import TxDetail from './views/tx/detail';

const routes = [
  {
    path: '/sbps',
    component: Sbp
  },
  {
    path: '/sbp/:name',
    component: SbpDetail
  },
  {
    path: '/token/:tid',
    component: TokenDetail
  },
  {
    path: '/tokens',
    component: Token
  },
  {
    path: '/account/:address',
    component: AccountDetail
  },
  {
    path: '/accounts',
    component: Accounts
  },
  {
    path: '/tx/:hash',
    component: TxDetail
  },
  {
    path: '/',
    component: Snapshot
  },
  {
    path: '/snapshot/:heightorhash',
    component: SnapshotDetail
  },
  {
    path: '/snapshot/page/:page',
    component: SnapshotPage
  }
];

export default new VueRouter({
  routes,
  linkActiveClass: 'uk-active'
});
