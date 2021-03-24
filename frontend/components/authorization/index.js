import React, {useState} from 'react'

import styled from 'styled-components'

import {auth} from '../../modules/auth'

import {InputBlock} from '../../ui/elements/input-block'

import {useDispatch} from 'react-redux'
import { compiledRoutes } from '../../routes'

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const FormBlock = styled.div`
    width: 500px;
    height: 500px;

    border-radius: 5px;

    display: flex;
    align-items: center;
    flex-direction: column;

    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    padding: ${({theme}) => theme.space.x2};
    background: rgba(200, 200, 200, 0.95);
`

const Title = styled.div`
    width: 100%;
    height: 30px;

    font-size: 26px;
    text-align: center;

    margin: ${({theme}) => theme.space.x2};
    color: white;
`

const Button = styled.div`
    width: 200px;
    height: 40px;

    font-weight: bold;
    font-size: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: auto;
    background: ${({theme}) => theme.colors.mainColorPrimary};
    color: white;

    cursor: pointer;
`

const SwapFormBlock = styled.div`
    width: 100%;

    color: white;

    text-align: center;
    margin-top: ${({theme}) => theme.space.x2};
`

const SwapFormText = styled.p`
    color: ${({theme}) => theme.colors.mainColorPrimary};

    cursor: pointer;
`

export const Auth = ({changeTab}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleChangeLogin = (event) => {
        setLogin(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const loginUser = async () => {
        const response = await dispatch(auth({login, password}))
        if(response === 200) {
            compiledRoutes.dashboard.goThroughClient()
        }
    }

    return (
        <Container>
            <FormBlock>
                <Title>Авторизация</Title>
                <InputBlock
                    label={'Логин'}
                    placeholder={'Введите логин'}
                    value={login}
                    onChange={handleChangeLogin}
                    width={"250px"}
                    type={'text'}
                />
                <InputBlock
                    label={'Пароль'}
                    placeholder={'Введите пароль'}
                    value={password}
                    onChange={handleChangePassword}
                    width={"250px"}
                    type={'password'}
                />
                <SwapFormBlock>
                    Ещё нет аккаунта?
                    <SwapFormText onClick={changeTab}>
                        Зарегистрируйтесь!
                    </SwapFormText>
                </SwapFormBlock>
                <Button onClick={loginUser}>
                    Войти
                </Button>
            </FormBlock>
        </Container>
    )
}