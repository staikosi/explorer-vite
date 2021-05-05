import VueRouter from 'vue-router';

import Snapshot from './views/snapshot';
import SnapshotPage from './views/snapshot';
import SnapshotDetail from './views/snapshot/detail';

import AccountDetail from './views/account/detail';

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
    path: '/sbps/:name',
    component: SbpDetail
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
    component: AccountDetail
  },
  {
    path: '/txs/:hash',
    component: TxDetail
  },
  {
    path: '/',
    component: Snapshot
  },
  {
    path: '/snapshots/:heightorhash',
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
