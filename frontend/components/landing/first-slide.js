import React from 'react'
import styled from 'styled-components'

import {DecorLogo} from '../../ui/elements/decor-logo'

import {perspectives} from '../../ui/content/landing/perspectives'

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    color: white;
    font-weight: bold;
`

const Title = styled.h1`
    width: 100%;

    margin-top: ${({theme}) => theme.space.x4};

    font-size: 32px;
    line-height: 44px;


    font-family: 'Poppins', sans-serif;
    color: white;

    text-align: center;
`

const StudentsPay = styled(Title)`
    color: #00a6d2;
    font-weight: bold;
`

const ItemsContainer = styled.div`
    margin-top: ${({theme}) => theme.space.x8};
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    height: 500px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
`

const ItemBlock = styled.div`
    width: 280px;
    height: 500px;

    border: 2px solid white;
    color: white;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: flex-start;

    background: rgba(200, 200, 200, 0.5);
`

const ItemTitle = styled.h2`
    margin-top: ${({theme}) => theme.space.x2};

    font-size: 20px;
    line-height: 24px;

    font-family: 'Poppins', sans-serif;
    color: white;

    text-align: center;
`

const ItemText = styled.p`
    margin-top: ${({theme}) => theme.space.x1};

    font-size: 16px;
    line-height: 20px;

    font-family: 'Poppins', sans-serif;
    color: white;

    text-align: center;
`

const ItemImage = styled.img.attrs({
    width: '260px',
    height: '180px',
})`
    margin-top: 32px;
`

export const FirstSlide = () => (
    <Container>
        <Title>Первая в мире студенческая система</Title><StudentsPay>StudentsPay</StudentsPay>
        <ItemsContainer>
            {perspectives.map((item) => {
                return (
                    <ItemBlock>
                        <ItemTitle>{item.title}</ItemTitle>
                        <ItemText>{item.text}</ItemText>
                        <ItemImage src={item.image}/>
                    </ItemBlock>
                )
            })}
        </ItemsContainer>
        <DecorLogo/>
    </Container>
)