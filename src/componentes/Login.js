import React, { Component } from 'react';
import {browserHistory} from 'react-router';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {msg: ''};
    }

    envia(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({login: this.login.value, senha: this.senha.value}),
            headers: new Headers({
                'Content-type':'aplication/json'
            })
        };

        fetch('https://instalura-api.herokuapp.com/api/login', requestInfo)
        .then(response => {
            if (response.ok) {
                return response.text();
            }else {
                throw new Error('Não foi possível efetuar o login')
            }
        })
        .then(token => {
            localStorage.setItem('auth-token', token);
           browserHistory.push('/timeline');      
        })
        .catch(error => {
            this.setState({msg: error.message});
        })
    }

    render() {
        return(
            <div className="login-box">
               <h1 className="header-logo">Instalura</h1>
               <span>{this.state.msg}</span>
               <form onSubmit={this.envia.bind(this)}> 
                <input type="text" ref={(input) => this.login = input}/>
                <input type="password" ref={(input) => this.senha = input}/>
                <input type="submit" value="login"/>
            </form>
        </div>
        );
    }

}