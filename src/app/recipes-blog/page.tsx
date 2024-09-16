"use client";
import Link from "next/link";
import { getAllRecipes } from "@/utils/getRecipes";
import { Recipe } from "@/utils/types";
import { useEffect, useState } from "react";
import styles from './page.module.css';

const RecipesBlog = () => {
  // STore all recipes
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Failed to load recipes");
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div  className={styles.recipesBlogContainer}>
      {/* <h1 className={styles.recipesBlogTitle}>Recipes Blog</h1> */}
      <ul className={styles.recipesList}>
        {recipes &&
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
          ))}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RecipesBlog;
