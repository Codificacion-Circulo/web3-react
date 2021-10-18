import {Fragment, useState,useEffect} from 'react';
import { create } from 'ipfs-http-client';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LoadingSpinner from "../components/LoadingSpinner";
import Web3 from 'web3'
import './Create.css'
import { Link } from 'react-router-dom';
import { lock_addr,lock_abi } from "../lib/config";
import DisplayModal from '../components/DisplayModal'
const client = create('https://ipfs.infura.io:5001/api/v0')

const Create = props => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [modal,setModal] = useState(null);
    const [account, setAccount] = useState('');
    const [lockk,setLockk] = useState({})



    const loadBlockhainData=async()=>{
        const web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
        const accounts=await web3.eth.getAccounts()
        setAccount(accounts[0])
        const lock=new web3.eth.Contract(lock_abi,lock_addr)
        setLockk(lock)
      };
      useEffect(() => {
        loadBlockhainData();
        return function cleanup() {
            loadBlockhainData();
        }
      }, [account])



  
    const formSubmission=async (e)=>{
        e.preventDefault();
        if (text.trim().length === 0 || author.trim().length === 0 || title.trim().length === 0) {
            return;
        }
        try {
            setLoading(true);
            const doc = JSON.stringify({
                title,author,text,
              });
            const added = await client.add(doc);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            const recipt=await lockk.methods.inputlink(url).send({from:account})
            console.log(recipt);
            setError({
                title:"Success !",
                msg:"Article uploaded successfully !"
              });
          } catch (error) {
            setError({
                title:"Error !",
                msg:"Something went wrong !"
              });
          }  
          setModal(true)
        setTitle('');
        setAuthor('');
        setText('')
        setLoading(false)
    }

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }


    const authorChangeHandler = (event) => {
        setAuthor(event.target.value);
    }

    const textChangeHandler = (event, editor) => {
        const data = editor.getData();
        setText(data);
    }
    const modalChangeHandler = () => {
        setModal(false);
        setError(null)
      };
          
    return (
        <Fragment>
        {loading&&<LoadingSpinner/>}
        {modal&& <DisplayModal onClose={modalChangeHandler} title={error.title} msg={error.msg}/>}
        <div className="write__container">
            <form onSubmit={formSubmission}>
                <div className="row">
                    <h2 className="details">Details</h2>
                    <div className="input_field authtitle">
                        <input type="text" id="title" name="title" placeholder="Title" required={true} onChange={titleChangeHandler} value={title} />
                        <input type="text" id="author" name="author" placeholder="Author" required={true} onChange={authorChangeHandler} value={author} />
                    </div>
                </div>
                <div className="row">
                    <div className="input_field">
                        <h1>Ink your Opinion</h1>
                        <CKEditor
                            editor={ClassicEditor}
                            data={text}
                            onChange={textChangeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                {account ?  <input type="submit" value="Submit" className="btn"></input> : <span>Not connected</span>}
                    <Link to="/" className="btn">Cancel</Link>
                </div>
            </form>
        </div>
        </Fragment>
    );
};
export default Create;