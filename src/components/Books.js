import React from "react";
import { useState, useEffect } from "react";
import { SearchBooks } from "./SearchBooks";
import * as BooksAPI from "../BooksAPI";
export const Books = () => {
  const [books, setBooks] = useState([]);
  const [flip, setFlip] = useState(true);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    BooksAPI.getAll()
      .then((res) => setBooks(res))
      .catch((err) => console.log(err));
  };
  const updateSellect = (book, shelf) => {
    const indx = books.findIndex((b) => b.id === book.id);
    const updateBookList = books;
    if (indx === -1) {
      book.shelf = shelf;
      updateBookList.push(book);
    } else {
      updateBookList[indx].shelf = shelf;
    }
    setBooks(updateBookList);
    BooksAPI.update(book, shelf);
    setFlip(!flip);
  };
  return (
    <div>
      <SearchBooks
        books={books}
        onSellect={updateSellect}
      />
    </div>
  );
};
