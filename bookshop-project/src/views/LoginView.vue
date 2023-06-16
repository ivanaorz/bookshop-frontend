/** This is login page where registered users can log in and those users who are not registered 
     can proceed as guest users. */
<template>
    <div class="login-container">
      <div class="login-header">
      <h1 class="login-title">Login</h1>
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
import type { SigninAuthDetails } from '../model/authDetails';
import authService from '../service/authService';

export default defineComponent({
  name: 'LoginView',
  components: {
    UsernamePassword,
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
  height: 50vh;
  background-color: lightblue;
  text-align: center;
  padding: 20px;
  width: 50%;
  border: 2px solid grey;
}

.login-header {
  color: white;
  background-color: darkgrey;
  padding: 5px;
  display: flex;
  justify-content: center;
  width: 90%;
  text-align: center;
  margin-top: 3px;
  margin-bottom: 10px;
  height: 50vh;
  border: 1px grey;
}

.login-title {
  color: white;
  text-align: center;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px; 
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
}

.guest-button {
  width: 50%;
  font-size: 20px;
  padding: 0.25em 1em;
  margin-bottom: 1em;
  display: block;
  margin: 20px auto; 
  text-align: center;
}
</style>