import { useState, useRef,useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom';

const AuthForm = () => {
  const history=useHistory();
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false);
  
  const authCtx=useContext(AuthContext);
  //console.log('isLoggedIn(AuthForm)',authCtx.isLoggedIn);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
      event.preventDefault();
    console.log('submit');
    const enteredEmail=emailInputRef.current.value;
    console.log(enteredEmail);
    const enteredPassword=passwordInputRef.current.value;
    //optional: Add validation
    console.log(enteredPassword);
    setIsLoading(true);
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAwK4k_DJN45d8bjQFpZk-MsnTCfd2lUE'
    }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAwK4k_DJN45d8bjQFpZk-MsnTCfd2lUE'
    }

    fetch(url,{
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
         
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((res)=>{
        setIsLoading(false);
        if(res.ok){
          //alert('sucessful');
          return res.json();
        }else{
          return res.json().then((data) =>{
            let errorMessage='Authentication failed';
            //show an error modal
            console.log(data);
            throw new Error(errorMessage);
          })
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        authCtx.login(true);
        history.replace('/');
      })
      .catch(err =>{
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
        <button>{isLogin ?'Login' :'Create new Login'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
           
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
