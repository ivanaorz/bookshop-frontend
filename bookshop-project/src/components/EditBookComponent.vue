<!-- This is a component that provides a pop up window for editing a book.  -->
<template>
    <div class="edit-book-modal">
      <div class="headline-container">
      <h2>Edit book</h2>
      </div>

      <div class="input-container">
        <label class="title">Title</label>
        <input class="title-placeholder" placeholder="Insert new title..." v-model="editedBook.title" type="text"/>
      </div>
      <div class="input-container">
        <label class="author">Author</label>
        <input class="author-placeholder" placeholder="Insert new author..." v-model="editedBook.author" type="text"/>
      </div>
      <div class="input-container">
        <label class="quantity">Quantity</label>
        <input class="quantity-placeholder" placeholder="Insert new quantity..." v-model="editedBook.quantity" type="string"/>
      </div>
      <div class="modal-buttons-container">
        <button class="save-changes" @click="saveChanges">Save changes</button>
        <button class="discard-changes" @click="discardChanges">Discard changes</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'EditBookComponent',
    props: {
      book: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        editedBook: { ...this.book }, 
      };
    },
    methods: {
      // Emitting the edited book to the parent component.
      saveChanges() {
        this.$emit('save', this.editedBook);
      },

      // Closing the modal without saving changes.
      discardChanges() {
        this.$emit('close');
      },
    },
  });
  </script>
  
  <style scoped>
  .edit-book-modal {
    width: 40%;
    text-align: center;
    padding: 2em 4em;
    background-color: lightblue;
    position: fixed;
    right: 30%;
    bottom: 10%;
    border-radius: 0.3rem;
  }
  h1 {
    font-size: 30px;
  }
  .headline-container {
    margin-bottom: 1.5em;
  }
  label {
    display: block;
    margin-left: .25em;
    margin-bottom: .25em;
  }
  .input-container {
    margin-bottom: 2em;
  }
  .title-placeholder, .author-placeholder, .quantity-placeholder  {
    width: 100%;
    padding: 1em;
    border-radius: 0.3rem;
  }
  .modal-buttons-container {
  width: 70%;
  padding: 10px;
  margin: 10px;
  margin-left: 100px;
  display: flex;
  text-align: center;
  }
  .input-container::placeholder {
  width: 100%;
  color: black;
  font-size: 25px;
  margin-left: 20px;
  padding: 20px;
  }
 
  .save-changes, .discard-changes {
    font-size: 15px;
    background-color: darkgray;
    color: black;
    border-radius: 0.3rem;
    margin: 10px;
    display: flex;
  }
  
  </style>
  