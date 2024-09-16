"use client";
import { ChangeEvent, useState } from "react";
import styles from "./SearchBar.module.css";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
//Handle Input Change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Navigate to the search page with the query as a URL parameter
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?title=${query}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Start typing to find your favorite food recipes..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
