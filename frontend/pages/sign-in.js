import React, {useState} from 'react'
import styled from 'styled-components'

import {Auth} from '../components/authorization'
import {Registration} from '../components/registration'

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`

const Landing = () => {
    const [currentTab, setCurrentTab] = useState('auth')

    const handleChangeTab = (key) => {
        setCurrentTab(key)
    }

    return (
    <Container>
        {currentTab === 'auth' &&
            <Auth changeTab={() => handleChangeTab('reg')}/>
        }
        {currentTab === 'reg' &&
            <Registration changeTab={() => handleChangeTab('auth')}/>
        }
    </Container>
    )
}

export default Landing