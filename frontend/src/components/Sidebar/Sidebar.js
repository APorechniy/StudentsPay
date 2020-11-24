import React, { PureComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Sidebar extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: {}
        }
    }

    getCookie = () => {
        let cookies = document.cookie.split(";");
    
        let res = cookies.map((str) => {
          let substr = str.split("=");
          return {
            name: substr[0],
            val: substr[1]
          }
        })
    
        let result = false;
        res.forEach((str) => {
          if(str.name === " uuid") {
            result = str.val
          }
        });
    
        return result
    };

    componentDidMount = () => {
        let uuid = this.getCookie();
        axios.get(`http://localhost:5000/user`, {params: {uuid: uuid}})
        .then((response) => {
            this.setState({
                currentUser: response.data[0]
            })
        })
        .catch((err) => {
            console.log(err)
        });
        
    }

    exit = () => {
        document.cookie = `uuid=${this.state.currentUser.session}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        window.location.href = "/";
    }

    render() {
        let { currentUser } = this.state
        return (
            <NavBar>
                <UserCard>
                    <Avatar />
                    <Username>
                        {currentUser.name}
                    </Username>

                    <Exit onClick={this.exit}>
                        Выйти
                    </Exit>
                </UserCard>
            </NavBar>
        )
    }
}

export default Sidebar;

const NavBar = styled.nav`
    width: 20%;
    min-height: 100vh;

    position: fixed;
    left: 0;
    top: 0;

    background: #0e0c26;

    display: flex;
    flex-direction: column;
`;

const UserCard = styled.div`
    width: 90%;
    height: 200px;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10px;

    border-radius: 10px;

    position: relative;

    padding: 5px;

    background: rgba(24, 21, 59, 0.88);

    display: flex;
    flex-wrap: wrap;
`;

const Avatar = styled.div`
    flex-basis: 80px;
    height: 80px;

    border-radius: 100px;

    background: white;
`;

const Username = styled.div`
    flex-basis: calc(100% - 90px);
    height: 80px;
    padding-left: 10px;

    display: flex;
    align-items: center;

    color: white;
`;

const Exit = styled.button`
    width: 50%;
    height: 20px;

    background: #ff004d;
    border: none;
    color: white;

    position: absolute;
    bottom: 5px;
    left: 25%;

    border-radius: 5px;
`;