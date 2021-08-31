import React from "react";
import { LabelText } from "../UI/styledComponents";
import styled from "styled-components";

export const Coords = styled.span`
    font-family: monospace;
    vertical-align: baseline;
    line-height: 1;
`;

export default({ className, x, y }) => (
    <LabelText className={className}>
        Position:
        <Coords>{`[${x},${y}]`}</Coords>
    </LabelText>
);
