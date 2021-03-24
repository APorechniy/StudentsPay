import React from 'react'

import styled from 'styled-components'

const Select = styled.select`
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

const SelectContainer = styled.div`
    border: 4px ${({theme}) => theme.colors.mainColorPrimary} solid;
    padding: 4px;
`

const Label = styled.div`
    margin-top: ${({theme}) => theme.space.x2};
    margin-bottom: ${({theme}) => theme.space.x1};

    color: black;
`

const Container = styled.div`

`

export const SelectBlock = ({
    value,
    isDisabled,
    onChange,
    placeholder,
    label,
    width,
    height,
    data = []
}) => {
    return (
        <Container>
            <Label>
                {label}
            </Label>
            <SelectContainer>
                <Select
                    value={value}
                    disabled={isDisabled}
                    onChange={onChange}
                    placeholder={placeholder}
                    width={width}
                    height={height}
                >
                    {data.map((item) => {
                        return (
                            <option value={item.value}>{item.label}</option>
                        )
                    })}
                </Select>
            </SelectContainer>
        </Container>
    )
}
