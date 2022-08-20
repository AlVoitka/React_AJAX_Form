import './app.scss';
import {useEffect, useState} from 'react'; 


const FormTest1 = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)

    const [emailError, setEmailError] = useState('email is not correct')
    const [passwordError, setPasswordError] = useState('possword is not correct')

    const [formValid, setFormValid] = useState(false)
    

    useEffect(()=> {
        if(emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])



    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!re.test(String(e.target.value).toLocaleLowerCase())) {
            setEmailError("Please enter a valid email")
        } else {
            setEmailError('')
        }  
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError('3-8 symbol')
            if (!e.target.value) {
                setPasswordError('Not empty')
            }
        } else {
            setPasswordError('')
        }
    }


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password': 
                setPasswordDirty(true)
                break
        }       
    }


    return (
        
        <form className="form" >
           
            <h2>Registracion</h2>

            <input
                name="email"
                type="text"
                placeholder='Enter your email ...'
                value={email}
                onBlur={e => blurHandler(e)} 
                
                onChange={e => emailHandler(e)}   
            />
            {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}

            <input
                name="password"
                type="password"
                placeholder='Enter your password ...'
                value={password}
                onBlur={e => blurHandler(e)}
                onChange={e => passwordHandler(e)}
            />
            {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}

            <button 
                disabled={!formValid}
                type="submit"
            >
                {formValid ? <div>Sing in</div> : <div>Fill form</div>}
            </button>
           
        </form>
    )

}

export default FormTest1;