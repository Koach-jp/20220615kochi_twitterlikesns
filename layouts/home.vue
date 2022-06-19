<template>
  <div>
    <div class="leftside-bar">
      <NuxtLink to="/">
        <img src="img/logo.png" class="logo">
      </NuxtLink>
      <div class="links">
        <div class="icon-wrap">
          <NuxtLink to="/">
            <img src="img/home.png" class="icon">
            <span>ホーム</span>
          </NuxtLink>
        </div>
        <div class="logout icon-wrap" @click="logout">
          <img src="img/logout.png" class="icon">
          ログアウト
        </div>
      </div>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <p><label for="share">シェア</label></p>
        <validation-provider v-slot="{ errors }" rules="required|max:120">
          <textarea v-model="share" name="シェア" id="share" rows="4"></textarea>
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <button type="button" class="share-button" @click="sendShare"
          :disabled="ObserverProps.invalid || !ObserverProps.validated">
          シェアする
        </button>
      </validation-observer>
      <p class="status">ログインステータス：{{ loginState }}</p>
      <p class="status">ユーザーネーム：{{ name }}</p>
      <p class="status">
        メールアドレス：{{ isEmail ? '認証済み':'未認証' }}
      </p>
      <div class="bottom">
        <NuxtLink to="register">新規登録</NuxtLink>
        <NuxtLink to="login">ログイン</NuxtLink>
      </div>
    </div>
    <div class="content">
    <Nuxt />
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      loginState: 'ログインしてください',
      name: null,
      isEmail: false,
      uid: null,
      share: null,
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
    loginCheck() {
      firebase.auth()
        .onAuthStateChanged((user) => {
          if (user) {
            this.loginState = 'ログイン済み';
            this.name = user.displayName;
            this.isEmail = user.emailVerified;
            this.uid = user.uid;
          } else {
            alert('ログアウト済み：ログインしてください');
            this.$router.replace('/login');
          }
        })
    },
    async sendShare() {
      const sendData = {
        uid: this.uid,
        name: this.name,
        content: this.share
      };
      await this.$axios.post('http://127.0.0.1:8000/api/share/', sendData);
      this.share = null;
      if (this.$route.path==='/') {
        location.reload();
      } else {
        this.$router.push('/');
      }
    }
  },
  created() {
    this.loginCheck();
  }
}
</script>


<style>
body {
  background: #16202B;
}
body * {
  font-size: 18px;
  line-height: 2.0;
  color: white;
  text-decoration: none;
}
textarea {
  display: block;
  width: 95%;
  border: white 1px solid;
  border-radius: 10px;
  resize: none;
  background: #1e2c3b;
  margin: 5px 0;
}
.error {
  color: #00d82f;
  font-size: 14px;
}
:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
html {
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* IE用はもう要らない説：IEは2022/6/15で終了らしい */
}
html::-webkit-scrollbar {
  display: none;
}
</style>


<style scoped>
.content {
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  box-sizing: border-box;
}
.leftside-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 30%;
  height: 90vh;
  padding: 15px;
  box-sizing: border-box;
}
.logo {
  width: 120px;
}
.icon {
  width: 35px;
  vertical-align: middle;
}
.icon-wrap {
  margin: 20px 0 30px;
}
.logout {
  cursor: pointer;
}
.links {
  margin-bottom: 20px;
}
.links p span{
  padding: 20px;
}
.share-button {
  display: block;
  margin: 20px 10px 20px auto;
}
.status {
  font-size: 14px;
}
.bottom {
  position: fixed;
  bottom: 0;
}
.bottom * {
  font-size: 14px;
  padding-right: 15px;
}
</style>