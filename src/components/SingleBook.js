import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as BooksAPI from "../BooksAPI";

export const SingleBook = () => {
    let bookID = useParams().id;
    const [book, setBook] = useState([]); 
    const [error, setError] = useState(false); 
    const [render, setRender] = useState(false); 
    
    useEffect(() => {
        getBook();
    }, []);

    const getBook = () => {
        BooksAPI.get(bookID).then((data) => {
            if (!data.error) {
                setBook(data);
                setRender(!render);
            } else {
                setBook([]);
                setError("something went wrong");
            }
        }).catch(err => {
            console.log(err); 
        })
    }
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/search" className="close-search"></Link>
          </div>
          <div className="search-books-results">
            <div className="books-grid">
              {!error && render ? (
                        <li key={book.id}>
                          <div className="book">
                        <div className="book-top">
                            <div className="book-cover">
                                <img src={book.imageLinks.thumbnail} alt="book-img" />
                              </div>
                            </div>
                            <h1 className="book-title">{book.title}</h1>
                            <p className="book-authors">{book.authors}</p>
                          </div>
                        </li>
              ) : (
                  <div>
                    {error}
                  </div>
              )
    }
            </div>
          </div>
        </div>
      );
}
