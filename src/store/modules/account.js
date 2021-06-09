import Vue from 'vue';
import { atos, insertList } from '@/utils/_';

export default {
  namespaced: true,
  state() {
    return {
      account: null,
      txPageSize: 10,
      txs: [],
      utxCount: 0
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
                tokenInfo.tokenSymbolView =
                  tokenInfo.tokenSymbol +
                  '-' +
                  (Array(3).join('0') + tokenInfo.index).slice(-3);
              }
            );
          }

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
    }
  },
  mutations: {
    addTx(state, tx) {
      state.txs = insertList(state.txs, tx, this.txPageSize);
    },
    updateTxs(state, txs) {
      state.txs = txs.map(tx => {
        if (tx.blockType == 7) {
          tx.tokenInfo = {
            decimals: 0,
            index: 0,
            tokenId: "",
            tokenName: "",
            tokenSymbol: "",
          }
        }
        tx.amount = atos(tx.amount, tx.tokenInfo.decimals);
        return Object.seal(tx);
      });
    }
  }
};
