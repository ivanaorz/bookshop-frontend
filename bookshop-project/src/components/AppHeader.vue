/** This component is installed globally in the file main.ts in order to be displayed on every page.  */
<template>
    <header>
        <h1 class="header-name"> {{ title }}</h1>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.header-name {
  background-color: lightblue;
  height: calc(12.5% - 1cm); 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5em; 
  margin-bottom: 1em;
}
</style>