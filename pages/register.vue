<template>
  <div class="login-register__box">
    <p>新規登録</p>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <validation-provider v-slot="{ errors }" rules="required|max:20">
        <input type="text" v-model="name" placeholder="ユーザーネーム" name="ユーザーネーム">
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required|email">
        <input type="email" v-model="email" placeholder="メールアドレス" name="メールアドレス">
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required|min:6">
        <input type="password" v-model="password" placeholder="パスワード" name="パスワード">
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
      <button @click="register" 
        :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
    </validation-observer>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((gotData) => {
          gotData.user.updateProfile({
            displayName: this.name
          });
          gotData.user.sendEmailVerification();
        })
        .then(() => {
          this.$router.push('/login');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              alert('このメールアドレスは使用済みです。');
              break
            default:
              alert('エラーが発生しました。>>'+error.code +' : '+ error.message);
              break
          }
        })
    }
  },
  layout: 'login-register'
}
</script>


<style>

.login-register__box p {
  color: black;
  font-weight: bold;
}
.login-register__box input {
  margin: 7px 0;
  border: gray 2px solid;
  border-radius: 10px;
  width: 80%;
  padding: 5px 10px;
  color: black;
}
button {
  background: #5600D8;
  border: none;
  border-radius: 40px;
  padding: 5px 25px;
  margin: 10px 0;
  cursor: pointer;
}

</style>