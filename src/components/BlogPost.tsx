import React from 'react';
import styles from '../components/BlogPost.module.css';

interface BlogPostProps {
    title: string;
    introduction: string;
    ingredients: string[];
    instructions: string[];
    image?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
    title, 
    introduction, 
    ingredients, 
    instructions,
    image
 }) => {
    return (
        <article className={styles.article}>
            <h1 className={styles.title}>{title}</h1>
            {image && <img src={image} alt={title} className={styles.image} />}
            <p className={styles.paragraph}>{introduction}</p>
            <section>
                <h2 className={styles.subtitle}>Ingredients</h2>
                <ul className={styles.list}>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2 className={styles.subtitle}>Instructions</h2>
                <ol className={styles.list}>
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </section>
        </article>
    )
}

export default BlogPost;