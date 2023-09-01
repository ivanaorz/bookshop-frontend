/**This file provides functions for interacting with a book service API 
  such as fetching all books, searching for books, purchasing a book, 
  deleting a book, updating a book, and adding a new book. */
  
import axios from "axios";
import tokenAxios from "@/interceptor/tokenAxios";
import type { BookDetails } from "@/model/bookDetails";

interface Previous extends BookDetails {}
interface Current extends BookDetails {}


const BASE_BOOK_URL = "http://127.0.0.1:3000/";

export default {
  async fetchAll(): Promise<Array<BookDetails>> {
    const resp = await axios.get(BASE_BOOK_URL + "library/books");
    return resp.data.books;
  },

  async searchBooks(searchInputValue: string): Promise<Array<BookDetails>> {
    const resp = await tokenAxios.get(BASE_BOOK_URL + `library/books/search?q=${searchInputValue}`);
    return resp.data.books;
  },

  async purchaseBook(title: string, orderCount: number): Promise<any> {
    try {
      const resp = await tokenAxios.post(BASE_BOOK_URL + 'library/user/books', { title: title, quantity: orderCount });
      if (resp.data) {
        return resp.data;
      }
      return 'Purchase successful'; 
    } catch (error) {
      console.error('Failed to place the order:', error);
      throw error; 
    }
  },

  async deleteBook(title: string): Promise<void> {
    try {
    const resp = await tokenAxios.delete(BASE_BOOK_URL + 'admin/books', {data: { title: title, }} );
    console.log(resp.data.message);
    } catch (error) {
      console.error('Failed to delete the book', error);
      throw error; 
    }
  },

  async updateBook(previous: Previous, current: Current): Promise<void> {
    try {
    const resp = await tokenAxios.put(BASE_BOOK_URL + 'admin/books', { previous, current });
    console.log(resp.data.message);
  } catch (error) {
    console.error('Failed to update the book', error);
    throw error; 
  }
},

  async addBook(author: string, title: string, quantity: number): Promise<any> {
    const resp = await tokenAxios.post(BASE_BOOK_URL + `admin/books ${author},${title},${quantity}`);
    return resp.data.books;
  },
};
