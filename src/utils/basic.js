export function mergeArr(arr1, arr2, keyFn) {
  let seen = {};
  const result = arr1.concat(arr2).filter((item, pos) => {
    // distinct
    const k = keyFn(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
  return result;
}
