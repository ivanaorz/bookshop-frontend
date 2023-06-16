/** This componen combines sign out button and information about the role of the user who is browsing. */
<template>
    <div class="sign-out-and-user-info">
        <p>Browsing as user {{ role }}</p>
        <button class="sign-out-button" @click="signOut">Sign Out</button>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { UserDetails } from '../model/userDetails';
import authService from '../service/authService';


export default defineComponent({
  name: 'SignOut',
  data() {
    return {
      role: '',
    };
  },
  methods: {
    async signOut() {
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
.sign-out-button {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>