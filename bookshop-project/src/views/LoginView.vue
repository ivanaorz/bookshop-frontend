 <!-- This is the login page where registered users can log in. Users who are not registered 
     can proceed as guest users.  -->
<template>
    <div class="login-container"> 
    <div class="login-header">
    <FormHeaderContainer header="Login"/>
  </div>
     
      <div>
            <label class="username-label">Username</label>
            <input class="username-placeholder" placeholder="Type your username..." v-model="authDetails.username" type="text"/>
        </div>
        <div>
            <label class="password-label">Password</label>
            <input class="password-placeholder" placeholder="Enter a password..." v-model="authDetails.password" type="password"/>
        </div>
  
      <p class="signup-link">No account? Sign up <router-link to="/register">here!</router-link></p>
  
      <button class="signin-button" @click="signIn">Sign in</button>
      <button class="guest-button" @click="proceedAsGuest">Proceed as guest user</button>
      

    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormHeaderContainer from '../components/FormHeaderContainer.vue';
import type { SigninAuthDetails } from '../model/authDetails';
import authService from '../service/authService';
import jwtService from '../service/jwtService';
import userService from '../service/userService';

export default defineComponent({
  name: 'LoginView',
  components: {
    FormHeaderContainer,
  },
  data() {
    return {
      authDetails: {
        username: '',
        password: '',
        role: '',
      } as SigninAuthDetails,
     jwtProperty: jwtService.getJwt()
    };
  },

  // This block is watching for roles to be changed. When they are changed users
  // are redirected to the respective pages. 
  watch: {
    authDetails() {
      if (this.authDetails.role === 'ADMIN') {
          this.$router.push('/admin/books');
        } else if (this.authDetails.role === 'USER') {
          this.$router.push('/user');
        }
    }
  },
  methods: {
     signIn() {
      try {
        this.handleSignIn();
      } catch (error) {
        console.error('Sign-in failed:', error);
      }
    },

    // By signing in three actions take place:
    // -getting the token, -logging in and -getting user profile.
    async handleSignIn() {
    const jwtKey = jwtService.getJwt().accessToken; 
      try {
        const user = await authService.login(this.authDetails);
         this.authDetails = await userService.getUserProfile();
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

