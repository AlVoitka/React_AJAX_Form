import axios from "axios";
import { Component } from "react";
import InputMask from "react-input-mask";




class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            tel: '',
            text: '',
            focus: false,
            blur: false,
            post: false,
            postErr: false
        }
    }

    resetForm = () => {
        this.setState({
            ...this.state,
            name: '',
            email: '',
            tel: '',
            text: ''
        })
     }

    onValueChange = (e) => {
       this.setState({
            [e.target.name] : e.target.value
        })
    }

    onValueChangeName = (e) => {
       this.setState({
            [e.target.name] : e.target.value.toUpperCase()
        })
    }

   

    onFocusChange = (e) => {
        console.log('focus')
        this.setState({
            focus : true
        })
    }
    onBlurChange = (e) => {
        console.log('blur')
        this.setState({
            blur : true
        })
    }

    onPostData = (e) => {
        e.preventDefault();
        console.log("Ушел")

    // --------------- Send by object  XMLHttpRequest  ---------------------

        // const request = new XMLHttpRequest();

        // request.open('POST','https://jsonplaceholder.typicode.com/posts');
        // request.setRequestHeader('Content-type', 'application/json;', 'charset=utf-8');
        // request.send(this.state);
        // console.log(request.readyState);

        // request.addEventListener('load', ()=> {
        //     if (request.status === 201) {
        //         console.log('ok')
        //     } else {
        //         console.log('Error')
        //     }
        // })

// ---------------------- Send by method fetch() ------------------

        // fetch('https://jsonplaceholder.typicode.com/posts', {
        //     method: "POST",
        //     body: JSON.stringify(this.state),
        //     headers: {
        //         'Content-type': 'application/json'
        // }
        // })
        //     .then( response => response.json())
        //     .then(json => console.log(json));
        

    
// -------------------Send by package axios ------------------------------------

        axios.get('https://fortnite-api.com/v1/map').then(respons => {
            console.log(respons.data.status)
        })

        axios.post('https://jsonplaceholder.typicode.com/posts', { userId: 'Alex', title: 'Test', body: this.state})
        .then(respons => {
            console.log(respons)
            if (respons.status === 201 ) {
                this.setState({
                    post: true
                })
                this.resetForm();
            } 
        })
        .catch(() => {
            this.setState({
                postErr: true
            })
        })

    }

    render() {

        const {name, email, tel, text, focus, blur, post, postErr} = this.state;

        // const errorName =  name.length < 3 && focus && !/^[a-zA-Z]+$/i.test(name),
        const errorName =  name.length < 3 && blur && !/^[a-zA-Z]+$/i.test(name),
              errorEmail = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) && blur,
              erroreText = text.length < 10  && blur,
              erroreTel = !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i.test(tel) 
                            && blur && tel.length < 10


        return (
            <form className="form"
                onSubmit={this.onPostData}>
                <h2>Форма обратной связи</h2>
    
                <label htmlFor="name">Имя Фамилия</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={this.onValueChangeName}
                    onFocus={this.onFocusChange}
                    onBlur={this.onBlurChange}
                />
                { errorName ? <div className='error'>Введите от 3 до 20 симаолов!</div> : null}
    
                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.onValueChange}
                    onFocus={this.onFocusChange}
                    onBlur={this.onBlurChange}
                />
                { errorEmail ? <div className='error'>Введите корректный email адрес!</div> : null}
    
                <label htmlFor="phone">Номер телефона</label>
                <InputMask 
                        id='tel'
                        name="tel" 
                        mask="+7(999)999-99-99" 
                        onChange={this.props.onChange}
                        value={this.props.value} 
                        alwaysShowMask={true}
                        onInput={this.onValueChange}
                        onFocus={this.onFocusChange}
                        onBlur={this.onBlurChange}/>
                { erroreTel ? <div className='error'>Введите корректный номер!</div> : null}
    
                <label htmlFor="date">Дата рождения</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                />
    
                <label htmlFor="text">Сообщение</label>
                <textarea 
                    id="text"
                    name="text"
                    value={text}
                    onChange={this.onValueChange}
                    onFocus={this.onFocusChange}
                    onBlur={this.onBlurChange}
                />
                { erroreText ? <div className='error'>Более 10 символов</div> : null}
            
                <button type="submit"
                        name="submit">
                    Отправить
                </button>
                { post ? <div className='error'>Succse</div> : null}
                { postErr ? <div className='error'>Error!!!</div> : null}
            </form>
        )
    }
}

export default Form;