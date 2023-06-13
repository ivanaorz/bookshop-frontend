<template>
    <div class="username-and-password">
        <div>
            <label class="username-label">Username</label>
            <input class="username" placeholder="Type your username..." v-model="authDetails.username" type="text"/>
        </div>
        <div>
            <label class="password-label">Password</label>
            <input class="password" placeholder="Enter a password..." v-model="authDetails.password" type="password"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { type PropType } from "vue";
import type { SignupAuthDetails } from '../model/authDetails';
import authService from '../service/authService';
export default defineComponent ({
    name: 'UsernamePassword',
    props: {
        afterSubmit: {
            type: Function as PropType<() => void>,
            required: true,
        },
    },
    setup(props) {
        const authDetails = ref<SignupAuthDetails>({ username: '', password: '' });

    const handleSubmit = async () => {
      await authService.register(authDetails.value);
      props.afterSubmit();
    };

    return {
      authDetails,
      handleSubmit,
    };
  },
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