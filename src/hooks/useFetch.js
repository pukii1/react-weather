import {useState, useEffect} from "react";
const useFetch = (url)=>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        fetch(url)
        .then((res)=>{
            //if data fetching failed throw error + error message
            if(!res.ok){
                throw new Error("Error occurred trying to fetch the data");
            }
            //if fetching succeeded -> return json of response
            return res.json()
        })
        .then((data)=>{
            //set data and indicate that loading process is over
            setData(data);
            setLoading(false);
        })
        //catch potentially thrown error from callback of first then function
        .catch((err)=>{
            setError(err.message);
        })
    }
    //rerun useEffect callback when url changes
    ,[url]);
}
export default useFetch;