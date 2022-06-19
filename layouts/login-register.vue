<template>
  <div>
    <div class="login-header">
      <NuxtLink to="/">
        <img src="/img/logo.png" class="logo">
      </NuxtLink>
      <div class="login-register__navi">
        <NuxtLink to="register">新規登録</NuxtLink>
        <NuxtLink to="login">ログイン</NuxtLink>
      </div>
    </div>
    <div class="flex-container">
      <div class="container">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.logo {
  width: 30vw;
  max-width: 220px;
  min-width: 100px;
}
.login-register__navi a{
  padding-right: 20px;
}
.flex-container {
  display: flex;
  justify-content: center;
}
.container {
  background: white;
  width: 30%;
  min-width: 250px;
  max-width: 400px;
  text-align: center;
  padding: 20px;
  border-radius: 7px;
}
</style>