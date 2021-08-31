import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    text-align: left;
    padding: 0.5rem;
`;

const Title = styled.h3`
    margin-top: 0;
`;
const Group = styled.div``;
const Label = styled.span`
    font-weight: bold;
`;
const Data = styled.span``;

export default ({ position, message }) => (
    <Wrapper>
        <Title>Results</Title>
        <Group>
            <Label>Position:</Label>
            <Data>[{
                position.map(x => (x * 1).toFixed(4)).join(",")
            }]</Data>
        </Group>
        <Group>
            <Label>Message:</Label>
            <Data>{message}</Data>
        </Group>
    </Wrapper>
);
