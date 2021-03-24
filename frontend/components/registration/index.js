import React, {useState} from 'react'

import styled from 'styled-components'

import {registration} from '../../modules/auth'

import {InputBlock} from '../../ui/elements/input-block'
import {SelectBlock} from '../../ui/elements/select-block'

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
    height: 580px;

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
    width: 220px;
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
    margin-top: ${({theme}) => theme.space.x2};

    color: white;

    text-align: center;
`

const SwapFormText = styled.p`
    color: ${({theme}) => theme.colors.mainColorPrimary};

    cursor: pointer;
`

export const Registration = ({changeTab}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('')

    const dispatch = useDispatch()

    const handleChangeLogin = (event) => {
        setLogin(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeRole = (event) => {
        setRole(event.target.value)
    }

    const regUser = async () => {
        const response = await dispatch(registration({name, role, login, password}))
        if(response === 200){
            compiledRoutes.dashboard.goThroughClient()
        }
    }

    return (
        <Container>
            <FormBlock>
                <Title>Регистрация</Title>
                <InputBlock
                    label={'ФИО'}
                    placeholder={'Введите ФИО'}
                    value={name}
                    onChange={handleChangeName}
                    width={"250px"}
                    type={'text'}
                />
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
                <SelectBlock
                    label={'Роль на портале'}
                    placeholder={'Выберите роль'}
                    value={role}
                    onChange={handleChangeRole}
                    width={"250px"}
                    data={[{
                        value: "student",
                        label: 'Студент'
                    }, {
                        value: "admin",
                        label: 'Администратор'
                    }, {
                        value: "teacher",
                        label: 'Преподаватель'
                    }]}/>
                <SwapFormBlock>
                    Уже есть аккаунт?
                    <SwapFormText onClick={changeTab}>
                        Войдите!
                    </SwapFormText>
                </SwapFormBlock>
                <Button onClick={regUser}>
                    Зарегистрироваться
                </Button>
            </FormBlock>
        </Container>
    )
}