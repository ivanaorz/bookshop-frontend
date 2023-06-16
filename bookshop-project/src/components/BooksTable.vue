/** This component is imported in GuestView. */
<template>
    <div v-if="bookList.length !==0">
    <table class="book-table">

      <thead>
        <tr>
          <th>Book title</th>
          <th>Book author</th>
          <th>Availability</th>
          <th>Order</th>
        </tr>
      </thead>

      <tbody>
          <tr v-for="book in books" :key="book.title">
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.quantity }}</td>

      </tr>
    </tbody>

  </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { BookDetails } from '../model/bookDetails';

export default defineComponent({
  name: "BooksTable",
  data() {
    return {
        query: "",
        books: [] as BookDetails[],
        bookList: [] as BookDetails [],
    }
  }
});
</script>

<style scoped>

.search-section {
  display: flex;
  align-items: flex-start;
}
table {
  width: 100%;
}

th {
  padding: 1px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  background-color: grey;
  color:white;
  font-size: 30px;
}
td {
  padding: 1px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  background-color: lighgrey;
  color: grey;
  font-size: 20px;
}


</style>
