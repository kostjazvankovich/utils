import allWith from './allWith'
import dispatchable from './dispatchable'
import nArySpread from './nArySpread'

/**
 * Defines a function that will invoke the named function if it exists on the last arg. If the method does not, all args are passed through to the default function.
 *
 * @function
 * @since v0.0.3
 * @category common
 * @sig defn(
 *   name: string,
 *   fn: (*) => any
 * ): (...args: any[], last: any) => last[name] ? last[name](...args) : defaultFn(...args)
 * @param {string} name The name of the method to call if it exists
 * @param {Function} fn The default function to execute if the named one does not exist on the last arg
 * @returns {Function} The wrapped function
 * @example
 *
 * const get = defn('get', (prop, value) => value[prop])
 * get('a', { a: 'foo' }) //=> 'foo'
 *
 * const obj = {
 *   props: {
 *     a: 'bar'
 *   }
 *   get: (prop) => obj.props[prop]
 * }
 * get('a', obj) //=> 'bar'
 */
const defn = (name, fn) => {
  const arity = fn.length
  const dispatcher = dispatchable(name, fn)
  const override = function(...args) {
    return allWith((resolvedArgs) => dispatcher.apply(this, resolvedArgs), args)
  }
  return nArySpread(arity, override)
}

export default defn
