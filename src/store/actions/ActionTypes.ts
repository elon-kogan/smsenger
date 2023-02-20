const getDefaultApiTypes = <T extends string>(baseType: T) => ({
  PENDING: `${baseType}/pending` as `${T}/pending`,
  FULFILLED: `${baseType}/fulfilled` as `${T}/fulfilled`,
  REJECTED: `${baseType}/rejected` as `${T}/rejected`,
})

const MESSAGES = {
  CREATE: getDefaultApiTypes(`messages/create`),
  GET_LIST: getDefaultApiTypes(`messages/getList`),
}

export { MESSAGES }
