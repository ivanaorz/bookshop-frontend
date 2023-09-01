/** This componen combines sign out button and information about the role of the user who is browsing. */
<template>
    <div class="sign-out-and-user-info">
        <p>Browsing as {{ role }} {{ username }}</p>
        <button class="sign-out-button" @click="signOutButton">Sign out</button>
        </div>
</template>

<script lang="ts">
 import { defineComponent } from 'vue';
import type { UserDetails } from '../model/userDetails';
import authService from '../service/authService';
import type { Router } from 'vue-router';


export default defineComponent({
  name: 'SignOut',
  props: {
    role: String,
    username: String,
  },
  
  methods: {
    async signOutButton() {
      try {
        await authService.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  },
});
</script>

<style scoped>
.sign-out-and-user-info {
  background-color: grey;
  color: white;
   padding-left: 10px; 
  margin-left: 800px;
  margin-right: 0px;
  display: flex;
  align-content: center;
  border-radius: 0.3rem;
  text-align: center;
}
.sign-out-button {
  width: 30%;
  font-size: 15px;
  padding: 0.25em 1em;
  margin-bottom: 1em;
  margin-left: 5px;
  display: flex;
  margin: 10px auto; 
  text-align: center;
  border-radius: 0.3rem;
}
</style>