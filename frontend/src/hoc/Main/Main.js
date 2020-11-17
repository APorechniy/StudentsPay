import React, { PureComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Components
import Authorization from '../Authorization/Authorization';

class Main extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'AUTH',
            authLogin: '',
            authPassword: '',
        }
    }

    changeAuthForm = (val, field) => {
        this.setState({
            [field]: val,
        })
    }

    changeActiveTab = (v) => {
        this.setState({
            activeTab: v,
        })
    }

    signIn = () => {
        let {
            authLogin,
            authPassword
        } = this.state;

        console.log(this.state)

        axios.post('http://localhost:5000/signin',
            {
                body: {
                    login: authLogin,
                    password: authPassword
                }
            }
        ).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        let { activeTab, authLogin, authPassword } = this.state;
        console.log(authLogin)
        return (
            <Container>
                <FormWrap>
                    <FormHeader>
                        <TabItem active={activeTab === "AUTH"} onClick={(e) => this.changeActiveTab('AUTH')}>
                            Авторизация
                        </TabItem>
                        <TabItem active={activeTab === "SIGNUP"} onClick={(e) => this.changeActiveTab('SIGNUP')}>
                            Регистрация
                        </TabItem>
                    </FormHeader>

                    <FormBody>
                        { 
                            (activeTab === 'AUTH') ? 
                            <Authorization login={authLogin} password={authPassword} changeHandler={this.changeAuthForm} signIn={this.signIn}/> : <div></div>
                        }
                    </FormBody>
                </FormWrap>
            </Container>
        )
    }
}

export default Main;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormWrap = styled.div`
    width: 35%;
    height: 40%;

    border-radius: 15px;
    box-shadow: 0 0 5px 2px rgba(122,122,122,0.5);
`;

const FormHeader = styled.div`
    width: 100%;
    height: calc(20% + 2px);
    border-bottom: 2px solid #e8e7e6;

    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const FormBody = styled.div`
    width: 100%;
    height: calc(80% - 2px);

    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const TabItem = styled.div`
    flex-basis: 35%;
    height: 100%;
    margin-bottom: -2px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: ${(props) => props.active ? '2px solid #fc9700' : 'none'};
    cursor: pointer;
`;

