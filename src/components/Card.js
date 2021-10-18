import React from 'react';
import {Link} from 'react-router-dom'
import classes from './Card.module.css'
const Card =props => {
    return (
          <Link to={`/blog/${props.id}`} className={classes.card}>
            <div >
              <h1>{props.title}</h1>
              <p>{props.text}</p>
            </div>
          </Link>
    );
};



export default Card;