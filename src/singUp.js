import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SingUp = (props) => {
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  let data = {}
  const navigate = useNavigate()

  const onButtonClick = () => {
        
        
        setUsernameError('')
        setEmailError('')
        setPasswordError('')
      
        // username conditions
        if ('' === username) {
            setUsernameError('Please enter your username')
          return
        }

        if (!/(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{4,16}$/.test(username)) {
        setUsernameError('Please enter a valid username')
        return
        }

        //email conditions
        if ('' === email) {
            setEmailError('Please enter your email')
            return
          }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          setEmailError('Please enter a valid email')
          return
        }
      
        //password conditions
        if ('' === password) {
          setPasswordError('Please enter a password')
          return
        }
      
        if (password.length < 7) {
          setPasswordError('The password must be 8 characters or longer')
          return
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\~-]).{4,32}$/.test(password)) {
            setPasswordError('Please enter a valid password with at least one uppercase, one lowercase, one digit, and one special character with length of 3 characters minumun and 32 characters maximum')
            return
        }
        data = {"username": username,
        "email":email,
        "password": password}
        
        fetch("http://localhost:8080/Api/Auth/register", {
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
            if(result.status === 'CREATED'){
              alert('Account Created');
              props.setSingUp(true);
              navigate('/login')
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
        <div>Sing Up</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          type="email"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
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
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sing Up'} />
      </div>
    </div>
  )
}

export default SingUp