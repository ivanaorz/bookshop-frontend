<template>
    <header>
        <h1 class="header-name"> {{ title }}</h1>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {},
});
</script>

<Style scoped>
header {
  background-color: rgb(116, 200, 220);
  text-align: center;
  padding: 1.5em;
  margin-bottom: 1em;
}
</Style>