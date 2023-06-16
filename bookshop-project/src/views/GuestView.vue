<template>
    
    <div class="guest-view">
      <div class="search-section">
        <SearchQuery />
      </div>

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
   </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchQuery from '../components/SearchQuery.vue';
import bookService from '../service/bookService';
import type { BookDetails } from '../model/bookDetails';
import axios from "axios";
import jwtService from '../service/jwtService';

export default defineComponent({
  name: 'GuestView',
  components: {
    SearchQuery,
  },
  data() {
    return {
        query: "",
        books: [] as BookDetails[],
        bookList: [] as BookDetails [],
      
    };
  },
  async created() {
    await this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        this.books = await bookService.fetchAll();
      } catch (error) {
        console.error(error);
      }
    },
},
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