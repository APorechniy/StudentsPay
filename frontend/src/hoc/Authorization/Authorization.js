import React, { PureComponent } from 'react';
import styled from 'styled-components';

class Authorization extends PureComponent {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        let {
            login,
            password,
            changeHandler,
            signIn
        } = this.props;

        return(
            <Container>
                <Login value={login} onChange={(e) => changeHandler(e.target.value, "authLogin")} placeholder="Введите логин..."/>
                <Password value={password} onChange={(e) => changeHandler(e.target.value, "authPassword")} placeholder="Введите пароль..."/>
                <Buttons>
                    <SignIn onClick={signIn}/>
                    <ForgotPassword />
                </Buttons>
            </Container>
        )
    }
}

export default Authorization;

const Container = styled.div`
    width: 100%;
    height: 100%;

    padding: 10px;
    margin-top: 2px; 

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Login = styled.input`
    width: 50%;
    height: 15px;

    margin-top: 50px;

    line-height: 10px;
    padding: 2px;
    @media (max-width: 1200px) {
        width: 70%;
    }
`;

const Password = styled.input`
    width: 50%;
    height: 15px;

    margin-top: 10px;

    line-height: 10px;
    padding: 2px;

    @media (max-width: 1200px) {
        width: 70%;
    }
`;

const Buttons = styled.div`
    width: 60%;
    height: 25px;

    margin-top: 50px;

    display: flex;
    flex-direction: row;

    @media (max-width: 1200px) {
        width: 80%;
    }
`;

const SignIn = styled.button`
    width: 50%;
    height: 35px;

    border-radius: 0;
    border: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    background: #02c93b;
    color: white;
    cursor: pointer;

    ::before {
        content: 'Войти';
    }

    :active {
        border: none;
    }
`;

const ForgotPassword = styled.button`
    width: 50%;
    height: 35px;

    border-radius: 0;
    border: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    background: #ff004d;
    color: white;
    cursor: pointer;

    ::before {
        content: 'Забыли пароль?';
        word-wrap: normal;
    }

    :active {
        border: none;
    }
`;