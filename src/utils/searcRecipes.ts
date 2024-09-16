import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Recipe } from './types';

export const searchRecipeByTitle = async(title: string) => {

    try {
        //accessing the firestore collection
        const recipeBlogCollection = collection(db, 'recipes-blog');
        
        // build a query
        // const recipeQuery = query(recipeBlogCollection, where ('title', '==', title ));
        const recipeQuery = query(recipeBlogCollection, where ('title', '>=', title ),  where('title', '<=', title + '\uf8ff'));

        
        //execute the query
        const querySnapshot = await getDocs(recipeQuery);

        if (!querySnapshot.empty) {
            // return first document's data
                   //Map over each document and extratc its data
        const recipeList: Recipe[] = querySnapshot.docs.map((doc) => {
            
            const data = doc.data();
            return {
                recipeId: data.recipeId,
                title: data.title,
                introduction: data.introduction,
                ingredients: data.ingredients,
                instructions: data.instructions,
                imageUrl: data.imageUrl,
            } as Recipe;
        });
        return recipeList;
        
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error;
    }

}