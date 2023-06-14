<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
  data() {
    return {
      
    };
  },
});
</script>

<template>
   <div id="app">
    
    <div class="main-container">
      <AppHeader title="Booksters website" />
  <RouterView />
</div>
</div>
</template>

<style scoped>
.main-container {
  background-color: lightgray;
  margin: 1cm;
  padding: 1cm;
  align-items: center;
  border: 3px solid grey;
  width: 80vw;
  height: 95vh;
}

</style>
