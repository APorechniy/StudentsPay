import React from 'react'

import styled from 'styled-components'

const Input = styled.input`
    width: ${({width}) => width ? width : '100px'};
    height: ${({height}) => height ? height : null};
    background: white;

    font-size: 20px;

    border-radius: 0 !important;
    border: 4px ${({theme}) => theme.colors.mainColorPrimary};
    box-shadow: none;

    &:focused {
        border-radius: 0 !important;
    }
`

const InputContainer = styled.div`
    border: 4px ${({theme}) => theme.colors.mainColorPrimary} solid;
    padding: 4px;
`

const Label = styled.div`
    margin-bottom: ${({theme}) => theme.space.x1};
    margin-top: ${({theme}) => theme.space.x2};

    color: black;
`

const Container = styled.div`

`

export const InputBlock = ({
    value,
    isDisabled,
    onChange,
    placeholder,
    label,
    width,
    height,
    type
}) => {
    return (
        <Container>
            <Label>
                {label}
            </Label>
            <InputContainer>
                <Input
                    value={value}
                    disabled={isDisabled}
                    onChange={onChange}
                    placeholder={placeholder}
                    width={width}
                    height={height}
                    type={type}
                />
            </InputContainer>
        </Container>
    )
}
