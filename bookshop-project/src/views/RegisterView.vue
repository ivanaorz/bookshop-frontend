/** This is the register page where users can register an account. */
<template>
  <div class="register-container"> 
    <div class="register-header">
    <FormHeaderContainer header="Register"/>
  </div>
    <!-- <form @submit.prevent="handleSubmit"> -->
    <UsernamePassword :afterSubmit="registerAccount" />

        <p>{{ message }}</p>

    <p class="login-link">Already have an account? Sign in <router-link to="/login"> here!</router-link></p>

    <button class="register-button" @click="registerAccount">Register new account</button>
    <!-- </form> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormHeaderContainer from '../components/FormHeaderContainer.vue';
import UsernamePassword from '../components/UsernamePassword.vue';
import type { SignupAuthDetails } from '../model/authDetails';
import authService from '../service/authService';

export default defineComponent({
name: 'RegisterView',
components: {
  UsernamePassword,
  FormHeaderContainer,
},
data() {
    return {
      authDetails: {
        username: '',
        password: '',
      } as SignupAuthDetails,
      message: "",
    };
  },

methods: {
    async registerAccount() {
      try {
        this.message = await authService.register(this.authDetails);
        if (this.message !== 'The account already exists') {
          await this.handleSignIn();
          this.$router.push('/library/books');
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
    async handleSignIn() {
      try {
        await authService.login(this.authDetails);
      } catch (error) {
        console.error('Sign-in failed:', error);
      }
    },
  },
 
});
</script>

<style scoped>
.register-container {
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
 .register-header{
  justify-content: center;
  align-content: center;
  display: flex;
  margin-top: 15px;
   margin-bottom: 15px; 
 }


.login-link {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 25px;
  font-size: 20px;
}

.register-button {
  width: 50%;
  font-size: 20px;
  padding: 0.25em 1em;
  margin-bottom: 3px;
  display: block;
  text-align: center;
  border-radius: 0.3rem;
}
</style>




