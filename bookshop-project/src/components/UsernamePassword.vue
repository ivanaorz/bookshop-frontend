/** This component represents the input form for username and password. */
<template>
    <div class="username-and-password">
        <form @submit.prevent="handleSubmit">
        <div>
            <label class="username-label">Username</label>
            <input class="username" placeholder="Type your username..." v-model="authDetails.username" type="text"/>
        </div>
        <div>
            <label class="password-label">Password</label>
            <input class="password" placeholder="Enter a password..." v-model="authDetails.password" type="password"/>
        </div>
    </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { type PropType } from "vue";
import type { SignupAuthDetails } from '../model/authDetails';
// import type { UserDetails } from '../model/userDetails';
import authService from '../service/authService';
export default defineComponent ({
    name: 'UsernamePassword',
    data () {
        return {
            authDetails: {
        username: '',
        password: '',
      } as SignupAuthDetails,
        };
    },
   
    methods: {
        handleSubmit() {
            // const { username, password } = this.authDetails;
            // this.$emit("sendUserDetails", {username, password});
            console.log(this.authDetails.username, this.authDetails.password)
        },
    }
    
});

</script>

<style scoped>
.username-and-password {
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 30px;
}
.username-label, .password-label {
    font-size: 30px;
}
.username, .password {
    font-size: 20px;
}
</style>