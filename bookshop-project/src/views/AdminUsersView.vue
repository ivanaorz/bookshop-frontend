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
            <tr v-for="user in users" :key="user.username">
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.purchases.length }}</td>

          <td>
            <div class="action-section">
              <button class="promote" @click="promoteUser(user.username)">Promote</button>
            
              <button class="delete" @click="deleteUser(user.username)">Delete</button>
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
import SearchQuery from '../components/SearchQuery.vue';
import SignOut from '../components/SignOut.vue';
import type { UserDetails } from '../model/userDetails';
import userService from '../service/userService';


export default defineComponent({
  name: 'AdminUsersView',
  components: {
    SearchQuery,
  },
  data() {
    return {
        searchInputValue: "",
        users: [] as UserDetails[],
        userList: [] as UserDetails [],
        user: {} as UserDetails,
        username: "",
        isEditModalOpen: false,
    };
  },
  async mounted() {
  this.userList = await userService.fetchAll();
    this.users = this.userList;
  },
  methods: {
    async performSearch(){
      const searchTerm = this.searchInputValue.trim().toLowerCase();
      if (searchTerm === '') {
        this.users = this.userList;
      } else {
        this.users = this.userList.filter(
          (user) =>
            user.username.toLowerCase().includes(searchTerm)
        );
      }

    },
   
    async deleteUser(username: string) {
      try {
        await userService.deleteUser(username);
        console.log('User deleted successfully!');
        this.userList;
        this.isEditModalOpen = false;
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    async promoteUser(username: string) {
      try {
        await userService.assignAdminRole(username);
        console.log('User promoted successfully!');
        this.userList;
        this.isEditModalOpen = false;
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
