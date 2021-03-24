export const reducerMethods = {
  add: (state, {payload}) => [...state, payload],
  addByPropName: propName => (state, {payload}) => ({
    ...state,
    [propName]: [...state[propName], payload]
  }),
  addById: propName => (state, {payload}) => ({
    ...state,
    [propName]: {
      ...state[propName],
      [payload.id]: payload
    }
  }),

  remove: (state, {payload}) => state.filter(name => name !== payload),
  removeByPropName: propName => (state, {payload}) => ({
    ...state,
    [propName]: state[propName].filter(value => value !== payload)
  }),

  replace: propName => (state, {payload}) => ({
    ...state,
    [propName]: payload
  }),

  identity: (state, {payload}) => payload,
  identityByPropName: propName => (state, {payload}) => ({
    ...state,
    [propName]: payload
  }),

  mergeObjectByPropName: propName => (state, {payload}) => ({
    ...state,
    [propName]: {
      ...state[propName],
      ...payload
    }
  }),
  update: (state, {payload}) => ({...state, ...payload})
}
