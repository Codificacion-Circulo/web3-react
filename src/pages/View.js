import {Fragment,useState, useEffect} from 'react';
import Card from '../components/Card'
import classes from './View.module.css'
import { lock_addr,lock_abi } from "../lib/config";
import Web3 from 'web3'
import LoadingSpinner from '../components/LoadingSpinner';
import DisplayModal from '../components/DisplayModal'


var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const View =props => {

  const [blog,setBlogs]=useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);


  const fetchBlogs=async()=>{
    setLoading(true);
    setError(null);
      try{
        const web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
        const lock=new web3.eth.Contract(lock_abi,lock_addr)
        let array=[]
        const total=await lock.methods.blogCounter().call()
        for(let i=0; i<total; i++){
          let blogg=await lock.methods.blogs(i).call()
          const response = await fetch(blogg, requestOptions);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          const transformed={
            id:i,
            title: data.title,
            author: data.author,
            text: data.text.replace(/<[^>]+>/g, '')
          }
          array.push(transformed)
        }
        const listItems=array.reverse().map((log)=>{
          return (<Card key={log.id} id={log.id} title={log.title} author={log.author} text={log.text.substring(0,100)}/>);
        })
        setBlogs(listItems)
      }catch(error){
        setError({
          title:"Error !",
          msg:"Something went wrong !"
        });
      }
      setLoading(false)
    
  };
  useEffect(() => {
    fetchBlogs();
    return function cleanup() {
      fetchBlogs();
  }
  },[])


  const modalChangeHandler = () => {
    setError(null)
  };
  
      
    return (
      <Fragment>
       {error&& <DisplayModal onClose={modalChangeHandler} title={error.title} msg={error.msg}/>}
      {loading&& <LoadingSpinner/>}
        <section className={classes.info}>
        <div className={classes.heading}>
            <h1>Articles</h1>
        </div>
      <div className={classes.cards_wrapper}>
        <div className={classes.card_grid_space}>
       {blog}
        </div>
        </div>
    </section>
    </Fragment>
    );
};

export default View;