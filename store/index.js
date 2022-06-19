import firebase from '~/plugins/firebase'

export const state = () => ({
  loginState: 'ログインしてください',
  uid: null,
  name: null,
  isEmail: false,
});

export const mutations = {
  setLoginState(state, status) {
    state.loginState = status;
  },
  setUid(state, uid) {
    state.uid = uid;
  },
  setName(state, name) {
    state.name = name;
  },
  setIsEmail(state, isE) {
    state.isEmail = isE;
  }
};

export const actions = {
  loginCheck({ commit }) {
    firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          commit('setLoginState', 'ログイン済み');
          commit('setUid', user.uid);
          commit('setName', user.displayName);
          commit('setIsEmail', user.emailVerified)
        } else {
          alert('ログアウト済み：ログインしてください');
          this.$router.replace('/login');
        }
      })
  }
  
  
};