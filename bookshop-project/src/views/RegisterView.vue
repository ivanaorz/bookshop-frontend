<template>
  <div class="register-container">
    <div class="register-header">
    <h1 class="register-title">Register</h1>
     </div>
    <form @submit.prevent="handleSubmit">
    <UsernamePassword :afterSubmit="registerAccount" />

    <p class="login-link">Already have an account? Sign in <router-link to="/login"> here!</router-link></p>

    <button class="register-button" @click="registerAccount">Register new account</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UsernamePassword from '../components/UsernamePassword.vue';
import type { SignupAuthDetails } from '../model/authDetails';
import authService from '../service/authService';

export default defineComponent({
name: 'RegisterView',
components: {
  UsernamePassword,
},
data() {
    return {
      authDetails: {
        username: '',
        password: '',
      } as SignupAuthDetails,
    };
  },
methods: {
  async handleSubmit() {
  try {
    const { username, password} = this.authDetails;

    const user = await authService.register(this.authDetails);

    user.role = 'USER';

    this.$router.push('/user');
  } catch (error) {
    console.error('Sign-up failed:', error);
  }
 },
 async registerAccount() {
    await this.handleSubmit();
  },
 },
});
</script>

<style scoped>
.register-container {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: lightblue;
  text-align: center;
  padding: 5px;
  width: 50%;
  border: 2px solid grey; */

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

.register-header {
  /* background-color: darkgrey;
  padding: 5px;
  display: flex;
  justify-content: center;
  width: 90%;
  height: 25%;
  border: 1px grey; */


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

.register-title {
  color: white;
  text-align: center;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px; 

  /* color: white;
  text-align: center;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px;  */
}

.login-link {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
}

.register-button {
  width: 50%;
  font-size: 20px;
  padding: 0.25em 1em;
  margin-bottom: 1em;
  display: block;
  margin: 20px auto; 
  text-align: center;
}
</style>




