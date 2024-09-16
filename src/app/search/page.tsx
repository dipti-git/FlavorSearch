"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchRecipeByTitle } from "../../utils/searcRecipes";
import { Recipe } from "../../utils/types";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const FoodiePage = () => {
  //Extract title from URL
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (title) {
        try {
          const data = await searchRecipeByTitle(title);
          console.log(data);
          setRecipes(data);
        } catch (err) {
          setError("Failed to load recipes");
        }
      } else {
        setError("No title provided");
      }
    };
    fetchRecipes();
  }, [title]);
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Recipes Search Result</h1>
      <ul className={styles.recipesList}>
        {recipes &&
          recipes.map((recipe) => (
            <li>
              <Link
                key={recipe.recipeId}
                href={`recipes-blog/${recipe.recipeId}`}
                passHref
              >
                <div className={styles.resultCard}>
                  {/* <img src={recipe.imageUrl} alt={recipe.title} /> */}
                  <div className={styles.resultContent}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.introduction.slice(0, 100)}...</p>{" "}
                    {/* Preview the intro */}
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FoodiePage;

{
  /* <div className={styles.pageContainer}>
<h1 className={styles.title}>Recipes Blog</h1>
<ul className={styles.recipesList}>
  {recipes &&
    recipes.map((recipe) => (
      <li key={recipe.recipeId} className={styles.recipeItem}>
         <img src={recipe.imageUrl} alt={recipe.title} className={styles.recipeImage} />
        <Link href={`recipes-blog/${recipe.recipeId}`} className={styles.recipeTitle}>
          {recipe.title}
        </Link>
      </li>
    ))}
</ul>
</div> */
}
