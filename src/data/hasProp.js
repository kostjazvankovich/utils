import isFunction from '../base/isFunction'
import isMap from '../base/isMap'
import isNil from '../base/isNil'
import isUndefined from '../base/isUndefined'
import curry from '../common/curry'

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * If prop is a function then it is executed against value as a selector.
 * If prop is undefined then value will be checked for truthiness.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @sig s -> {s: x} -> Boolean
 * @param {String | Function} prop The name of the property to check for.
 * @param {Object | Map} value The value to query.
 * @returns {Boolean} Whether the property exists.
 * @example
 *
 * hasProp('name', {name: 'philipp'})  //=> true
 * hasProp('name', {})                 //=> false
 *
 * hasProp(undefined, {})            //=> true
 * hasProp(undefined, null)          //=> false
 *
 * hasProp((value) => value.name, { name: 'eslam'})     //=> true
 * hasProp((value) => value.birthday, { name: 'raees'}) //=> false
 */
const hasProp = curry((prop, value) => {
  if (isUndefined(prop)) {
    return !!value
  }
  if (isFunction(prop)) {
    try {
      return !!prop(value)
    } catch (error) {
      return false
    }
  }
  if (isNil(value)) {
    return false
  }
  if (isMap(value)) {
    return value.has(prop)
  }
  return Object.prototype.hasOwnProperty.call(value, prop)
})

export default hasProp
