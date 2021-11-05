import { assert } from 'chai';
import { isDexContract, decodeDexLog } from '@/utils/vx';
// import protobufjs from 'protobufjs';

describe('Vx', () => {
  describe('#isDexContract()', () => {
    it('should return addr ', () => {
      assert.isFalse(isDexContract('xxxx'));
    });
  });

  describe('#decodeDexLog()', () => {
    it('should parse protobufjs', () => {
      const vmlog = {
        topics: [
          '6e65774f726465724576656e7400000000000000000000000000000000000000'
        ],
        data:
          'Cn4KFgAABgEAAAAAABJHj4eAAGE+6k8AAAQSFdCxRv0kpzBJLrFpl+UQRrnUL03vABgGIAEyCgAAAAAAEkePh4BIMlAyWgmioV0JUZvgAABiBA4J5xCwAc/U+4kGwgEg/kp/doC60pY+R1qs9xcLwUVafQHduFcCwuAIrxVDUqISClZJVEUgVE9LRU4aCoDzdRSF5Og0VgU'
      };
      const decoded = decodeDexLog(vmlog);

      assert.equal(
        'AAAGAQAAAAAAEkePh4AAYT7qTwAABA==',
        decoded.inputs.Order.Id.toString('base64')
      );
    });
    it('should parse amount', () => {
      const decoded = Buffer.from('Son1TvASHAAA', 'base64');
      // console.log(BigInt('0x' + decoded.toString('hex')).toString(10));
      assert.equal(
        '1375000000000000000000',
        BigInt('0x' + decoded.toString('hex')).toString(10)
      );
    });
  });
});
