import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Recipe } from './types';

export const getAllRecipes = async(): Promise<Recipe[]> => {
    try {
        //accessing the Firestore 'recipe-blog' collection
        const recipeBlogCollection = collection(db, 'recipes-blog');

        //Fetch all documents from the collection
        const querySnapshot = await getDocs(recipeBlogCollection);

        //Map over each document and extratc its data
        const recipeList: Recipe[] = querySnapshot.docs.map((doc) => {
            
            console.log(querySnapshot, 'QuerySnapshot')
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
    } catch(error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};


export const getRecipeById = async(recipeId: string) => {

    try {
        //accessing the firestore collection
        const recipeBlogCollection = collection(db, 'recipes-blog');
        
        // build a query
        const recipeQuery = query(recipeBlogCollection, where ('recipeId', '==', recipeId ));
        
        //execute the query
        const querySnapshot = await getDocs(recipeQuery);

        if (!querySnapshot.empty) {
            // return first document's data
            return querySnapshot.docs[0].data() as Recipe;
        } else {
            throw new Error('Recipe not found')
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error;
    }
};
