<template>
  <div class="login-register__box">
    <p>ログイン</p>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <validation-provider v-slot="{ errors }" rules="required|email">
        <input type="email" v-model="email" placeholder="メールアドレス" name="メールアドレス">
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required|min:6">
        <input type="password" v-model="password" placeholder="パスワード" name="パスワード">
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
      <button @click="login" 
        :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
    </validation-observer>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインに成功しました。');
          this.$router.push('/');
          })
        .catch((error) => {
          switch (error.code) {
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っています。')
              break
            default:
              alert('エラーが発生しました。>>'+error.code +' : '+ error.message)
              break
          }
        })
    }
  },
  layout: 'login-register'
}
</script>

