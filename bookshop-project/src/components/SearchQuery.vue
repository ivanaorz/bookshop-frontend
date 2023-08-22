/** This component was created so that users can search for books. It is imported multiple times. */


<template>
    <input
      class="search-input-class"
      type="text"
     v-model="userInput"
      :placeholder="placeholderValue"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchQuery',
  props: {
    userInput: String,
    placeholderValue: String
  }
});
 
</script>


<style scoped>
.search-input-class {
  width: 50%;
  margin-top: 30px;
  margin-left: 60px;
  margin-bottom: 10px;
  background-color: white;
  height: 4em;
  border-radius: 5px;
  border: 3px solid grey;
  font-size: 20px;
  color: dark grey;
  font-family: 'Courier New', serif;
}
.search-input-class::placeholder {
  width: 100%;
  color: grey;
  font-size: 25px;
  margin-left: 20px;
  padding: 20px;
}

</style>