 <!-- On this page, the user with the role ADMIN can search, order, edit and delete books. -->
<template>
    <div class="admin-books-view">
    <div class="search-container">
      <SearchQuery
      v-model="searchInputValue"
      placeholderValue="Search query..."
      @keyup.enter="performSearch"
      />
    </div>
     
      <p class="message">{{ message }}</p>

      <div class="books-users-buttons-container">
      <!-- <button class="add-new-book-button" @click="addNewBook">Add new book</button> -->
      <button class="users-button" @click="$router.push('/admin/users')">Users</button>
    </div>

    <EditBookComponent
    v-if="isEditModalOpen"
    :book="current"
    @save="saveBookChanges"
    @close="closeEditModal"
  />
      <div v-if="bookList.length !==0">
    <table class="book-table">

        <thead>
          <tr class="headers">
            <th>Book title</th>
            <th>Book author</th>
            <th>Availability</th>
            <th>Order</th>
            <th>Action</th>
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

          <td>
            <div class="action-section">
              <button class="edit" @click="editBook(book)">Edit</button>
              <button class="delete" @click="deleteBook(book.title)">Delete</button>
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
import EditBookComponent from '../components/EditBookComponent.vue';
import bookService from '../service/bookService';
import type { BookDetails } from '../model/bookDetails';
import jwtService from '../service/jwtService';
import type { UserDetails } from '../model/userDetails';

interface Previous {
  author: string;
  title: string;
  quantity: number;
  orderCount: number;
}

interface Current {
  author: string;
  title: string;
  quantity: number;
  orderCount: number;
}

export default defineComponent({
  name: 'UserView',
  components: {
    SearchQuery, EditBookComponent
  },
  data() {
    return {
        searchInputValue: "",
        books: [] as BookDetails[],
        bookList: [] as BookDetails [],
        user: {} as UserDetails,
        message: "",
        title: "",
        isEditModalOpen: false,
        previous: {} as Previous,
        current: {} as Current,
        jwtProperty: jwtService.getJwt()
      
    };
  },

  async created() {
   await this.fetchBooks();
  },

  methods: {
    // Getting all the books to be displayed.
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
      console.warn('You cannot order more than the available quantity.');
    }
  } else {
    console.warn('This book is out of stock.');
  }
    },

    decrementItemCount(book: BookDetails) {
      if (book.orderCount > 0) {
        book.orderCount--;
      }
    },

    async placeOrder(title: string, orderCount: number) {
      try {
        await bookService.purchaseBook(title, orderCount);
        this.message = 'Your order is successful!';
      } catch (error) {
        console.error('Failed to place the order:', error);
      }
    },
     
    // Deleting a book and updating the book list.
     async deleteBook(title: string,) {
      try {
      await bookService.deleteBook(title);
     this.message = 'The book was deleted';
     const deletedBook = this.bookList.findIndex((book) => book.title === title);
    if (deletedBook !== -1) {
      this.bookList.splice(deletedBook, 1);
    }
    this.books = this.bookList.map((book) => ({
      ...book,
      orderCount: 0,
    }));
    console.log('The book was deleted');
  } catch (error) {
    console.error('Failed to delete the book:', error);
  }
},

//Gettin ready to edit a book by making a copy of the book
// and opening the pop up edit modal.
editBook(book: BookDetails) {
      this.previous = { ...book }; 
      this.isEditModalOpen = true;
    },

    closeEditModal() {
      this.isEditModalOpen = false;
    },

    // Updating the book and replacing the previous book with the updated one.
    async saveBookChanges(current: BookDetails) {
      try {
        await bookService.updateBook(this.previous, current);
        this.fetchBooks();
        this.isEditModalOpen = false;
        this.message = 'Book details updated successfully';
      } catch (error) {
        console.error('Failed to update book details:', error);
      }
    },
}  
});
</script>

<style scoped>

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
  margin-left: 5px;
}

.action-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.action-section button {
  padding: 5px;
  width: 50px;
  height: 30px;
  margin-right: 5px;
  margin-left: 5px;
}

</style>