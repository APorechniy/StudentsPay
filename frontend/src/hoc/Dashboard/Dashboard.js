import React, { PureComponent } from 'react';
import styled from 'styled-components';

class Main extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }

    componentDidMount = () => {
        if(!this.props.isAuth){
            window.location.href = '/';
        }
    }

    render() {        
        return (
            <Container />
        )
    }
}

export default Main;

const Container = styled.div`
    width: 80%;
    height: 200vh;

    margin-left: 20%;
`;

