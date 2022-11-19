import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookShelfChanger } from "./BookShelfChanger";
import * as BooksAPI from "../BooksAPI";

export const SearchBooks = ({ books, onSellect }) => {
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [render, setRender] = useState(false);
  
  const handleSearchQuery = (q) => {
    setQuery(q);
    if (q === "" || q.length === 0) {
      setSearchResult([]);
      setRender(!render);
    } else {
      BooksAPI.search(q)
        .then((res) => {
          if (!res.error) {
            if (res && res.length > 0) {
              const searched = res.map((book) => {
                books.map((origBook) => {
                  if (origBook.id === book.id) {
                    book = { ...book, shelf: origBook.shelf };
                  }
                  return book;
                });
                return book;
              });
              setSearchResult(searched);
              setErrorMsg(false);
            }
          } else {
          setErrorMsg('Please serach with valied value');
        }
      })
    }
  };

  const handleSellect = (shelf, book) => {
    onSellect(book, shelf);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search"></Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search Books"
            value={query}
            onChange={(e) => handleSearchQuery(e.target.value)
            } 
          />
        </div>
      </div>
      <div className="search-books-results">
        <div className="books-grid">
          {!errorMsg? (
            query.length > 0? (
              searchResult.map((book) => {
                try {
                  return (
                    <li key={book.id}>
                    <div className="book">
                  <div className="book-top">
                    <Link to={`/books/${book.id}`}>
                      <div className="book-cover">
                        <img src = {book.imageLinks.thumbnail} alt="book-img" />
                      </div>
                    </Link>
                        <div className="book-shelf-changer">
                          <select
                            defaultValue={book.shelf || ""}
                            onChange={(e) => {
                              handleSellect(e.target.value, book)
                            }}
                            >
                            <BookShelfChanger />
                          </select>
                            </div>
                      </div>
                      <h1 className="book-title">{book.title}</h1>
                      <p className="book-authors">{book.authors}</p>
                    </div>
                  </li>
                  )
                } catch (err) {
                  return (
                    <li key={book.id}>
                    <div className="book">
                  <div className="book-top">
                    <Link to={`/books/${book.id}`}>
                      <div className="book-cover">
                        <img src = {""} alt="book-img" />
                      </div>
                    </Link>
                        <div className="book-shelf-changer">
                          <select
                            defaultValue={book.shelf || ""}
                            onChange={(e) => {
                              handleSellect(e.target.value, book)
                            }}
                            >
                            <BookShelfChanger />
                          </select>
                            </div>
                      </div>
                      <h1 className="book-title">{book.title||""}</h1>
                      <p className="book-authors">{book.authors||""}</p>
                    </div>
                  </li>
                  )
                }
                   
              }
)
            ):(<div></div>)
          ):(
              <div>
                {errorMsg}
              </div>
          )
}
        </div>
      </div>
    </div>
  );
};
