import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import {InputBlock} from '../../../ui/elements/input-block'
import {SelectBlock} from '../../../ui/elements/select-block'
import {StatementsTypesAdmin} from '../../../ui/content/statements/statements-types'

import {useDispatch} from 'react-redux'

const ModalWrapper = styled.div`
    display: ${({isShow}) => isShow ? 'flex !important' : 'none'};
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    position: fixed;

    background: rgba(0, 0, 0, 0.5);
`

const ModalContainer = styled.div`
    width: ${({width}) => width};
    min-height: 600px;

    background: white;

    position: relative;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`

const ModalTitle = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 30px;
    font-size: 24px;
    color: black;

    border-bottom: 1px solid rgba(100, 100, 100, 0.5);
`

const ModalBody = styled.div`
    width: 100%;

    position: absolute;
    top: 50px;
    bottom: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const ModalFooter = styled.div`
    width: 100%;
    height: 50px;

    position: absolute;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: wrap;
`

const AddButton = styled.div`
    width: 150px;
    height: 45px;

    background: ${({theme}) => theme.colors.mainColorPrimary};
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 30px;
    font-size: 16px;
    color: white;

    cursor: pointer;
`

const CancelButton = styled.div`
    width: 150px;
    height: 45px;

    background: ${({theme}) => theme.colors.mainColorError};
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 30px;
    font-size: 16px;
    color: white;

    cursor: pointer;
`

export const CreateStatementModal = ({isShow, onClose, width, height}) => {
    const [type, setType] = useState('')
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

    const handleChangeType = (event) => {
        setType(event.target.value)
    }

    return (
        <ModalWrapper
            isShow={isShow}
            onHide={onClose}
        >
            <ModalContainer
                width={width}
                height={height}
            >
                <ModalTitle>
                    Создание заявки
                </ModalTitle>
                <ModalBody>
                    <SelectBlock
                        label={'Тип заявки'}
                        placeholder={'Выберите тип'}
                        value={type}
                        onChange={handleChangeType}
                        width={"250px"}
                        data={StatementsTypesAdmin}
                    />
                    { type === 'Регистрация' &&
                        <>
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
                        </>
                    }
                </ModalBody>
                <ModalFooter>
                    <AddButton>
                        Создать заявку
                    </AddButton>
                    <CancelButton onClick={onClose}>
                        Отменить
                    </CancelButton>
                </ModalFooter>
            </ModalContainer>
        </ModalWrapper>
    )
}