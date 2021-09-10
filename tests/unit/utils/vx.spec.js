import { assert } from 'chai';
import { isDexContract } from '@/utils/vx';

describe('Vx', () => {
  describe('#isDexContract()', () => {
    it('should return addr ', () => {
      assert.isFalse(isDexContract('xxxx'));
    });
  });
});
