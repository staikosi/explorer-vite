import { isContract } from './vite';

export const DEX_FUND_CONTRACT =
  'vite_0000000000000000000000000000000000000006e82b8ba657';
export const DEX_TRADE_CONTRACT =
  'vite_00000000000000000000000000000000000000079710f19dc7';

export function isDexContract(addr) {
  return (
    isContract(addr) &&
    (addr === DEX_FUND_CONTRACT || addr === DEX_TRADE_CONTRACT)
  );
}
