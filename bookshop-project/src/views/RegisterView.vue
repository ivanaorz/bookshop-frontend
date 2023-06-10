<template>
  <div class="register-container">
    <h1 class="register-header">Register</h1>
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
import authService from '@/service/authService';

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

    const user = await authService.registerAccount(username, password);

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
background-color: lightblue;
padding: 20px;
}

.register-header {
color: white;
background-color: darkblue;
padding: 10px;
text-align: center;
}

.login-link {
text-align: center;
margin-top: 10px;
}

.register-button {
display: block;
margin: 20px auto;
}
</style>




