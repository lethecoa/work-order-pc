export default {
  namespace: 'loginModel',
  state: {
    loginLoading: false,
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
  effects: {},
  subscriptions: {},
};
