import React from "react";
import styled from "styled-components";
import SatelliteControl from "./SatelliteControl";
import RangeInput from "./UI/RangeInput";
import { Container } from "./UI/styledComponents";
import { noop } from "./misc";

const MainContainer = styled.div`
    text-align: left;
    padding: 0 0.5rem;
`;

const Button = styled.button`
`;

export default ({
    className,
    satellites = [],
    tolerance = 1,
    onChange = noop,
    onToleranceChange = noop,
    onSubmit = noop,
}) => {
    const onChangeHandler = (index, data) => {
        const newSatelites = [...satellites];
        newSatelites[index] = {...data };
        onChange(newSatelites);
    };

    const controls = satellites.map((data, index) => (
        <SatelliteControl
            {...data}
            key={index}
            onChange={(newData) => onChangeHandler(index, newData)}
        />
    ));
    
    return (
        <MainContainer className={className}>
            {controls}
            <Container>
                <RangeInput
                    label="Tolerance"
                    value={tolerance}
                    onChange={onToleranceChange}
                />
            </Container>
            <Container>
                <Button onClick={onSubmit}>
                    Execute
                </Button>
            </Container>
        </MainContainer>
    );
};