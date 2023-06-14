<template>
    <div class="search-query">
      <input
        class="search-input"
        type="text"
        v-model="query"
        placeholder="Search query..."
        @keyup.enter="searchBooks"
      />
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchQuery',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    searchBooks() {
      this.$emit('search', this.query);
    },
  },
});
</script>


<style scoped>
.search-query {
  width: 50%;
  margin-bottom: 0.5em;
  padding: 0.5rem;
  background-color: white;
  height: 5em;
}

.search-input {
  width: 100%;
  color: black;
  font-size: 24px;
  height: 2.5em;
}
</style>