import React from "react";
import {BookShelfChanger} from "./BookShelfChanger"
export const Bookshelf = ({ title, books, updateShelf }) => {
  const handleSellect = (e, b) => {
    updateShelf(b, e);
  };

  return (
    <div className="bookshelf">
      <h1 className="bookshelf-title">{title}</h1>
      <div className="bookshelf-books">
        <div className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover">
                    <img src={book.imageLinks.thumbnail} alt="book-img" />
                  </div>
                  <div className="book-shelf-changer">
                    <select defaultValue={book.shelf} onChange={(e) => handleSellect(e.target.value, book)}>
                      <BookShelfChanger/>
                      </select>
                  </div>
                </div>
                <h1 className="book-title">{book.title}</h1>
                <p className="book-authors">{book.authors}</p>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
