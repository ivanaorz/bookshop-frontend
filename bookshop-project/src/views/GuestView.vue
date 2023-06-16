/** This is the guest page - a user that doesn't require to be registered in order to search and see books. */
<template>
    
    <div class="guest-view">

      <div class="signout-section">
        <SignOut />
      </div>


      <div class="search-section">
        <SearchQuery />
      </div>

      <div clas="table-section">
        <BooksTable />
      </div>

   </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchQuery from '../components/SearchQuery.vue';
import SignOut from '../components/SignOut.vue';
import BooksTable from '../components/BooksTable.vue';
import bookService from '../service/bookService';
import type { BookDetails } from '../model/bookDetails';
import axios from "axios";
import jwtService from '../service/jwtService';

export default defineComponent({
  name: 'GuestView',
  components: {
    SearchQuery, BooksTable, SignOut,
  },
  data() {
    return {
        query: "",
        books: [] as BookDetails[],
        bookList: [] as BookDetails [],
        role: "",
      
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