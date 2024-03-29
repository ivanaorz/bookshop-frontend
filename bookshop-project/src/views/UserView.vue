 <!-- This is the page for registered users where thay can search and order books. -->
<template>
    <div class="user-view">

      <div class="user-info">
        <p>Browsing as user</p>
        </div>
      
    <div class="search-container">
      <SearchQuery
      v-model="searchInputValue"
      placeholderValue="Search query..."
      @keyup.enter="performSearch"
      />
    </div>
     
      <p class="message">{{ message }}</p>

      <div v-if="bookList.length !==0">
    <table class="book-table">

        <thead>
          <tr class="headers">
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

          <td>
            <div class="order-section">
              <button class="minus-sign" @click="decrementItemCount(book)">-</button>
              <span>{{ book.orderCount }}</span>
              <button class="plus-sign" @click="incrementItemCount(book)">+</button>
              <button class="order" @click="placeOrder(book.title, book.orderCount)">Order</button>
            </div>
          </td>

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
import type { UserDetails } from '../model/userDetails';

export default defineComponent({
  name: 'UserView',
  components: {
    SearchQuery, 
  },
  data() {
    return {
        searchInputValue: "",
        books: [] as BookDetails[],
        bookList: [] as BookDetails [],
        user: {} as UserDetails,
        message: "",
    };
  },

  async created() {
    await this.fetchBooks();
  },
  methods: {
    // Getting the list with books to be displayed.
    async fetchBooks() {
      try {
        this.bookList = await bookService.fetchAll();
        this.books = this.bookList.map((book) => ({
          ...book,
          orderCount: 0,
        }));
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    },
    // Searching books in the search field.
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
    incrementItemCount(book: BookDetails) {
      if (book.quantity > 0) {
    if (book.orderCount < book.quantity) {
      book.orderCount++;
    } else {
      this.message = 'You cannot order more than the available quantity.';
      console.warn('You cannot order more than the available quantity.');
    }
  } else {
    this.message = 'This book is out of stock.';
    console.warn('This book is out of stock.');
  }
    },

    decrementItemCount(book: BookDetails) {
      if (book.orderCount > 0) {
        book.orderCount--;
      }
    },
    // Ordering the book.
    async placeOrder(title: string, orderCount: number) {
      try {
        await bookService.purchaseBook(title, orderCount);
        this.message = 'Your order is successful!';
      } catch (error) {
        console.error('Failed to place the order:', error);
      }
    },
  },
});
</script>

<style scoped>
.user-info {
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

.order-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-section button {
  padding: 5px;
  width: 50px;
  height: 30px;
  margin-right: 5px;
}

</style>