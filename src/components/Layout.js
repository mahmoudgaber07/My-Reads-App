import React from "react";
import { Header } from "./Header";
import { Bookshelf } from "./Bookshelf";
import { SearchBtn } from "./SearchBtn";
import * as BooksAPI from "../BooksAPI";
import { useState, useEffect } from "react";
export const Layout = () => {
  const [books, setBooks] = useState([]);
  const [flip,setFlip] = useState(true);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    BooksAPI.getAll()
      .then((res) => setBooks(res))
      .catch((err) => console.log(err));
  };
  
  const updateShelf = (book, shelf) => {
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
    <div className="layout">
      <Header />
      <Bookshelf title="Current Reading" books={books.filter(book => book.shelf === "currentlyReading")} updateShelf={updateShelf}/>
      <Bookshelf title="Want To Read" books={books.filter(book => book.shelf === "wantToRead")} updateShelf={updateShelf}/>
      <Bookshelf title="Read" books={books.filter(book => book.shelf === "read")} updateShelf={updateShelf}/>
      <SearchBtn />
    </div>
  );
};
