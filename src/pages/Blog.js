import {Fragment,useCallback,useEffect,useState} from 'react';
import LoadingSpinner from '../components/LoadingSpinner'
import {useParams} from 'react-router-dom'
import classes from  './Blog.module.css'
import { lock_addr,lock_abi } from "../lib/config";
import Web3 from 'web3'
import parse from 'html-react-parser';
import DisplayModal from '../components/DisplayModal'

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
const Blog = props => {
  let params = useParams()
  const [blog,setBlogs]=useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  
  
  

    const fetchBlogs=useCallback(async()=>{
      setLoading(true);
      setError(null);
        try{
          const web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
          const lock=new web3.eth.Contract(lock_abi,lock_addr)
          const total=await lock.methods.blogs(params.id).call()
          const response = await fetch(total, requestOptions);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          setBlogs(data)
        }catch(error){
          setError({
            title:"Error !",
            msg:"Something went wrong !"
          });
        }
        setLoading(false)
      
    },[params.id]);
  useEffect(() => {
      fetchBlogs();
  }, [fetchBlogs])

  const modalChangeHandler = () => {
    setError(null)
  };
      


    return (
      <Fragment>
      {loading && <LoadingSpinner/>}
      {error&& <DisplayModal onClose={modalChangeHandler} title={error.title} msg={error.msg}/>}
        <section className={classes.home}>
            <div className={classes.title}>
                <h1>{blog.title}</h1>
            </div>
        <div className={classes.content}>
        {parse(`${blog.text}`)}
        </div>
        <div className={classes.author}>
        <p><span>Author: </span>{blog.author}</p>
        </div>

        
    </section>
    </Fragment>
    );
};

export default Blog;