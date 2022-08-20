
import './app.scss';
import {useEffect, useState} from 'react'; 



const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)

    useEffect(() => {

        for (const validation in validations) {

            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
    
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
            }
        }
        
    }, [value])

    return {
        isEmpty,
        minLengthError
    }
}


const useInput = (initialValue, validations) => {

    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}




const CustomHookForm = () => {

    const email = useInput('', {isEmpty: true, minLength: 3})
    const password = useInput('', {isEmpty: true, minLength: 5})

    return (
        
        <form className="form" >
           
            <h2>Registracion</h2>

            <input
                name="email"
                type="text"
                placeholder='Enter your email ...'
                value={email.value}
                onChange={e => email.onChange(e)}
                onBlur={e => email.onBlur(e)}
            />
            {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
            {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}> более 3 символов</div>}

            <input
                name="password"
                type="password"
                placeholder='Enter your password ...'
                value={password.value}
                onChange={e => password.onChange(e)}
                onBlur={e => password.onBlur(e)}
            />
            {(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
            {(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>более 5 символов</div>}

            <button 
                type="submit"
            >
                Sing in
            </button>
           
        </form>
    )

}

export default CustomHookForm;