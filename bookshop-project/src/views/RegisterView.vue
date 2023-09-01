 <!-- This is the register page where users can register an account.  -->
<template>
  <div class="register-container"> 
    <div class="register-header">
    <FormHeaderContainer header="Register"/>
  </div>
  
        <div>
            <label class="username-label">Username</label>
            <input class="username-placeholder" placeholder="Type your username..." v-model="authDetails.username" type="text"/>
        </div>
        <div>
            <label class="password-label">Password</label>
            <input class="password-placeholder" placeholder="Enter a password..." v-model="authDetails.password" type="password"/>
        </div>

        <p class="message">{{ message }}</p>

    <p class="login-link">Already have an account? Sign in <router-link to="/login"> here!</router-link></p>

    <button class="register-button" @click="registerAccount">Register new account</button>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormHeaderContainer from '../components/FormHeaderContainer.vue';
import type { SignupAuthDetails } from '../model/authDetails';
import authService from '../service/authService';

export default defineComponent({
name: 'RegisterView',
components: {
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
      if (this.authDetails.username.trim() === '' || this.authDetails.password.trim() === '') {
        this.message = "Username and password are required"; 
      } else {
        const registrationResult = await authService.register(this.authDetails);
        
        if (registrationResult === 'The account already exists') {
          this.message = 'Account already exists with this username';
        } else {
           this.message = 'You have successfully registered an account!';
        }
      }
    } catch (error) {
      console.error("An error occurred during registration");
      this.message = "An error occurred during registration";
    }
  }
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

