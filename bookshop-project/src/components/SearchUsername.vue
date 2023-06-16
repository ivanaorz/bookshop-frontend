/** This component has the purpose to search users. It is imported in AdminView. */
<template>
    <div class="search-username">
      <input
        class="search-input"
        type="text"
        v-model="query"
        placeholder="Search username..."
        @keyup.enter="searchUsers"
      />
      <ul v-if="users.length > 0">
        <li v-for="user in users" :key="user.username">{{ user.username }}</li>
      </ul>
      <p v-else-if="showNotFound">User not found</p>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { UserDetails } from "../model/userDetails";

export default defineComponent({
  name: 'SearchUsername',
  data() {
    return {
      query: '',
      users: [] as UserDetails[],
      showNotFound: false,
    };
  },
  methods: {
    searchUsers() {
    
      setTimeout(() => {
    
        const searchedUser = this.query;
        const foundUser = this.users.find((user: UserDetails) => user.username === searchedUser);


        if (foundUser) {
          this.users = [foundUser];
          this.showNotFound = false;
        } else {
          this.users = [];
          this.showNotFound = true;
        }
      }, 500); 
    },
  },
});
</script>



<style scoped>
.search-username {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input {
  margin-bottom: 10px;
  padding: 5px;
  width: 200px;
}

.username-result {
  margin-top: 10px;
}
</style>