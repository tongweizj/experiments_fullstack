import React, { useState, useEffect } from 'react';

const BooksList = () => {
  // define state variables
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('javascript'); // Default search term
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Fetch books from the OpenLibrary API
    const fetchBooks = async () => {
      if (!searchTerm) return; // Don't fetch if the search term is empty

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();

        const numResults = data.numFound;
        const resultsPerPage = 10;
        const totalPages = Math.ceil(numResults / resultsPerPage);
        setTotalPages(totalPages);

        const loadedBooks = data.docs.map((doc) => ({
          title: doc.title,
          author: doc.author_name?.join(', ') || 'Unknown Author',
          year: doc.first_publish_year || 'Unknown Year'
        }));
        setBooks(loadedBooks);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    //const timer = setTimeout(() => {
      fetchBooks();
    //}, 500); // Adding a debounce of 500ms for the search

    //return () => clearTimeout(timer); // Cleanup the timeout on unmount or before the next effect runs
  }, [searchTerm, currentPage]); // Effect will re-run when searchTerm or currentPage changes

  return (
    <div>
      <h1>Book Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for books"
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <>
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                <strong>{book.title}</strong> by {book.author} (First published in {book.year})
              </li>
            ))}
          </ul>
          <div>
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage((prev) => prev - 1)}>
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => setCurrentPage((prev) => prev + 1)}>
                Next
              </button>
            )}
            <p>Page {currentPage} of {totalPages}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BooksList;
