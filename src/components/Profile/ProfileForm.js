import { useRef,useContext} from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef=useRef();
  const authCtx=useContext(AuthContext);

 const submitHandler=event=>{
    event.preventDefault();
 
    const enteredNewPassword=newPasswordInputRef.current.value;
    console.log(enteredNewPassword)

    //add validation
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBAwK4k_DJN45d8bjQFpZk-MsnTCfd2lUE',{
         method: 'POST',
         body: JSON.stringify({
           idToken: authCtx.token,
           password: enteredNewPassword,
           returnSecureToken: false
         }),
         headers: {
           'Content-Type': 'application/json'
         }      
    }).then(res =>{
      //assuption: always sucesseds!
      console.log(res);
    });
 };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={6} ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
