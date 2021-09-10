import { IS_DEV } from './consts';

function noop() {}

const tag = '[viewer]';

export const log = IS_DEV
  ? (...args) => {
      console.log(tag, ...args);
    }
  : noop;

export const error = IS_DEV
  ? (...args) => {
      console.error(tag, ...args);
    }
  : noop;
