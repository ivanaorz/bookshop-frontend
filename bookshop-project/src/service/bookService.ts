import tokenAxios from "@/interceptor/tokenAxios";
import type { BookDetails } from "@/model/bookDetails";

const BASE_BOOK_URL = "http://127.0.0.1:8080";

export default {
  async fetchAll(): Promise<Array<BookDetails>> {
    const resp = await tokenAxios.get(BASE_BOOK_URL + "/library/books");
    return resp.data;
  },

  async searchBooks(query: string): Promise<Array<BookDetails>> {
    const resp = await tokenAxios.get(BASE_BOOK_URL + `/library/books/search?q=${query}`);
    return resp.data;
  },

  
  async purchaseBook(title: string, quantity: number): Promise<any> {
    const resp = await tokenAxios.post(BASE_BOOK_URL + `/library/user/books${title},${quantity}`);
    return resp.data;
  },

  async deleteBook(title: string): Promise<any> {
    const resp = await tokenAxios.delete(BASE_BOOK_URL + `/admin/books${title}`);
    return resp.data;
  },

  async updateBook(previous: string, current: string): Promise<any> {
    const resp = await tokenAxios.put(BASE_BOOK_URL + `/admin/books${previous},${current}`);
    return resp.data;
  },

  async addBook(author: string, title: string, quantity: number): Promise<any> {
    const resp = await tokenAxios.post(BASE_BOOK_URL + `/admin/books ${author},${title},${quantity}`);
    return resp.data;
  },
};
