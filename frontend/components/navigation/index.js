import React from 'react'
import styled from 'styled-components'

import {permissionsToView, roleToView} from '../../ui/content/navigation/permissions'

import {ImgPhone} from '../../assets/contacts-svg'
import {compiledRoutes} from '../../routes'

import {useSelector} from 'react-redux'

const Navbar = styled.nav`
    width: 100%;
    height: 10vh;

    position: sticky;
    top: 0;

    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Sidebar = styled.nav`
    width: 15%;
    height: 100vh;

    position: sticky;
    top: 0;
    left: 0;

    padding: 16px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    background: rgba(200, 200, 200, 0.5);
`

const AuthButton = styled.div`
    width: 10%;
    height: 7vh;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-weight: bold;

    margin-right: ${({theme}) => theme.space.x2};
    margin-left: auto;

    cursor: pointer;

    &:hover {
        background: rgba(200, 200, 200, 0.5);
    }
`

const Phone = styled.div`
    width: 250px;
    height: 7vh;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-weight: bold;

    margin-right: ${({theme}) => theme.space.x2};
    margin-left: auto;
    letter-spacing: 2px;

    cursor: pointer;

    &:hover {
        background: rgba(200, 200, 200, 0.5);
    }
`

const ProfileBlock = styled.div`
    width: 100%;
    height: 100px;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 22px;
    font-size: 16px;
    color: white;

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;

    padding: 16px;
`

const MenuBlock = styled.div`
    width: 100%;
    height: 800px;

    padding: 16px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

const MenuItem = styled.div`
    width: 100%;
    height: 54px;

    padding: 16px;

    cursor: pointer;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 22px;
    font-size: 16px;
    color: white;

    &:hover {
        background: rgba(200, 200, 200, 0.65);
        border-radius: 5px;
    }

    &:last-child {
        margin-top: auto;
    }
`

const Avatar = styled.div`
    width: 50px;
    height: 50px;

    border-radius: 25px;

    background: url('/images/default-avatar.png');
    background-size: cover;
`

const ProfileName = styled.div`
    width: 100px;

    margin-left: 16px;
`

export const MainHeader = () => (
    <Navbar>
        <AuthButton onClick={() => compiledRoutes.signIn.goThroughClient()}>Вход</AuthButton>
    </Navbar>
)

export const DashboardHeader = () => (
    <Navbar isDashboard={true}>
        <Phone><a href="let:89198843477"><ImgPhone/>+7(919)-884-34-77</a></Phone>
    </Navbar>
)

export const DashboardSidebar = () => {
    const {userPermissions} = useSelector(({permissions}) => permissions)
    const {userInfo} = useSelector(({auth}) => auth)

    return (
        <Sidebar>
            <ProfileBlock>
                <Avatar/>
                <ProfileName>
                    {userInfo.name}
                </ProfileName>
            </ProfileBlock>
            <MenuBlock>
                <MenuItem onClick={compiledRoutes.dashboard.goThroughClient}>
                    Дашборд
                </MenuItem>
                {permissionsToView.map((item) => {
                    if(userPermissions[item.perm] === 1){
                        return (
                            <MenuItem onClick={compiledRoutes[item.route] ? compiledRoutes[item.route].goThroughClient : null}>
                                {item.name}
                            </MenuItem>
                        )
                    }
                })}
                <MenuItem onClick={compiledRoutes.index.goThroughClient}>
                    Выход
                </MenuItem>
            </MenuBlock>
        </Sidebar>
    )
}