/** This is login page where registered users can log in and those users who are not registered 
     can proceed as guest users. */
<template>
    <div class="login-container"> 
    <div class="login-header">
    <FormHeaderContainer header="Login"/>
  </div>
      <!-- <form @submit.prevent="handleSubmit"> -->
      <UsernamePassword :afterSubmit="signIn"/>
  
      <p class="signup-link">No account? Sign up <router-link to="/register">here!</router-link></p>
  
      <button class="signin-button" @click="signIn">Sign in</button>
      <button class="guest-button" @click="proceedAsGuest">Proceed as guest user</button>
      <!-- </form> -->

    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import UsernamePassword from '../components/UsernamePassword.vue';
import FormHeaderContainer from '../components/FormHeaderContainer.vue';
import type { SigninAuthDetails } from '../model/authDetails';
import authService from '../service/authService';

export default defineComponent({
  name: 'LoginView',
  components: {
    UsernamePassword,
    FormHeaderContainer,
  },
  data() {
    return {
      authDetails: {
        username: '',
        password: '',
      } as SigninAuthDetails,
      
    };
  },
  
  methods: {
    async signIn() {
      try {
        await this.handleSignIn();
      } catch (error) {
        console.error('Sign-in failed:', error);
      }
    },
    async handleSignIn() {
      try {
        const user = await authService.login(this.authDetails);
        if (user.role === 'ADMIN') {
          this.$router.push('/admin/books');
        } else {
          this.$router.push('/library/books');
        }
      } catch (error) {
        console.error('Sign-in failed:', error);
      }
    },
    async proceedAsGuest() {
      this.$router.push('/guest');
    },
  },
  
});
</script> 

<style scoped>
.login-container {
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  height: 55vh; 
  background-color: lightblue;
  width: 50%; 
  border: 2px solid grey; 
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
 } 
 .login-header{
  justify-content: center;
  align-content: center;
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
 }

.signup-link {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
}

.signin-button {
  width: 50%;
  font-size: 20px;
  padding: 0.25em 1em;
  margin-bottom: 1em;
  display: block;
  margin: 20px auto; 
  text-align: center;
  border-radius: 0.3rem;
}

.guest-button {
  width: 50%;
  font-size: 20px;
  padding: 0.25em 1em;
  margin-bottom: 10px;
  display: block;
  text-align: center;
  border-radius: 0.3rem;
}
</style>