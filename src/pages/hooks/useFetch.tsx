// import { useState, useEffect } from "react";

// interface FetchOptions {
//     method: string;
//     headers: { [key: string]: string };
//     body: any;
//     signal?: AbortSignal;

//   }

  
// export const useFetch = (url: string,method = "GET") => {
//     const [data, setData] = useState<any>(null);
//     const [isPending, setIsPending] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [options, setOptions] = useState<FetchOptions | null>(null);

    
//     const postData=(postData: any)=>{
//         setOptions({
//         method: "POST",
//         headers:{
//           "Content-Type":"application/json"
// },
//             body: JSON.stringify(postData)
//         })
//     }
//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchData = async (fetchOptions:any) => {
//       setIsPending(true);

//       try {
//         const res = await fetch(url, {...FetchOptions, signal :controller.signal});
//         if (!res.ok) {
//           throw new Error(res.statusText);
//         }
//         const result = await res.json();
//         setIsPending(false);
//         setData(result);
//         setError(null);
//       } catch (err) {
//         if (err instanceof Error && err.name === "AbortError") { // Type assertion
//             console.log("The fetch was aborted");
//           } else {
//             setIsPending(false);
//             setError("Could not fetch data");
//         }
//       }
//     };
// if(method ==="GET"){
//     fetchData()
// }
// if(method ==="POST" && options){
//     fetchData(options)

// }

//     return () => {
//       controller.abort();
//     };
//   }, [url,options,method]);

//   return { data, isPending, error ,postData};
// };





// import { useState, useEffect } from "react";

// interface FetchOptions {
//   method: string;
//   headers: { [key: string]: string };
//   body: any;
//   signal?: AbortSignal;
// }

// export const useFetch = (url: string, method = "GET") => {
//   const [data, setData] = useState<any>(null);
//   const [isPending, setIsPending] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [options, setOptions] = useState<FetchOptions | null>(null);

//   const postData = (postData: any) => {
//     setOptions({
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(postData),
//     });
//     fetchData(options);

//   };

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchData = async (fetchOptions: FetchOptions | null) => {
//       setIsPending(true);

//       try {
//         const res = await fetch(url, {
//           method: fetchOptions?.method || "GET",
//           headers: fetchOptions?.headers || {},
//           body: fetchOptions?.body || undefined,
//           signal: fetchOptions?.signal || undefined,
//         });

//         if (!res.ok) {
//           throw new Error(res.statusText);
//         }

//         const result = await res.json();
//         setIsPending(false);
//         setData(result); 
//         setError(null);
//       } catch (err) {
//         if (err instanceof Error && err.name === "AbortError") {
//           console.log("The fetch was aborted");
//         } else {
//           setIsPending(false);
//           setError("Could not fetch data");
//         }
//       }
//     };

//     if (method === "GET") {
//       fetchData(null);
//     }

//     if (method === "POST" && options) {
//       fetchData(options);
//     }

//     return () => {
//       controller.abort();
//     };
//   }, [url, options, method]);

//   return { data, isPending, error, postData };
// };

import { useState, useEffect } from "react";

interface FetchOptions {
  method: string;
  headers: { [key: string]: string };
  body: any;
  signal?: AbortSignal;
}

export const useFetch = (url: string, method = "GET") => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<FetchOptions | null>(null);

  const fetchData = async (fetchOptions: FetchOptions | null) => {
    setIsPending(true);

    try {
      const res = await fetch(url, {
        method: fetchOptions?.method || "GET",
        headers: fetchOptions?.headers || {},
        body: fetchOptions?.body || undefined,
        signal: fetchOptions?.signal || undefined,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const result = await res.json();
      setIsPending(false);
      setData(result);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("The fetch was aborted");
      } else {
        setIsPending(false);
        setError("Could not fetch data");
      }
    }
  };
  const postData = (postData: any) => {
    const postOptions: FetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
  
    setOptions(postOptions);
  
    // Call fetchData with the new postOptions
    fetchData(postOptions);
  };
  
  useEffect(() => {
    const controller = new AbortController();

    if (method === "GET") {
      fetchData(null);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
};
