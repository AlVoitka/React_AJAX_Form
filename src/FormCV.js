
import './app.scss';
import {useEffect, useState} from 'react'; 
import InputMask from "react-input-mask";
import axios from "axios";
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';


const FormCV = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [massage, setMassage] = useState('')
    const [post, setPost] = useState(false)


    const [nameDirty, setNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [dateDirty, setDateDirty] = useState(false)
    const [massageDirty, setMassageDirty] = useState(false)
    

    const [nameError, setNameError] = useState('name is not correct')
    const [emailError, setEmailError] = useState('email is not correct')
    const [phoneError, setPhoneError] = useState('Invalid phone number')
    const [dateError, setDateError] = useState('Invalid date')
    const [massageError, setMassageError] = useState('Size must be between 10 and 300')
    // const [postError, setPostErrore] = useState(false)

    const [formValid, setFormValid] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModaErrlOpen, setModalErrOpen] = useState(false);
    
    

    useEffect(()=> {
        if(nameError || emailError || phoneError || dateError || massageError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, emailError, phoneError, dateError, massageError])


    const nameHandler = (e) => {
        setName(e.target.value.toUpperCase())
        const re = /^[a-zA-Z]{3,30}(?: [a-zA-Z]{3,30})$/i;
        const reg = /^[a-zA-Z]{3,30}(?:  +[a-zA-Z]{3,30})$/i;

        if(!re.test(e.target.value)) {
            setNameError("Please enter a valid Name end Surname. Only latin letters!")
            if (e.target.value.length < 3 || e.target.value.length > 30) {
                setNameError('Size Name and Surename must be between 3 and 30 ')
            }
            if (reg.test(e.target.value)) {
                setNameError("One space only!")
            }
            if (!e.target.value) {
                setNameError('Name cannot be empty')
            }
        } else {
            setNameError('')
        }
        
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!re.test(String(e.target.value).toLocaleLowerCase())) {
            setEmailError("Please enter a valid email")
            if (!e.target.value) {
                setEmailError('Email cannot be empty')
            }
        } else {
            setEmailError('')
        }  
    }

    const phoneHandler = (e) => {
        setPhone(e.target.value)
        const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i;

        if (!re.test(e.target.value)) {
            setPhoneError('Invalid phone number.  Expected +7(8--)--- -- --   or   +7(9--)--- -- --')
            if (!e.target.value) {
                setPhoneError('Number phone cannot be empty')
            }
        } else {
            setPhoneError('')
        }
    }

    const dateHandler = (e) => {
        setDate(e.target.value)
        const re = /^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/;

        if (!re.test(e.target.value)) {
            setDateError('Invalid date')
            if (!e.target.value) {
                setDateError('Your massege cannot be empty')
            }
        } else {
            setDateError('')
        }
    }

    const massageHandler = (e) => {
        setMassage(e.target.value)
        if (e.target.value.length < 10 || e.target.value.length > 300) {
            setMassageError('10-300 symbol')
            if (!e.target.value) {
                setMassageError('Your massege cannot be empty')
            }
        } else {
            setMassageError('')
        }
    }

    const focusHandler = (e) => {
        e.target.type="date"
    }

    


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name' :
                setNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'phone': 
                setPhoneDirty(true)
                break
            case 'date': 
                setDateDirty(true)
                break
            case 'massage' :
                setMassageDirty(true)
                break
        }       
    }




    const onPostData = (e) => {
        e.preventDefault()
        console.log("Ушел")

        axios.post('https://jsonplaceholder.typicode.com/posts', { userId: 'Alex', title: 'Test', body: name})
        .then(respons => {
            console.log(respons)
            if (respons.status === 201 ) {
                setPost(true)
                setModalOpen(true)
                resetForm()
                setFormValid(false)
            } 
        })
        .catch(() => {
            setModalErrOpen(true)
        })
    }

    const resetForm = () => {
        setName('')
        setEmail('')
        setPhone('')
        setDate('')
        setMassage('')
    }




    return (

        <>
        <form className="form"
            name='form'
            onSubmit={e => onPostData(e)}
        >
           
            <h2>Feedback form</h2>

            <label htmlFor="name"></label>
            <input
                name="name"
                type="text"
                placeholder='Enter full Name/Surname ...'
                value={name}
                onBlur={e => blurHandler(e)}
                onChange={e => nameHandler(e)}
            />
            {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}

            <label htmlFor="email"></label>
            <input
                name="email"
                type="text"
                placeholder='Enter your email ...'
                value={email}
                onBlur={e => blurHandler(e)} 
                onChange={e => emailHandler(e)}   
            />
            {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}


            <label htmlFor="phone"></label>
                <InputMask 
                    id='phone'
                    name="phone" 
                    value={phone}
                    mask="+7(999)999-99-99" 
                    placeholder='Your phone  +7(___)___-__-__'
                    onBlur={e => blurHandler(e)}
                    onChange={e => phoneHandler(e)}
                />
            {(phoneDirty && phoneError) && <div style={{color: 'red'}}>{phoneError}</div>}

            <label htmlFor="date"></label>
                <input
                    id="date"
                    name="date"
                    type="text"
                    // min="1920-01-01" max="2010-12-31"
                    placeholder="Enter Date of Birth"
                    onFocus={e => focusHandler(e)}
                    value={date}
                    onBlur={e => blurHandler(e)}
                    onChange={e => dateHandler(e)}
                />
            {(dateDirty && dateError) && <div style={{color: 'red'}}>{dateError}</div>}

            <label htmlFor="massage"></label>
                <textarea 
                    id="masage"
                    name="massage"
                    value={massage}
                    placeholder='Enter your massage ...'
                    onBlur={e => blurHandler(e)}
                    onChange={e => massageHandler(e)}
                />
            {(massageDirty && massageError) && <div style={{color: 'red'}}>{massageError}</div>}


            {/* <button 
                disabled={!formValid}
                style={{backgroundColor: 'red', backgroundImage:'none'}}
                type="submit"
            >
                {formValid ? <div>Sing in</div> : <div style={{color: 'red'}}>Fill correct form</div>}
            </button> */}

            { formValid ?   <button 
                            style={{backgroundColor: '#af48eb',  backgroundImage:'none'}}
                            type="submit"
                            >
                                <div>Sing in</div> 
                            </button>

                        : 
                        
                            <button 
                                disabled={!formValid}
                                style={{backgroundColor: '#af48eb', opacity:'0.3', backgroundImage:'none'}}
                                type="submit"
                            >
                                <div>Fill correct form</div>
                            </button> }


            {/* {post ? <div style={{color: 'red'}}>Succse</div> : null } */}
            {/* {postError ? <div style={{color: 'red'}}>Error</div> : null } */}
           
        </form>

        <SuccessModal
        modalOpen={isModalOpen}
        modalClose={() => setModalOpen(false)}
        />

        <ErrorModal
        modalErrOpen={isModaErrlOpen}
        modalErrClose={() => setModalErrOpen(false)}
        />

        </>
    )

}

export default FormCV;