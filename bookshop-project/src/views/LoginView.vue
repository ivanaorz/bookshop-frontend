<template>
    <div class="login-container">
      <h1 class="login-header">Login</h1>
      <form @submit.prevent="handleSubmit">
      <UsernamePassword :afterSubmit="signIn"/>
  
      <p class="signup-link">No account? Sign up <router-link to="/register">here!</router-link></p>
  
      <button class="signin-button" @click="signIn">Sign in</button>
      </form>

      <!-- <button class="guest-user-button"><router-link to="/guest"></router-link>Proceed as guest user</router-link></button> -->
      <router-link to="/guest" class="guest-button">Proceed as guest user</router-link>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import UsernamePassword from '../components/UsernamePassword.vue';
import type { SigninAuthDetails } from '../model/authDetails';
import authService from '@/service/authService';

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
    async handleSubmit() {
      try {
        const { username, password } = this.authDetails;

        const user = await authService.signIn(username, password);

        if (user.role === 'ADMIN') {
          this.$router.push('/admin/books');
        } else if (user.role === 'USER') {
          this.$router.push('/user');
        } else {
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Sign-in failed:', error);
      }
    },
    async signIn() {
      await this.handleSubmit();
    },
  },
});
</script>

<style scoped>
.login-container {
  background-color: lightblue;
  padding: 20px;
}

.login-header {
  color: white;
  background-color: darkblue;
  padding: 10px;
  text-align: center;
}

.signup-link {
  text-align: center;
  margin-top: 10px;
}

.signin-button {
  display: block;
  margin: 20px auto;
}

.guest-button {
  display: block;
  margin: 10px auto;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
}
</style>