/** This is the guest page - a user that doesn't require to be registered in order to search and see books. */
<template>
    
    <div class="guest-view">
    <div class="search-container">
      <SearchQuery
      v-model="searchInputValue"
      placeholderValue="Search query..."
      @keyup.enter="performSearch"
      />
    </div>

      
      <!-- <div class="signout-section">
        <SignOut />
      </div> -->

      <div v-if="bookList.length !==0">
    <table class="book-table">

      <thead>
        <tr class="headers">
          <th>Book title</th>
          <th>Book author</th>
          <th>Availability</th>
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
import SignOut from '../components/SignOut.vue';
import bookService from '../service/bookService';
import type { BookDetails } from '../model/bookDetails';
import axios from "axios";
import jwtService from '../service/jwtService';

export default defineComponent({
  name: 'GuestView',
  components: {
    SearchQuery, 
     SignOut,
  },
  data() {
    return {
        searchInputValue: "",
        bookList: [] as BookDetails[],
        books: [] as BookDetails[],
      
    };
  },
   async mounted() {
    this.bookList = await bookService.fetchAll();
    // console.log('Length of bookList:', this.bookList.length);
    this.books = this.bookList;
   },

   methods: {
  performSearch() {
    const searchTerm = this.searchInputValue.trim().toLowerCase();
    if (searchTerm === '') {
      this.books = this.bookList;
    } else {
      this.books = this.bookList.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
    }
  }
  
}
});
</script>


<style scoped>


.book-table {
  width: 100%;
  display: table;
  /* justify-content: center; */
  border-collapse: collapse;
}

.headers {
  background-color: grey;
  color: white;
  font-size: 25px;
  text-align: center;
}

.th {
  padding: 1px;
  /* border-bottom: 1px solid #ddd; */
  text-align: center;
  background-color: grey;
  color:white;
  font-size: 25px;
}
.td {
  padding: 1px;
  /* border-bottom: 1px solid #ddd; */
  text-align: center;
  background-color: lightgrey;
  color: grey;
  font-size: 20px;
  height: 2 rem;
}
.tr {
  font-size: 20px;
}

</style>