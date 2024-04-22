import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const {singUp} = props
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [idError, setIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  let data = {}
  const navigate = useNavigate()
  const onButtonClickSingup = () => {
  navigate("/singup")}
  const onButtonClickLogin = () => {
       
        setIdError('')
        setPasswordError('')
      
       
        if ('' === id) {
          setIdError('Please enter your email or username')
          return
        }
      
        if ('' === password) {
          setPasswordError('Please enter a password')
          return
        }
        data = {"identifier": id,
        "password": password}

        fetch("http://localhost:8080/Api/Auth/login", {
          method: "POST",
          mode: 'cors',
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((result) => {
            if(result.status === 'ACCEPTED'){
              alert('You are logged in.');
              localStorage.setItem("user", id);
              props.setId(id)
              props.setLoggedIn(true);
              navigate('/')
              console.log(result);
             } else {
                 alert('Please check your login information.');
                 console.log(result);
             }
          })
          .catch((err) => {
            console.log(err);
          });      

  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={id}
          placeholder="Enter your email or username here"
          type="email"
          onChange={(ev) => setId(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{idError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          type="password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClickLogin} value={'Log in'} />
      </div>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClickSingup} value={'Sing Up'} />
      </div>
      {singUp ? <div>Account Created</div> : <div />}
    </div>
  )
}

export default Login