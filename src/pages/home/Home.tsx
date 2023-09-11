import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import RecipeList from '../recipe/recipeList/recipeList';
import { firestoreProj } from '../../firebase/config'

const Home : React.FC = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    setIsPending(true)
     const unsub =firestoreProj.collection('recipes').onSnapshot((snapshot) => {
      if(snapshot.empty){
        setError(true)
        setIsPending(false)
      }
      else{
        const results:any = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id ,...doc.data()});
        })
        
        setData(results)
        setIsPending(false)
      }
    },(err)=>{
      setError(error)
      setIsPending(false)
    })
    return ()=>unsub()
  }, [])
  return ( 
      <div className="home"> 
      
   {error&& <p className='error'>{error}</p>}
   {isPending && <p className='loading'>loading...</p>}
   {data &&  <RecipeList recipes={data} />},
 


    </div>
  );
};

export default Home;
