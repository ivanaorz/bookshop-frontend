<template>
  <div id="app">
   <div class="main-container">
     <AppHeader/>
 <RouterView />
</div>
</div>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
});
</script>

<style scoped>
.app{
  height: 100vh;
}
.main-container {
  background-color: white;
  padding: 0cm;
  align-items: center;
  border: 2px solid grey;
  width: 80vw;
  height: 95vh;
}

</style>
