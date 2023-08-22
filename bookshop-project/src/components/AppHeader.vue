/** This component is installed globally in the file App.vue in order to be displayed on every page.  */
<template>
  <header class="header">
      <h1 class="header-name">Booksters website</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
});
</script>

<style scoped>
.header{ 
  background-color: lightblue;
  height: calc(20%); 
  display: flex;
  align-content: center;
  justify-content: space-around;
}
.header-name {
  padding-top: 5px;
  padding-bottom: 5px; 
  color: grey;
  margin: auto;
  font-size: 40px;
  font-weight: 500;
}
</style>