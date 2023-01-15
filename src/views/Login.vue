
import BaseButton from '../components/Button/BaseButton.vue';

<template>
<div class="container-fluid justify-content-center">
  <div class="login-content card p-5">
    <div class="text-center">
      <h1 class="fwbold login-title">LOGIN</h1>
      <span>Unit Manajemen Disposisi UNTAD</span>
    </div>
    <div class="mt-5">
      <div class="form-group">
        <label for="" class="form-label">Email</label>
        <input v-model="payload.username" type="text" class="form-control l-input" placeholder="Masukan username...">
      </div>
      <div class="form-group">
        <label for="" class="form-label">Password</label>
        <input v-model="payload.password" type="password" class="form-control l-input" placeholder="Masukan password...">
      </div>
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox">
          <span class="form-check-sign text-muted">Show password</span>
        </label>
      </div>
      <div class="d-flex justify-content-center px-2 mt-5">
        <BaseButton @event-click="getScope" class="col-lg-12 btn-primary rounded">LOGIN</BaseButton>
      </div>
    </div>
  </div>
</div>
</template>
<style>
  .login-content{
    width: 34%;
    height: 80%;
    margin: auto;
    top: 35px;
    font-family: 'Poppins', sans-serif;
  }
  .fwbold{
    font-weight: 600;
  }
  .login-title{
    font-size: 18pt;
  }
  .l-input{
    border-width: 0.15rem;
  }
</style>
<script setup>
import { useRouter } from "vue-router"
import { reactive } from "vue"
import Auth from '../utils/Auth'
import CryptoJS from 'crypto-js'
import jwt_decode from "jwt-decode"
import BaseButton from '../components/Button/BaseButton.vue';

const grantSecret = import.meta.env.VITE_GRANT_SECRET
const grantId = import.meta.env.VITE_GRANT_ID
const grantType = import.meta.env.VITE_GRANT_TYPE
const tokenSecret = import.meta.env.VITE_TOKEN_SECRET

const router = useRouter()

const payload = reactive({
  grant_type: grantType,
  client_id: grantId,
  client_secret: grantSecret,
  username: '',
  password: '',
  scope: ''
})

const getScope = () => {
  Auth.getScope(payload.username)
  .then((res) => {
    let item = res.data
    payload.scope = item.data

    let roleEncrypt = CryptoJS.AES.encrypt(
      item.data,
      tokenSecret
    ).toString()
    localStorage.setItem('scope', roleEncrypt)

    loginProcess()
  })
  .catch((err) => {
    console.log(err)
  })
}

const loginProcess = () => {
  Auth.getToken(payload)
  .then((res) => {
    let item = res.data
    localStorage.setItem('user', item.access_token)
    router.replace('/')
  })
  .catch((err) => {
    console.log(err)
  })
}

const clearInput = () => {
  payload.username = ''
  payload.password = ''
  payload.scope = ''
}

</script>