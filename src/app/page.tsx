import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";
import RecipesBlog from "../app/recipes-blog/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>
          <span>FlavorSearch</span> - Discover Your Next Favorite Recipe
        </h1>
        <main className={styles.main}>
          <SearchBar />
        </main>
      </header>
      <section>{/* <RecipesBlog /> */}</section>

      {/* <section className={styles.features}>
      <div className={styles.featureCard}>
        <h2 className={styles.featureTitle}>Explore Cuisines</h2>
        <p className={styles.featureDescription}>
          Discover a wide variety of cuisines from around the world. From Italian to Japanese, find recipes that suit your taste.
        </p>
      </div>
      <div className={styles.featureCard}>
        <h2 className={styles.featureTitle}>Cooking Tips</h2>
        <p className={styles.featureDescription}>
          Get helpful tips and tricks to enhance your cooking skills and make meal preparation easier and more enjoyable.
        </p>
      </div>
      <div className={styles.featureCard}>
        <h2 className={styles.featureTitle}>Recipe of the Week</h2>
        <p className={styles.featureDescription}>
          Check out our featured recipe each week, handpicked for its taste, simplicity, and popularity.
        </p>
      </div>
 
    </section> */}
      <footer className={styles.footer}>Created with ❤ only for you!</footer>
    </div>
  );
}

{
  /* <div className={styles.page}>
      <header className={styles.hero}>
          <h1>
            <span>FlavorQuest</span> - Discover Your Next Favorite Recipe</h1>
          
      </header>
      <main className={styles.main}>
      
           <SearchBar />
      </main>
      <footer className={styles.footer}>
      Created with ❤ only for you!
      </footer>
    </div> */
}
