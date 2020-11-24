import React, { PureComponent } from 'react';
import styled from 'styled-components';

class Registration extends PureComponent {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        let {
            login,
            password,
            fullName,
            role,
            changeHandler,
            signIn
        } = this.props;

        return(
            <Container>
                <Login value={login} onChange={(e) => changeHandler(e.target.value, "regLogin")} placeholder="Введите логин..."/>
                <Password value={password} onChange={(e) => changeHandler(e.target.value, "regPassword")} placeholder="Введите пароль..."/>
                <FullName value={fullName} onChange={(e) => changeHandler(e.target.value, "regFullName")} placeholder="Введите ФИО..."/>
                <Roles value={role} onChange={(e) => changeHandler(e.target.value, "regRole")} placeholder="Выберите роль на портале...">
                    <Role value={"ADMIN"}>Администратор</Role>
                    <Role value={"STUDENT"}>Студент</Role>
                </Roles>
                <Buttons>
                    <SignIn onClick={signIn}/>
                    <ForgotPassword />
                </Buttons>
            </Container>
        )
    }
}

export default Registration;

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

const FullName = styled.input`
    width: 50%;
    height: 15px;

    margin-top: 10px;

    line-height: 10px;
    padding: 2px;

    @media (max-width: 1200px) {
        width: 70%;
    }
`;

const Roles = styled.select`
    width: 50%;
    height: 25px;

    margin-top: 10px;

    line-height: 10px;

    @media (max-width: 1200px) {
        width: 70%;
    }
`;

const Role = styled.option`
    width: 100%;
    height: 15px;

    line-height: 10px;
    padding: 2px;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const Buttons = styled.div`
    width: 60%;
    height: 25px;

    margin-top: 120px;

    display: flex;
    flex-direction: row;

    @media (max-width: 1200px) {
        width: 80%;
        margin-top: 30px;
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