export function mergeArr(arr1, arr2, keyFn) {
  if (!arr2) return arr1;
  if (!arr1) return arr2;
  if (!arr1 && !arr2) return undefined;
  let seen = {};
  const result = arr1.concat(arr2).filter((item, pos) => {
    // distinct
    const k = keyFn(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
  return result;
}
