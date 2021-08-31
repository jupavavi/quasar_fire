import React from "react";
import styled from "styled-components";
import Position from "./Position";
import NumericInput from "../UI/NumericInput";
import TextInput from "../UI/TextInput";
import { Container } from "../UI/styledComponents";
import { noop } from "../misc";

export const Title = styled.h3`
    margin: 0 0 0.5rem;
`;

export default ({
    className,
    name,
    position,
    distance = 0,
    message = [],
    onChange = noop,
}) => (
    <Container className={className}>
        <Title>{ name }</Title>
        <Position
            x={position?.[0] || 0}
            y={position?.[1] || 0}
        />
        <NumericInput
            label="Distance"
            min={0}
            value={distance}
            onChange={(value) => onChange({
                name,
                position,
                message,
                distance: value,
            })}
        />
        <TextInput
            label="Message"
            value={message?.map(word => word || " ")?.join?.(",") || ""}
            onChange={(value) => onChange({
                name,
                position,
                distance,
                message: value.replace(/\s+/g, "").split(","),
            })}
        />
    </Container>
);
