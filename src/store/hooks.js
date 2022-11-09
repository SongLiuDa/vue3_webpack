import { computed } from 'vue'
import { useStore, createNamespacedHelpers, mapGetters, mapState } from 'vuex'

/**
 * @description: 组合mapState和mapGetters
 * @param {Array} data state,getter数组
 * @param {Function} mapFn 命名空间fn
 */
function useMapper(data, mapFn) {
  const store = useStore()
  const fns = mapFn(data)
  const storeGetters = {}
  Object.keys(fns).forEach(fnkey => {
    const fn = fns[fnkey].bind({ $store: store })
    storeGetters[fnkey] = computed(fn)
  })
  return storeGetters
}
/**
 * @description: useGetters
 * @param {String} v store模块名 || Getters字段数组
 * @param {Array} getters Getters字段数组
 * @return {Object} Getters参数对象
 */
export function useGetters (v, getters) {
  let mapFn = mapGetters
  if (typeof v === 'string' && v) {
    mapFn = createNamespacedHelpers(v).mapGetters
    return useMapper(getters, mapFn)
  }
  return useMapper(v, mapFn)
}

/**
 * @description: useState
 * @param {String} v store模块名 || State字段数组
 * @param {Array} states State字段数组
 * @return {Object} State参数对象
 */
export function useState (v, states) {
  let mapFn = mapState
  if (typeof v === 'string' && v) {
    mapFn = createNamespacedHelpers(v).mapState
    return useMapper(states, mapFn)
  }
  return useMapper(v, mapFn)
}
