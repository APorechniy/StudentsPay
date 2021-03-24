import React from 'react'
import styled from 'styled-components'

const DecorLogoBlock = styled.div`
    position: absolute;
    top: 100px;
    left: 100px;

    background: url("/images/main-icon.png");
    background-size: cover;

    border-radius: 50%;

    width: 100px;
    height: 100px;

    animation-name: rotation;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes rotation {
        0% {
            transform:rotate(0deg);
        }
        100% {
            transform:rotate(360deg);
        }
    }

    font: 22px monospace;

    b {
        position: absolute;
        left: 50%;
        width: 0;

        color: #00a6d2;

        &:nth-of-type(-n+9) {bottom: 50%; -ms-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%; transform-origin: 0% 100%; padding-bottom: 50%;}

        &:nth-of-type(1) {-ms-transform: rotate(318deg); -webkit-transform: rotate(318deg); transform: rotate(318deg);}
        &:nth-of-type(2) {-ms-transform: rotate(330deg); -webkit-transform: rotate(330deg); transform: rotate(330deg);}
        &:nth-of-type(3) {-ms-transform: rotate(342deg); -webkit-transform: rotate(342deg); transform: rotate(342deg);}
        &:nth-of-type(4) {-ms-transform: rotate(354deg); -webkit-transform: rotate(354deg); transform: rotate(354deg);}
        &:nth-of-type(5) {-ms-transform: rotate(6deg); -webkit-transform: rotate(6deg); transform: rotate(6deg);}
        &:nth-of-type(6) {-ms-transform: rotate(18deg); -webkit-transform: rotate(18deg); transform: rotate(18deg);}
        &:nth-of-type(7) {-ms-transform: rotate(30deg); -webkit-transform: rotate(30deg); transform: rotate(30deg);}
        &:nth-of-type(8) {-ms-transform: rotate(42deg); -webkit-transform: rotate(42deg); transform: rotate(42deg);}

        &:nth-of-type(n+9){top: 50%; -ms-transform-origin: 50% 0; -webkit-transform-origin: 50% 0; transform-origin: 50% 0; padding-top: 50%;}

        &:nth-last-of-type(1) {-ms-transform: rotate(348deg); -webkit-transform: rotate(348deg); transform: rotate(348deg);}
        &:nth-last-of-type(2) {-ms-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg);}
        &:nth-last-of-type(3) {-ms-transform: rotate(12deg); -webkit-transform: rotate(12deg); transform: rotate(12deg);}
    }
`

export const DecorLogo = () => (
    <DecorLogoBlock>
        <b>S</b>
        <b>t</b>
        <b>u</b>
        <b>d</b>
        <b>e</b>
        <b>n</b>
        <b>t</b>
        <b>s</b>

        <b>p</b>
        <b>a</b>
        <b>y</b>
    </DecorLogoBlock>
)