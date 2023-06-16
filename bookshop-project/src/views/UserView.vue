/** This is the page for registered users where thay can see search for and order books. */
<template>
    <div class="user-view">

     
      <div class="signout-section">
        <SignOut />
      </div>

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

          <td>
            <div class="order-section">
              <button class="minus-sign" @click="decrementItemCount(book)">-</button>
              <span>{{ book.orderCount }}</span>
              <button class="plus-sign" @click="incrementItemCount(book)">+</button>
              <button class="order" @click="placeOrder(book.title, book.quantity)">Order</button>
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
import SignOut from '../components/SignOut.vue';
import bookService from '../service/bookService';
import authService from '../service/authService';
import type { BookDetails } from '../model/bookDetails';
import axios from "axios";
import jwtService from '../service/jwtService';

export default defineComponent({
  name: 'UserView',
  components: {
    SearchQuery, SignOut,
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
    incrementItemCount(book: BookDetails) {
      book.orderCount++;
    },
    decrementItemCount(book: BookDetails) {
      if (book.orderCount > 0) {
        book.orderCount--;
      }
    },
    async placeOrder(title: string, quantity: number) {
      try {
        await bookService.purchaseBook(title, quantity);
        console.log("Your order is successful!");
      } catch (error) {
        console.error('Failed to fetch books:',error);
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

.order-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-section button {
  padding: 5px;
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

</style>