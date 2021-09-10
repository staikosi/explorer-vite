import Vue from 'vue';
import { atos, insertList, tokenView } from '@/utils/_';
import {
  addrType,
  isBuiltInContract,
  fillIdForAbi,
  getAbiJsonFromGithub,
  viteAbi
} from '@/utils/vite';
import { nullToken } from '@/utils/consts';
import { set, get } from '@/utils/storage';

export default {
  namespaced: true,
  state() {
    return {
      account: null,
      txPageSize: 10,
      txs: [],
      utxCount: 0,
      cachedAbi: {}
    };
  },
  getters: {
    txPageNum(state) {
      if (state.account) {
        return Math.ceil(state.account.blockCount / state.txPageSize);
      }
      return 0;
    },
    utxPageNum(state) {
      return Math.ceil(state.utxCount / state.txPageSize);
    }
  },
  actions: {
    getAccountInfo({ state }, address) {
      return Vue.$api
        .request('ledger_getAccountInfoByAddress', address)
        .then(res => {
          if (res.balanceInfoMap) {
            Object.entries(res.balanceInfoMap).forEach(
              ([tti, { tokenInfo, balance }]) => {
                res.balanceInfoMap[tti].balance = atos(
                  balance,
                  tokenInfo.decimals
                );
                tokenInfo.tokenId = tti;
                tokenInfo.tokenSymbolView = tokenView(
                  tokenInfo.tokenSymbol,
                  tokenInfo.index
                );
              }
            );
          }
          res.accountType = addrType(res.address);

          state.account = Object.seal(res);
        });
    },
    getUtxCount({ state }, address) {
      return Vue.$api
        .request('ledger_getUnreceivedTransactionSummaryByAddress', address)
        .then(res => {
          state.utxCount = res.blockCount;
        });
    },
    getUtxs({ state }, address, pageNum) {
      return Vue.$api
        .request(
          'ledger_getUnreceivedBlocksByAddress',
          address,
          pageNum,
          state.txPageSize
        )
        .then(res => {
          state.txs = res.map(tx => {
            tx.amount = atos(tx.amount, tx.tokenInfo.decimals);
            return Object.seal(tx);
          });
        });
    },
    async getAbi({ state }, address) {
      if (address in viteAbi) {
        return viteAbi[address];
      }
      if (address in state.cachedAbi) {
        return state.cachedAbi[address];
      }
      let abiJson = get(`ABI_${address}`);
      if (!abiJson) {
        abiJson = await getAbiJsonFromGithub(address);
      }
      if (abiJson) {
        const abi = fillIdForAbi(JSON.parse(abiJson));
        state.cachedAbi[address] = abi;
        return abi;
      }
    }
  },
  mutations: {
    addTx(state, tx) {
      state.txs = insertList(state.txs, tx, this.txPageSize);
    },
    updateTxs(state, txs) {
      state.txs = txs.map(tx => {
        if (!tx.tokenInfo) {
          tx.tokenInfo = nullToken;
        } else {
          tx.tokenInfo.tokenSymbolView = tokenView(
            tx.tokenInfo.tokenSymbol,
            tx.tokenInfo.index
          );
        }
        tx.amount = atos(tx.amount, tx.tokenInfo.decimals);
        return Object.seal(tx);
      });
    },
    setAbiJson(state, params) {
      if (isBuiltInContract(params.address)) {
        return;
      }
      set(`ABI_${params.address}`, params.abiJson);
    }
  }
};
