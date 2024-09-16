import { getRecipeById } from "@/utils/getRecipes";
import { Recipe } from "@/utils/types";
import BlogPost from "@/components/BlogPost";
export default async function RecipePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const recipeId = params.recipeId;

  try {
    // fetch recipe data on the server
    const recipeData: Recipe = await getRecipeById(recipeId);

    //return the blog post if recipe data is found

    return (
      <div>
        <BlogPost
          title={recipeData.title}
          introduction={recipeData.introduction}
          ingredients={recipeData.ingredients}
          instructions={recipeData.instructions}
          image={recipeData.imageUrl}
        />
      </div>
    );
  } catch (err) {
    console.log("console error", err);
    return <p>Recipe not found</p>;
  }
}

// "use client"
// import { useEffect, useState } from "react";
// import BlogPost from "../../../components/BlogPost";
// import { getRecipeById } from "../../../utils/getRecipeById"
// import { useRouter } from "next/router";
// import { DocumentData } from "firebase/firestore";

// const RecipePage = () => {

// //extracting recipeId from URL
// const router = useRouter();
// //Extract recipeId from URL
// const { recipeId } = router.query;

// const [recipeData, setRecipeData] = useState<DocumentData | null>(null);
// const [error, setError] = useState<string | null>(null);

// // Fetch recipe data when recipeId is available
// // router.query returns an object with query  params to get recipeId as 'recipe'
// useEffect(() => {
//     if (recipeId) {
//         const fetchRecipe = async() => {
//             try {
//                 const data = await getRecipeById(recipeId as string);
//                 setRecipeData(data);
//             } catch (err) {
//                 setError('Recipe not found')
//             }
//         }

//         fetchRecipe();
//     }
// //Effect runs when recipeId changes
// }, [recipeId])

// return (
//     <div>
//         {recipeData && (
//             <BlogPost
//                 title={recipeData.title}
//                 introduction={recipeData.introduction}
//                 ingredients={recipeData.ingredients}
//                 instructions={recipeData.instructions}
//             />
//         )}
//     </div>
// );
// }

// export default RecipePage;
