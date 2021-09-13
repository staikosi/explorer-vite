import { assert } from 'chai';
import { abi } from '@vite/vitejs';

describe('Vite', () => {
  describe('#decodeLog()', () => {
    it('should decode success', () => {
      const log = {
        topics: [
          '0d21bc90666d2ba979f104f8fbd1ee0331d8e11da2893ffedbd375557e2d453d',
          '000000000000000000000000000000000000000000005649544520544f4b454e'
        ],
        data: null
      };

      const abiObj = [
        {
          type: 'event',
          name: 'issueToken',
          inputs: [{ name: 'tokenId', type: 'tokenId', indexed: true }]
        }
      ];
      // console.log(JSON.stringify(abiObj));

      const result = abi.decodeLog(
        abiObj,
        '',
        log.topics.slice(1, log.topics.length),
        'issueToken'
      );

      // console.log(JSON.stringify(result));
      assert.equal(result.tokenId, 'tti_5649544520544f4b454e6e40');
    });
  });
});
