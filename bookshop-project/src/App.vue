<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from "vue";
import Header from "./components/HeaderView.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      bookshopName: "Booksters website",
    };
  },
});
</script>

<template>
   <div id="app">
    <top-header :title="bookshopName" />
  <RouterView />
</div>
</template>

<style scoped>

</style>
