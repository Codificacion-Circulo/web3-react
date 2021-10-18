import Modal from './ErrorModal';
import classes from './DisplayModal.module.css';
const Card = (props) => {
  return (
    <Modal onClose={props.onClose}>
       <h4 className={classes.Head}>{props.title}</h4>
      <div className={classes.total}>
       <h1>{props.msg}</h1>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};
export default Card;

