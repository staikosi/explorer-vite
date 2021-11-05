// import { isContract } from './vite';
import protobufjs from 'protobufjs';
import protoDescriptor from './proto/vx.json';
import { accountBlock, utils, wallet } from '@vite/vitejs';

export const DEX_FUND_CONTRACT =
  'vite_0000000000000000000000000000000000000006e82b8ba657';
export const DEX_TRADE_CONTRACT =
  'vite_00000000000000000000000000000000000000079710f19dc7';

export function isDexContract(addr) {
  return (
    // isContract(addr) &&
    addr === DEX_FUND_CONTRACT || addr === DEX_TRADE_CONTRACT
  );
}

const root = protobufjs.Root.fromJSON(protoDescriptor);

function mappingParsers(events) {
  const result = {};
  events.forEach(event => {
    const buf = Buffer.alloc(32);
    buf.write(event.name);
    const id = buf.toString('hex');
    let parser = undefined;
    if (event.parserType === 'string') {
      parser = stringParser;
    } else {
      parser = mappingProtoParser(event.protoName, event);
    }
    result[id] = { name: event.name, parser };
  });
  return result;
}

function stringParser(buffer) {
  return buffer.toString();
}

function mappingProtoParser(protoName, event) {
  const message = root.lookupType(protoName);

  return function fn(buffer) {
    const decoded = message.decode(buffer);
    if (event.view) {
      return {
        decoded: decoded,
        beautify: event.view(decoded)
      };
    } else {
      return { decoded };
    }
  };
}

function quoteTokenType(type) {
  switch (type) {
    case 1:
      return 'VITE';
    case 2:
      return 'ETH';
    case 3:
      return 'BTC';
    case 4:
      return 'USDT';
  }
}
function amount(amount) {
  return BigInt('0x' + Buffer.from(amount, 'base64').toString('hex')).toString(
    10
  );
}

function viewMinedVx(event) {
  return {
    Address: wallet.getAddressFromOriginalAddress(
      Buffer.from(event.Address).toString('hex')
    ),
    QuoteTokenType: quoteTokenType(event.QuoteTokenType),
    FeeAmount: amount(event.FeeAmount),
    MinedAmount: amount(event.MinedAmount)
  };
}

export const logParsers = mappingParsers([
  {
    name: 'newOrderEvent',
    protoName: 'proto.NewOrderInfo',
    view: function v(event) {
      const eventJson = JSON.parse(JSON.stringify(event));
      return {
        Order: {
          ...eventJson.Order,
          ...{
            Address: wallet.getAddressFromOriginalAddress(
              Buffer.from(event.Order.Address).toString('hex')
            ),
            SendHash: Buffer.from(event.Order.SendHash).toString('hex')
          }
        },
        TradeToken: utils.getTokenIdFromOriginalTokenId(
          Buffer.from(event.TradeToken).toString('hex')
        ),
        QuoteToken: utils.getTokenIdFromOriginalTokenId(
          Buffer.from(event.QuoteToken).toString('hex')
        )
      };
    }
  },
  {
    name: 'orderUpdateEvent',
    protoName: 'proto.OrderUpdateInfo'
  },
  {
    name: 'txEvent',
    protoName: 'proto.Transaction'
  },
  {
    name: 'tokenEvent',
    protoName: 'proto.TokenInfo'
  },
  {
    name: 'marketEvent',
    protoName: 'proto.MarketInfo'
  },
  {
    name: 'periodWithBizEvent',
    protoName: 'proto.PeriodJobForBiz'
  },
  {
    name: 'feeDividendForVxHolderEvent',
    protoName: 'proto.FeeDividendForVxHolder'
  },
  {
    name: 'brokerFeeDividendEvent',
    protoName: 'proto.OperatorFeeDividend'
  },
  {
    name: 'minedVxForTradeFeeEvent',
    protoName: 'proto.MinedVxForFee',
    view: viewMinedVx
  },
  {
    name: 'minedVxForInviteeFeeEvent',
    protoName: 'proto.MinedVxForFee',
    view: viewMinedVx
  },
  {
    name: 'minedVxForPledgeEvent',
    protoName: 'proto.MinedVxForStaking'
  },
  {
    name: 'minedVxForOperation',
    protoName: 'proto.MinedVxForOperation'
  },
  {
    name: 'inviteRelationEvent',
    protoName: 'proto.InviteRelation'
  },
  {
    name: 'settleMakerMinedVxEvent',
    protoName: 'proto.SettleMakerMinedVx'
  },
  {
    name: 'grantMarketToAgentEvent',
    protoName: 'proto.MarketAgentRelation'
  },
  {
    name: 'revokeMarketFromAgentEvent',
    protoName: 'proto.MarketAgentRelation'
  },
  {
    name: 'burnViteEventName',
    protoName: 'proto.BurnVite'
  },
  {
    name: 'transferAssetEvent',
    protoName: 'proto.TransferAsset'
  },
  {
    name: 'errEvent',
    protoName: 'proto.OrderUpdateInfo'
  },
  {
    name: 'grantMarketToAgentEvent',
    protoName: 'proto.OrderUpdateInfo',
    parserType: 'string'
  }
]);

export function decodeDexLog(log) {
  const parser = logParsers[log.topics[0]];

  if (!parser) {
    return {
      name: parser.name,
      inputs: { error: 'parser is undefined' },
      beautify: {}
    };
  } else {
    const { decoded, beautify } = parser.parser(
      Buffer.from(log.data, 'base64')
    );
    return {
      name: parser.name,
      inputs: decoded,
      beautify: beautify
    };
  }
}
