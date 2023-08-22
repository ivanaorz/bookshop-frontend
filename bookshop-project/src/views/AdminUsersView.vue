/** This is the admin page where are displayed users. The admin can search for users, see users' list, delete and promote users. */
<template>
 <div class="admin-users-view">
    <div class="search-container">
      <SearchQuery
      v-model="searchInputValue"
      placeholderValue="Search by username..."
      @keyup.enter="performSearch"
      />
    </div>
    
<div class="signout-section">
  <SignOut />
</div>

<div class="search-section">
  <SearchUsername />
</div>

<div v-if="userList.length !==0">
      <table class="user-table">

        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Purchases</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
            <tr v-for="user in users" :key="user.role">
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.purchases }}</td>

          <td>
            <div class="action-section">
              <button class="promote" @click="promoteUser(user)">-</button>
            
              <button class="delete" @click="deleteUser(user)">+</button>
            </div>
          </td>

        </tr>
      </tbody>

    </table>
    </div>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchUsername from '../components/SearchUsername.vue';
import SignOut from '../components/SignOut.vue';
import type { UserDetails } from '../model/userDetails';
import userService from '../service/userService';


export default defineComponent({
  name: 'AdminUsersView',
  components: {
    SearchUsername, SignOut,
  },
  data() {
    return {
        searchInputValue: "",
        users: [] as UserDetails[],
        userList: [] as UserDetails [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    performSearch(){

    },
    async fetchUsers() {
      try {
        this.users = await userService.fetchAll();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    async deleteUser(user: UserDetails) {
      try {
        await userService.deleteUser(user.username);
        console.log('User deleted successfully!');
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    async promoteUser(user: UserDetails) {
      try {
        await userService.assignAdminRole(user.username);
        console.log('User promoted successfully!');
      } catch (error) {
        console.error('Failed to promote user:', error);
      }
    },
  },
});
</script>

<style scoped>
.user-table {
  width: 100%;
}

.td {
  padding: 1px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  background-color: grey;
  color: grey;
  font-size: 20px;
}
.th {
  background-color: #f2f2f2;
  color: white;
  font-size: 30px;
  text-align: center;
  padding: 1px;
  border-bottom: 1px solid #ddd;
}
.action-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.promote, .delete {
  padding: 5px 10px;
  background-color: darkgrey;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 5px;
}

</style>
