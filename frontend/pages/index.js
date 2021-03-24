import React, {useState} from 'react'
import styled from 'styled-components'

import {MainHeader} from '../components/navigation'

import FirstSlide from '../components/landing'

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`

const Landing = () => {
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <Container>
            <MainHeader/>
            <FirstSlide/>
        </Container>
    )
}

export default Landing