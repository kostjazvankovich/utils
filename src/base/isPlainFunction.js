import baseGetTag from './baseGetTag'
import isObject from './isObject'

const isPlainFunction = (value) => {
  if (!isObject(value)) {
    return false
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  const tag = baseGetTag(value)
  return tag == '[object Function]' || tag == '[object Proxy]'
}

export default isPlainFunction
