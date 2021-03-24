import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {useDispatch, useSelector} from 'react-redux'

import {DashboardSidebar} from '../components/navigation'

import {getStatementsPreview} from '../modules/statements'
import { compiledRoutes } from '../routes'

const Container = styled.div`
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-wrap: nowrap;
`

const PreviewsBlock = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`

const PreviewItem = styled.div`
    width: 400px;
    height: 300px;

    background: rgba(200, 200, 200, 0.5);

    border-radius: 5px;

    margin: 24px;

    padding: 16px;

    display: flex;
    flex-direction: column;
`

const PreviewTitle = styled.p`
    width: 100%;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: bold;
    line-height: 24px;
    font-size: 18px;
    color: white;
`

const StatementsItem = styled.div`
    width: 100%;
    min-height: 38px;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 22px;
    font-size: 16px;
    color: white;

    margin-bottom: 8px;
`

const StubBlock = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 40px;
    font-size: 30px;
    color: white;
`

const Dashboard = () => {
    const [statementsPreview, setStatementsPreview] = useState([])
    const {userInfo} = useSelector(({auth}) => auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(userInfo).length <= 0){
            compiledRoutes.index.goThroughClient()
        }

        const getPreview = async () => {
            const response = await dispatch(getStatementsPreview())
            setStatementsPreview(response)
        }

        getPreview()
    }, [])

    return (
        <Container>
            { userInfo.account_status === "ПОДТВЕРЖДЕНО" &&
            <>
            <DashboardSidebar/>
            <PreviewsBlock>
                <PreviewItem onClick={compiledRoutes.statements.goThroughClient}>
                    <PreviewTitle>Заявки</PreviewTitle>
                    {statementsPreview.map((statement, index) => {
                        return (
                            <StatementsItem key={index}>
                                {`${index+1}. ${statement.from_user} - ${statement.for_type} - ${statement.status}`}
                            </StatementsItem>
                        )
                    })}
                </PreviewItem>
            </PreviewsBlock>
            </>}
            { userInfo.account_status === "НА РАССМОТРЕНИИ" &&
            <StubBlock>
                Ваша заявка на регистрацию находится на рассмотрении
            </StubBlock>
            }
            { userInfo.account_status === "ОТКЛОНЕНА" &&
            <StubBlock>
                Ваша заявка на регистрацию отклонена
                Свяжитесь с администратором
            </StubBlock>
            }
        </Container>
    )
}

export default Dashboard