/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/

/**
 * Checks if `value` is a valid array-like index.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
const isIndex = (value, length) => {
  const type = typeof value
  length = length == null ? MAX_SAFE_INTEGER : length

  return (
    !!length &&
    (type == 'number' || (type != 'symbol' && reIsUint.test(value))) &&
    (value > -1 && value % 1 == 0 && value < length)
  )
}

export default isIndex