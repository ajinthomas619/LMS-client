import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "../../lib/utils";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input } from "@mui/material";

const Search = () => {
  const [books, setBooks] = useState([]);

  const [q, setQ] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchData = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setBooks([]);

        setSearchPerformed(false);
        setShowDropdown(false);
        return;
      }
      try {
        console.log("entered to try block")
        const booksResponse = await axios.get(
          `http://localhost:3000/api/books/search-book/${query}`,
          {
            withCredentials: true,
          }
        );

        console.log("the book response", booksResponse.data.data);
        setBooks(booksResponse.data.data);
        setSearchPerformed(true);
        setShowDropdown(true);
      } catch (error) {
        console.log("error fetching data", error);
        setSearchPerformed(false);
        setShowDropdown(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(q);
  }, [q, fetchData]);

  const handleInputChange = (e) => {
    setQ(e.target.value);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={q}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="...Search"
        className="input input-bordered w-full mb-4"
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 rounded-md mt-1">
          <div className="p-4">
            {searchPerformed && books.length === 0 && users.length === 0 && (
              <p>No results found</p>
            )}
            {books.length > 0 &&
              books.map((book) => (
                <div
                  key={book._id}
                  className="p-4 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-80 mb-2"
                >
                  <h3>{book.title}</h3>
                  <h5>{book.author}</h5>
                  <Link to={`/book/${book._id}`}>
                    <img
                      src={`http://localhost:3000/books/${book.image}`}
                      alt={`${book.image}'s profile`}
                      className="w-32 h-32 object-cover"
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
