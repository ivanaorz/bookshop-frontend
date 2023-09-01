 <!-- This is the guest page. The guest user doesn't require to be registered in order to search and see books.  -->
<template>
    
    <div class="guest-view">
      <div class="sign-up-and-user-info">
        <p>Browsing as guest</p>
        <button class="sign-up-button" @click="signUpButton">Sign up</button>
        </div>

    <div class="search-container">
      <SearchQuery
      v-model="searchInputValue"
      placeholderValue="Search query..."
      @keyup.enter="performSearch"
      />
    </div>

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
import bookService from '../service/bookService';
import type { BookDetails } from '../model/bookDetails';

export default defineComponent({
  name: 'GuestView',
  components: {
    SearchQuery, 
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
  },
  async signUpButton() {
      this.$router.push('/register');
    },
}
});
</script>


<style scoped> 

.sign-up-and-user-info {
  background-color: grey;
  color: white;
  padding-left: 10px; 
  margin-left: 1010px;
  margin-right: 0px;
  display: flex;
  align-content: center;
  border-radius: 0.3rem;
  text-align: center;
}
.sign-up-button {
  width: 30%;
  font-size: 15px;
  padding: 0.25em 1em;
  margin-bottom: 1em;
  margin-left: 5px;
  display: flex;
  margin: 10px auto; 
  text-align: center;
  border-radius: 0.3rem;
}
.book-table {
  width: 100%;
  display: table;
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
  text-align: center;
  background-color: grey;
  color:white;
  font-size: 25px;
}
.td {
  padding: 1px;
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