// TODO the real node address
export const NODE = 'http://116.63.158.55:48132';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const PAGE_SIZE = 10;

export const VITE = 'tti_5649544520544f4b454e6e40';

export const nullToken = {
  decimals: 0,
  index: 0,
  tokenId: "",
  tokenName: "",
  tokenSymbol: "",
}

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

export const builtin_contracts = [
  {
    desc: 'Quota Contract',
    address: 'vite_0000000000000000000000000000000000000003f6af7459b9'
  },
  {
    desc: 'Consensus Contract',
    address: 'vite_0000000000000000000000000000000000000004d28108e76b'
  },
  {
    desc: 'Token Issuance Contract',
    address: 'vite_000000000000000000000000000000000000000595292d996d'
  },
  {
    desc: 'Dex Fund Contract',
    address: 'vite_0000000000000000000000000000000000000006e82b8ba657'
  },
  {
    desc: 'Dex Trade Contract',
    address: 'vite_00000000000000000000000000000000000000079710f19dc7'
  },
]

export const contract_abi = {
  'vite_0000000000000000000000000000000000000004d28108e76b': [
    { "type": "variable", "name": "consensusGroupInfo", "inputs": [{ "name": "nodeCount", "type": "uint8" }, { "name": "interval", "type": "int64" }, { "name": "perCount", "type": "int64" }, { "name": "randCount", "type": "uint8" }, { "name": "randRank", "type": "uint8" }, { "name": "repeat", "type": "uint16" }, { "name": "checkLevel", "type": "uint8" }, { "name": "countingTokenId", "type": "tokenId" }, { "name": "registerConditionId", "type": "uint8" }, { "name": "registerConditionParam", "type": "bytes" }, { "name": "voteConditionId", "type": "uint8" }, { "name": "voteConditionParam", "type": "bytes" }, { "name": "owner", "type": "address" }, { "name": "stakeAmount", "type": "uint256" }, { "name": "expirationHeight", "type": "uint64" }] },
    { "type": "variable", "name": "registerStakeParam", "inputs": [{ "name": "stakeAmount", "type": "uint256" }, { "name": "stakeToken", "type": "tokenId" }, { "name": "stakeHeight", "type": "uint64" }] },

    { "type": "function", "name": "Register", "inputs": [{ "name": "gid", "type": "gid" }, { "name": "sbpName", "type": "string" }, { "name": "blockProducingAddress", "type": "address" }] },
    { "type": "function", "name": "RegisterSBP", "inputs": [{ "name": "sbpName", "type": "string" }, { "name": "blockProducingAddress", "type": "address" }, { "name": "rewardWithdrawAddress", "type": "address" }] },

    { "type": "function", "name": "UpdateRegistration", "inputs": [{ "name": "gid", "type": "gid" }, { "name": "sbpName", "type": "string" }, { "name": "blockProducingAddress", "type": "address" }] },
    { "type": "function", "name": "UpdateBlockProducingAddress", "inputs": [{ "name": "gid", "type": "gid" }, { "name": "sbpName", "type": "string" }, { "name": "blockProducingAddress", "type": "address" }] },
    { "type": "function", "name": "UpdateSBPBlockProducingAddress", "inputs": [{ "name": "sbpName", "type": "string" }, { "name": "blockProducingAddress", "type": "address" }] },

    { "type": "function", "name": "UpdateSBPRewardWithdrawAddress", "inputs": [{ "name": "sbpName", "type": "string" }, { "name": "rewardWithdrawAddress", "type": "address" }] },

    { "type": "function", "name": "CancelRegister", "inputs": [{ "name": "gid", "type": "gid" }, { "name": "sbpName", "type": "string" }] },
    { "type": "function", "name": "Revoke", "inputs": [{ "name": "gid", "type": "gid" }, { "name": "sbpName", "type": "string" }] },
    { "type": "function", "name": "RevokeSBP", "inputs": [{ "name": "sbpName", "type": "string" }] },

    { "type": "function", "name": "Reward", "inputs": [{ "name": "gid", "type": "gid" }, { "name": "sbpName", "type": "string" }, { "name": "receiveAddress", "type": "address" }] },
    { "type": "function", "name": "WithdrawReward", "inputs": [{ "name": "gid", "type": "gid" }, { "name": "sbpName", "type": "string" }, { "name": "receiveAddress", "type": "address" }] },
    { "type": "function", "name": "WithdrawSBPReward", "inputs": [{ "name": "sbpName", "type": "string" }, { "name": "receiveAddress", "type": "address" }] },

    { "type": "variable", "name": "registrationInfo", "inputs": [{ "name": "name", "type": "string" }, { "name": "blockProducingAddress", "type": "address" }, { "name": "stakeAddress", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "expirationHeight", "type": "uint64" }, { "name": "rewardTime", "type": "int64" }, { "name": "revokeTime", "type": "int64" }, { "name": "hisAddrList", "type": "address[]" }] },
    { "type": "variable", "name": "registrationInfoV2", "inputs": [{ "name": "name", "type": "string" }, { "name": "blockProducingAddress", "type": "address" }, { "name": "rewardWithdrawAddress", "type": "address" }, { "name": "stakeAddress", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "expirationHeight", "type": "uint64" }, { "name": "rewardTime", "type": "int64" }, { "name": "revokeTime", "type": "int64" }, { "name": "hisAddrList", "type": "address[]" }] },
    { "type": "variable", "name": "registeredHisName", "inputs": [{ "name": "name", "type": "string" }] },

    { "type": "function", "name": "Vote", "inputs": [{ "name": "gid", "type": "gid" }, { "name": "sbpName", "type": "string" }] },
    { "type": "function", "name": "VoteForSBP", "inputs": [{ "name": "sbpName", "type": "string" }] },
    { "type": "function", "name": "CancelVote", "inputs": [{ "name": "gid", "type": "gid" }] },
    { "type": "function", "name": "CancelSBPVoting", "inputs": [] },

    { "type": "variable", "name": "voteInfo", "inputs": [{ "name": "sbpName", "type": "string" }] }
  ],
  'vite_0000000000000000000000000000000000000003f6af7459b9': [
    { "type": "function", "name": "Pledge", "inputs": [{ "name": "beneficiary", "type": "address" }] },
    { "type": "function", "name": "Stake", "inputs": [{ "name": "beneficiary", "type": "address" }] },
    { "type": "function", "name": "StakeForQuota", "inputs": [{ "name": "beneficiary", "type": "address" }] },

    { "type": "function", "name": "CancelPledge", "inputs": [{ "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }] },
    { "type": "function", "name": "CancelStake", "inputs": [{ "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }] },
    { "type": "function", "name": "CancelQuotaStaking", "inputs": [{ "name": "id", "type": "bytes32" }] },

    { "type": "function", "name": "AgentPledge", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "bid", "type": "uint8" }, { "name": "stakeHeight", "type": "uint64" }] },
    { "type": "function", "name": "DelegateStake", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "bid", "type": "uint8" }, { "name": "stakeHeight", "type": "uint64" }] },
    { "type": "function", "name": "StakeForQuotaWithCallback", "inputs": [{ "name": "beneficiary", "type": "address" }, { "name": "stakeHeight", "type": "uint64" }] },

    { "type": "function", "name": "AgentCancelPledge", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }] },
    { "type": "function", "name": "CancelDelegateStake", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }] },
    { "type": "function", "name": "CancelQuotaStakingWithCallback", "inputs": [{ "name": "id", "type": "bytes32" }] },

    { "type": "callback", "name": "AgentPledge", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }, { "name": "success", "type": "bool" }] },
    { "type": "callback", "name": "DelegateStake", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }, { "name": "success", "type": "bool" }] },
    { "type": "callback", "name": "StakeForQuotaWithCallback", "inputs": [{ "name": "id", "type": "bytes32" }, { "name": "success", "type": "bool" }] },

    { "type": "callback", "name": "AgentCancelPledge", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }, { "name": "success", "type": "bool" }] },
    { "type": "callback", "name": "CancelDelegateStake", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }, { "name": "success", "type": "bool" }] },
    { "type": "callback", "name": "CancelQuotaStakingWithCallback", "inputs": [{ "name": "id", "type": "bytes32" }, { "name": "success", "type": "bool" }] },

    { "type": "variable", "name": "stakeInfo", "inputs": [{ "name": "amount", "type": "uint256" }, { "name": "expirationHeight", "type": "uint64" }, { "name": "beneficiary", "type": "address" }, { "name": "isDelegated", "type": "bool" }, { "name": "delegateAddress", "type": "address" }, { "name": "bid", "type": "uint8" }] },

    { "type": "variable", "name": "stakeInfoV2", "inputs": [{ "name": "amount", "type": "uint256" }, { "name": "expirationHeight", "type": "uint64" }, { "name": "beneficiary", "type": "address" }, { "name": "id", "type": "bytes32" }] },

    { "type": "variable", "name": "stakeBeneficial", "inputs": [{ "name": "amount", "type": "uint256" }] }
  ],
  'vite_000000000000000000000000000000000000000595292d996d': [
    { "type": "function", "name": "Mint", "inputs": [{ "name": "isReIssuable", "type": "bool" }, { "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }, { "name": "totalSupply", "type": "uint256" }, { "name": "decimals", "type": "uint8" }, { "name": "maxSupply", "type": "uint256" }, { "name": "isOwnerBurnOnly", "type": "bool" }] },
    { "type": "function", "name": "IssueToken", "inputs": [{ "name": "isReIssuable", "type": "bool" }, { "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }, { "name": "totalSupply", "type": "uint256" }, { "name": "decimals", "type": "uint8" }, { "name": "maxSupply", "type": "uint256" }, { "name": "isOwnerBurnOnly", "type": "bool" }] },

    { "type": "function", "name": "Issue", "inputs": [{ "name": "tokenId", "type": "tokenId" }, { "name": "amount", "type": "uint256" }, { "name": "receiveAddress", "type": "address" }] },
    { "type": "function", "name": "ReIssue", "inputs": [{ "name": "tokenId", "type": "tokenId" }, { "name": "amount", "type": "uint256" }, { "name": "receiveAddress", "type": "address" }] },

    { "type": "function", "name": "Burn", "inputs": [] },
    { "type": "function", "name": "Burn2", "inputs": [{ "name": "target", "type": "uint256" }, { "name": "to", "type": "bytes" }] },

    { "type": "function", "name": "TransferOwner", "inputs": [{ "name": "tokenId", "type": "tokenId" }, { "name": "newOwner", "type": "address" }] },
    { "type": "function", "name": "TransferOwnership", "inputs": [{ "name": "tokenId", "type": "tokenId" }, { "name": "newOwner", "type": "address" }] },

    { "type": "function", "name": "ChangeTokenType", "inputs": [{ "name": "tokenId", "type": "tokenId" }] },
    { "type": "function", "name": "DisableReIssue", "inputs": [{ "name": "tokenId", "type": "tokenId" }] },

    { "type": "function", "name": "GetTokenInfo", "inputs": [{ "name": "tokenId", "type": "tokenId" }, { "name": "bid", "type": "uint8" }] },
    { "type": "function", "name": "GetTokenInformation", "inputs": [{ "name": "tokenId", "type": "tokenId" }] },
    { "type": "callback", "name": "GetTokenInfo", "inputs": [{ "name": "tokenId", "type": "tokenId" }, { "name": "bid", "type": "uint8" }, { "name": "exist", "type": "bool" }, { "name": "decimals", "type": "uint8" }, { "name": "tokenSymbol", "type": "string" }, { "name": "index", "type": "uint16" }, { "name": "ownerAddress", "type": "address" }] },
    { "type": "callback", "name": "GetTokenInformation", "inputs": [{ "name": "id", "type": "bytes32" }, { "name": "tokenId", "type": "tokenId" }, { "name": "exist", "type": "bool" }, { "name": "isReIssuable", "type": "bool" }, { "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }, { "name": "totalSupply", "type": "uint256" }, { "name": "decimals", "type": "uint8" }, { "name": "maxSupply", "type": "uint256" }, { "name": "isOwnerBurnOnly", "type": "bool" }, { "name": "index", "type": "uint16" }, { "name": "ownerAddress", "type": "address" }] },

    { "type": "variable", "name": "tokenInfo", "inputs": [{ "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }, { "name": "totalSupply", "type": "uint256" }, { "name": "decimals", "type": "uint8" }, { "name": "owner", "type": "address" }, { "name": "isReIssuable", "type": "bool" }, { "name": "maxSupply", "type": "uint256" }, { "name": "ownerBurnOnly", "type": "bool" }, { "name": "index", "type": "uint16" }] },
    { "type": "variable", "name": "tokenIndex", "inputs": [{ "name": "nextIndex", "type": "uint16" }] },

    { "type": "event", "name": "mint", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }] },
    { "type": "event", "name": "issueToken", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }] },

    { "type": "event", "name": "issue", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }] },
    { "type": "event", "name": "reIssue", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }] },

    { "type": "event", "name": "burn", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }, { "name": "address", "type": "address" }, { "name": "amount", "type": "uint256" }] },
    { "type": "event", "name": "burn2", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }, { "name": "address", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "target", "type": "uint256" }, { "name": "to", "type": "bytes" }] },

    { "type": "event", "name": "transferOwner", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }, { "name": "owner", "type": "address" }] },
    { "type": "event", "name": "transferOwnership", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }, { "name": "owner", "type": "address" }] },

    { "type": "event", "name": "changeTokenType", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }] },
    { "type": "event", "name": "disableReIssue", "inputs": [{ "name": "tokenId", "type": "tokenId", "indexed": true }] }
  ],
  'vite_00000000000000000000000000000000000000079710f19dc7': [
    { "type": "function", "name": "DexTradeNewOrder", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "DexTradeCancelOrder", "inputs": [{ "name": "orderId", "type": "bytes" }] },
    { "type": "function", "name": "DexTradeNotifyNewMarket", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "DexTradeCleanExpireOrders", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "DexTradeCancelOrderByHash", "inputs": [{ "name": "sendHash", "type": "bytes32" }] },

    { "type": "function", "name": "PlaceOrder", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "CancelOrder", "inputs": [{ "name": "orderId", "type": "bytes" }] },
    { "type": "function", "name": "SyncNewMarket", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "ClearExpiredOrders", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "CancelOrderByTransactionHash", "inputs": [{ "name": "sendHash", "type": "bytes32" }] },
    { "type": "function", "name": "InnerCancelOrderBySendHash", "inputs": [{ "name": "sendHash", "type": "bytes32" }, { "name": "owner", "type": "address" }] }
  ],
  'vite_0000000000000000000000000000000000000006e82b8ba657': [
    { "type": "function", "name": "DexFundUserDeposit", "inputs": [] },
    { "type": "function", "name": "DexFundUserWithdraw", "inputs": [{ "name": "token", "type": "tokenId" }, { "name": "amount", "type": "uint256" }] },
    { "type": "function", "name": "DexFundNewMarket", "inputs": [{ "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }] },
    { "type": "function", "name": "DexFundNewOrder", "inputs": [{ "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "side", "type": "bool" }, { "name": "orderType", "type": "uint8" }, { "name": "price", "type": "string" }, { "name": "quantity", "type": "uint256" }] },
    { "type": "function", "name": "DexFundSettleOrders", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "DexFundPeriodJob", "inputs": [{ "name": "periodId", "type": "uint64" }, { "name": "bizType", "type": "uint8" }] },
    { "type": "function", "name": "DexFundPledgeForVx", "inputs": [{ "name": "actionType", "type": "uint8" }, { "name": "amount", "type": "uint256" }] },
    { "type": "function", "name": "DexFundPledgeForVip", "inputs": [{ "name": "actionType", "type": "uint8" }] },
    { "type": "function", "name": "AgentPledgeCallback", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }, { "name": "success", "type": "bool" }] },
    { "type": "function", "name": "AgentCancelPledgeCallback", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }, { "name": "success", "type": "bool" }] },
    { "type": "function", "name": "GetTokenInfoCallback", "inputs": [{ "name": "tokenId", "type": "tokenId" }, { "name": "bid", "type": "uint8" }, { "name": "exist", "type": "bool" }, { "name": "decimals", "type": "uint8" }, { "name": "tokenSymbol", "type": "string" }, { "name": "index", "type": "uint16" }, { "name": "owner", "type": "address" }] },
    { "type": "function", "name": "DexFundOwnerConfig", "inputs": [{ "name": "operationCode", "type": "uint8" }, { "name": "owner", "type": "address" }, { "name": "timeOracle", "type": "address" }, { "name": "periodJobTrigger", "type": "address" }, { "name": "stopDex", "type": "bool" }, { "name": "makerMiningAdmin", "type": "address" }, { "name": "maintainer", "type": "address" }] },
    { "type": "function", "name": "DexFundOwnerConfigTrade", "inputs": [{ "name": "operationCode", "type": "uint8" }, { "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "allowMining", "type": "bool" }, { "name": "newQuoteToken", "type": "tokenId" }, { "name": "quoteTokenType", "type": "uint8" }, { "name": "tokenTypeForTradeThreshold", "type": "uint8" }, { "name": "minTradeThreshold", "type": "uint256" }, { "name": "tokenTypeForMiningThreshold", "type": "uint8" }, { "name": "minMiningThreshold", "type": "uint256" }] },
    { "type": "function", "name": "DexFundMarketOwnerConfig", "inputs": [{ "name": "operationCode", "type": "uint8" }, { "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "marketOwner", "type": "address" }, { "name": "takerFeeRate", "type": "int32" }, { "name": "makerFeeRate", "type": "int32" }, { "name": "stopMarket", "type": "bool" }] },
    { "type": "function", "name": "DexFundTransferTokenOwner", "inputs": [{ "name": "token", "type": "tokenId" }, { "name": "newOwner", "type": "address" }] },
    { "type": "function", "name": "NotifyTime", "inputs": [{ "name": "timestamp", "type": "int64" }] },
    { "type": "function", "name": "DexFundNewInviter", "inputs": [] },
    { "type": "function", "name": "DexFundBindInviteCode", "inputs": [{ "name": "code", "type": "uint32" }] },
    { "type": "function", "name": "DexFundEndorseVx", "inputs": [] },
    { "type": "function", "name": "DexFundSettleMakerMinedVx", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "DexFundPledgeForSuperVip", "inputs": [{ "name": "actionType", "type": "uint8" }] },
    { "type": "function", "name": "DexFundConfigMarketsAgent", "inputs": [{ "name": "actionType", "type": "uint8" }, { "name": "agent", "type": "address" }, { "name": "tradeTokens", "type": "tokenId[]" }, { "name": "quoteTokens", "type": "tokenId[]" }] },
    { "type": "function", "name": "DexFundNewAgentOrder", "inputs": [{ "name": "principal", "type": "address" }, { "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "side", "type": "bool" }, { "name": "orderType", "type": "uint8" }, { "name": "price", "type": "string" }, { "name": "quantity", "type": "uint256" }] },
    { "type": "function", "name": "Deposit", "inputs": [] },
    { "type": "function", "name": "Withdraw", "inputs": [{ "name": "token", "type": "tokenId" }, { "name": "amount", "type": "uint256" }] },
    { "type": "function", "name": "OpenNewMarket", "inputs": [{ "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }] },
    { "type": "function", "name": "PlaceOrder", "inputs": [{ "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "side", "type": "bool" }, { "name": "orderType", "type": "uint8" }, { "name": "price", "type": "string" }, { "name": "quantity", "type": "uint256" }] },
    { "type": "function", "name": "SettleOrders", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "TriggerPeriodJob", "inputs": [{ "name": "periodId", "type": "uint64" }, { "name": "bizType", "type": "uint8" }] },
    { "type": "function", "name": "StakeForMining", "inputs": [{ "name": "actionType", "type": "uint8" }, { "name": "amount", "type": "uint256" }] },
    { "type": "function", "name": "StakeForVIP", "inputs": [{ "name": "actionType", "type": "uint8" }] },
    { "type": "function", "name": "DelegateStakeCallback", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }, { "name": "success", "type": "bool" }] },
    { "type": "function", "name": "CancelDelegateStakeCallback", "inputs": [{ "name": "stakeAddress", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "bid", "type": "uint8" }, { "name": "success", "type": "bool" }] },
    { "type": "function", "name": "DexAdminConfig", "inputs": [{ "name": "operationCode", "type": "uint8" }, { "name": "owner", "type": "address" }, { "name": "timeOracle", "type": "address" }, { "name": "periodJobTrigger", "type": "address" }, { "name": "stopDex", "type": "bool" }, { "name": "makerMiningAdmin", "type": "address" }, { "name": "maintainer", "type": "address" }] },
    { "type": "function", "name": "TradeAdminConfig", "inputs": [{ "name": "operationCode", "type": "uint8" }, { "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "allowMining", "type": "bool" }, { "name": "newQuoteToken", "type": "tokenId" }, { "name": "quoteTokenType", "type": "uint8" }, { "name": "tokenTypeForTradeThreshold", "type": "uint8" }, { "name": "minTradeThreshold", "type": "uint256" }, { "name": "tokenTypeForMiningThreshold", "type": "uint8" }, { "name": "minMiningThreshold", "type": "uint256" }] },
    { "type": "function", "name": "MarketAdminConfig", "inputs": [{ "name": "operationCode", "type": "uint8" }, { "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "marketOwner", "type": "address" }, { "name": "takerFeeRate", "type": "int32" }, { "name": "makerFeeRate", "type": "int32" }, { "name": "stopMarket", "type": "bool" }] },
    { "type": "function", "name": "TransferTokenOwnership", "inputs": [{ "name": "token", "type": "tokenId" }, { "name": "newOwner", "type": "address" }] },
    { "type": "function", "name": "CreateNewInviter", "inputs": [] },
    { "type": "function", "name": "BindInviteCode", "inputs": [{ "name": "code", "type": "uint32" }] },
    { "type": "function", "name": "EndorseVx", "inputs": [] },
    { "type": "function", "name": "SettleMakerMinedVx", "inputs": [{ "name": "data", "type": "bytes" }] },
    { "type": "function", "name": "StakeForSVIP", "inputs": [{ "name": "actionType", "type": "uint8" }] },
    { "type": "function", "name": "ConfigMarketAgents", "inputs": [{ "name": "actionType", "type": "uint8" }, { "name": "agent", "type": "address" }, { "name": "tradeTokens", "type": "tokenId[]" }, { "name": "quoteTokens", "type": "tokenId[]" }] },
    { "type": "function", "name": "PlaceAgentOrder", "inputs": [{ "name": "principal", "type": "address" }, { "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "side", "type": "bool" }, { "name": "orderType", "type": "uint8" }, { "name": "price", "type": "string" }, { "name": "quantity", "type": "uint256" }] },
    { "type": "function", "name": "LockVxForDividend", "inputs": [{ "name": "actionType", "type": "uint8" }, { "name": "amount", "type": "uint256" }] },
    { "type": "function", "name": "SwitchConfig", "inputs": [{ "name": "switchType", "type": "uint8" }, { "name": "enable", "type": "bool" }] },
    { "type": "function", "name": "StakeForPrincipalSVIP", "inputs": [{ "name": "principal", "type": "address" }] },
    { "type": "function", "name": "CancelStakeById", "inputs": [{ "name": "id", "type": "bytes32" }] },
    { "type": "function", "name": "StakeForQuotaWithCallbackCallback", "inputs": [{ "name": "id", "type": "bytes32" }, { "name": "success", "type": "bool" }] },
    { "type": "function", "name": "CancelQuotaStakingWithCallbackCallback", "inputs": [{ "name": "id", "type": "bytes32" }, { "name": "success", "type": "bool" }] },
    { "type": "function", "name": "CancelOrderBySendHash", "inputs": [{ "name": "sendHash", "type": "bytes32" }, { "name": "principal", "type": "address" }, { "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }] },
    { "type": "function", "name": "CommonAdminConfig", "inputs": [{ "name": "operationCode", "type": "uint8" }, { "name": "tradeToken", "type": "tokenId" }, { "name": "quoteToken", "type": "tokenId" }, { "name": "enable", "type": "bool" }, { "name": "value", "type": "int32" }, { "name": "amount", "type": "uint256" }, { "name": "address", "type": "address" }] }
  ],
}

