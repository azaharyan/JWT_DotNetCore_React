import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import './Login.css'
import client from '../httpClient'

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: {
                value: ''
            }, 
            password: {
                value: ''
            }
        }
    }

    handleInputChange = (event, inputIdentifier) => {

        const updateForm = { ...this.state }
        const updateElement = { ...updateForm[inputIdentifier] }

        updateElement.value = event.target.value
        updateForm[inputIdentifier] = updateElement
        this.setState(updateForm)
    }

    postLogin = event => {
        event.preventDefault()

        let formData = {
            email: this.state.email.value,
            password: this.state.password.value
        }

        axios.post('/api/registration/Login', formData)
            .then((resp) => {
                localStorage.setItem('user', JSON.stringify(resp.data))

                client.setTokenOnLogin()
            })
            .catch((resp) => {
                console.log('Fail')
            })

    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.postLogin} className='LoginForm'>
                    <div>
                        <TextField inputProps={{ className: 'input-text' }} label='Email'
                            value={this.state.email.value}
                            onChange={(event) => this.handleInputChange(event, 'email')} />
                    </div>
                    <div>
                        <TextField type='password' inputProps={{ className: 'input-text' }} label='Парола'
                            value={this.state.password.value}
                            onChange={(event) => this.handleInputChange(event, 'password')} />
                    </div>
                    <Button type='submit' variant="contained" color="primary" className='loginButton' onClick={(event) => this.postLogin(event)}>
                        Login
                        </Button>
                </form>
            </div>
            )

    }
}