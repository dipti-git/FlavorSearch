"use client";
import { ChangeEvent, useState } from "react";
import styles from "./SearchBar.module.css";
import { useRouter } from "next/navigation";
import { searchRecipeByTitle } from "@/utils/searcRecipes";
import { Recipe } from "@/utils/types";
import Link from "next/link";
import { useEffect } from "react";
import { getAllRecipes } from "@/utils/getRecipes";
import RecipesBlog from "@/app/recipes-blog/page";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [allRecipes, setAllRecipes] = useState<Recipe[] >([]);
  const router = useRouter();

  useEffect(() => {

    const fetchAllRecipes = async () => {

      const data = await getAllRecipes();
      setAllRecipes(data);

    }
    fetchAllRecipes();
  }, []);

  //Handle Input Change

  // Debounce the query input to reduce the number of API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Adjust debounce delay as needed
    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  
  useEffect(() => {
    if (debouncedQuery) {
      const fetchRecipes = async () => {
        console.log(debouncedQuery);
        const data = await searchRecipeByTitle(debouncedQuery);
        setRecipes(data);
      };

      fetchRecipes();
    } else {
      setRecipes([]);
    }
  }, [debouncedQuery]);

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //       const data = await searchRecipeByTitle(query);
  //       setRecipes(data);
  //   };
  //   fetchRecipes();
  // }, [query]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    // Store the return value of searchRecipeByTitle function

    // Set the result as variable recipe's value

    // Check if the returned value is empty array or arrary or objects
    // If data represents the returned value which is an array, check its length
    // If length is greator than 0,
  };

  // Navigate to the search page with the query as a URL parameter
  const handleSearch = () => {
    if (query) {
      router.push(`/search?title=${query.trim()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
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
      {recipes.length  > 0 &&  query !== '' && (
        recipes.map((recipe) => (
          <li key={recipe.recipeId} className={styles.recipeItem}>
          {recipe.imageUrl ? (
             <img src={recipe.imageUrl} alt={recipe.title}  className={styles.recipeImage} />
            ): (
              <p> No image url available</p>
            )}
          <Link href={`recipes-blog/${recipe.recipeId}`} className={styles.recipeTitle}>
            {recipe.title}
          </Link>
        </li>
        )))

      }


 { query === '' &&      <ul className={styles.recipesList}>
        {allRecipes &&
          allRecipes.map((recipe) => (
            <li key={recipe.recipeId} className={styles.recipeItem}>
              {recipe.imageUrl ? (
                 <img src={recipe.imageUrl} alt={recipe.title}  className={styles.recipeImage} />
                ): (
                  <p> No image url available</p>
                )}
              <Link href={`recipes-blog/${recipe.recipeId}`} className={styles.recipeTitle}>
                {recipe.title}
              </Link>
            </li>
          ))}
      </ul>
        }
       
        
    </>
  );
};

export default SearchBar;
