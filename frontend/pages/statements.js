import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {useDispatch, useSelector} from 'react-redux'

import {DashboardSidebar} from '../components/navigation'

import {CreateStatementModal} from '../components/statements/modal/create-statement-modal'

import {
    getStatements,
    confirmStatement,
    rejectStatement
} from '../modules/statements'

const ImgAdd = () => (
    <svg fill={"white"} width="30px" height="30px">
        <line x1="15" x2="15" y1="25" y2="5" stroke="white" stroke-width="5" />
        <line x1="25" x2="5" y1="15" y2="15" stroke="white" stroke-width="5" />
    </svg>
)

const Container = styled.div`
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-wrap: nowrap;
`

const StatementsBlock = styled.div`
    width: 60%;
    min-height: 100vh;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;

    padding: 16px;
`

const StatementItem = styled.div`
    width: 100%;
    height: 200px;

    background: rgba(200, 200, 200, 0.5);

    margin-bottom: 16px;
    padding: 16px;

    border-radius: 5px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Title = styled.p`
    width: 80%;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: bold;
    line-height: 30px;
    font-size: 24px;
    color: white;
`

const StatementId = styled.p`
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: bold;
    line-height: 22px;
    font-size: 16px;
    color: white;

    width: 100%;
    height: 24px;
    border-bottom: 1px solid white;
`

const Row = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`

const StatementUser = styled.p`
    width: 30%;

    font-style: normal;
    font-weight: bold;
    line-height: 22px;
    font-size: 16px;
    color: white;
`

const StatementType = styled.p`
    width: 30%;

    font-style: normal;
    font-weight: bold;
    line-height: 22px;
    font-size: 16px;
    color: white;
`

const StatementStatus = styled.p`
    width: 30%;

    font-style: normal;
    font-weight: bold;
    line-height: 22px;
    font-size: 16px;
    color: white;
`

const ButtonsBlock = styled.div`
    width: 50%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const ConfirmButton = styled.div`
    width: 150px;
    height: 50px;

    cursor: pointer;
    background: ${({theme}) => theme.colors.mainColorPrimary};
    border-radius: 5px;

    font-style: normal;
    font-weight: bold;
    line-height: 22px;
    font-size: 16px;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`

const RejectButton = styled.div`
    width: 150px;
    height: 50px;

    margin-left: 24px;

    cursor: pointer;
    background: ${({theme}) => theme.colors.mainColorError};
    border-radius: 5px;

    font-style: normal;
    font-weight: bold;
    line-height: 22px;
    font-size: 16px;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`

const AddButton = styled.div`
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: auto;
    margin-top: 0;

    cursor: pointer;

    background: ${({theme}) => theme.colors.mainColorPrimary};
`

const Statements = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const {statementsList} = useSelector(({statements}) => statements)
    const {userInfo} = useSelector(({auth}) => auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(userInfo).length <= 0){
            compiledRoutes.index.goThroughClient()
        }

        const getFullList = async () => {
            await dispatch(getStatements())
        }

        getFullList()
    }, [])

    const confirmStatementItem = async (id) => {
        await dispatch(confirmStatement(id))
    }

    const rejectStatementItem = async (id) => {
        await dispatch(rejectStatement(id))
    }

    return (
        <Container>
            <DashboardSidebar/>
            <StatementsBlock>
                <Row>
                    <Title>Заявки</Title>
                    <AddButton onClick={() => setIsOpenModal(true)}>
                        <ImgAdd/>
                    </AddButton>
                </Row>
                {statementsList.length > 0 && statementsList.map((statement) => {
                    return (
                        <StatementItem>
                            <StatementId>{`Заявка №${statement.id}`}</StatementId>
                            <StatementUser>{`От: ${statement.from_user}`}</StatementUser>
                            <StatementType>{`Тип операции: ${statement.for_type}`}</StatementType>
                            <StatementStatus>{`Статус заявки: ${statement.status}`}</StatementStatus>
                            <ButtonsBlock>
                                <ConfirmButton onClick={() => confirmStatementItem(statement.id)}>Одобрить</ConfirmButton>
                                <RejectButton onClick={() => rejectStatementItem(statement.id)}>Отклонить</RejectButton>
                            </ButtonsBlock>
                        </StatementItem>
                    )
                })}
            </StatementsBlock>
            <CreateStatementModal
                isShow={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                width={"500px"}
                height={"500px"}
            />
        </Container>
    )
}

export default Statements