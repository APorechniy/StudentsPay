import React, { useEffect } from 'react'
import styled from 'styled-components'

import {useDispatch, useSelector} from 'react-redux'

import {DashboardSidebar} from '../components/navigation'

import {getUsersList} from '../modules/users'
import {compiledRoutes} from '../routes'

const Container = styled.div`
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-wrap: nowrap;
`

const Users = () => {
    const {userInfo} = useSelector(({auth}) => auth)
    const {usersList} = useSelector(({users}) => users)
    const dispatch = useDispatch()

    useEffect(() => {
        const getUsers = async () => {
            await dispatch(getUsersList())
        }

        if(Object.keys(userInfo).length <= 0){
            compiledRoutes.index.goThroughClient()
        }

        getUsers()
    }, [])
    console.log(usersList)
    return (
        <Container>
            <DashboardSidebar/>
        </Container>
    )
}

export default Users