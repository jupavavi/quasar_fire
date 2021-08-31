import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import BaseCanvas from "./Canvas";
import BaseControls from "./Controls";
import Results from "./Results";
import MainLoader from "./MainLoader";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
    }
`;

const Panel = styled.div`
    display: flex;
    overflow: hidden;
    align-items: stretch;
`;

const Canvas = styled(BaseCanvas)`
    flex-shrink: 1;
    flex-grow: 1;
    width: 0;
    height: auto;
`;

const Controls = styled(BaseControls)`
    flex-shrink: 0;
    width: 200px;
`;

export default ({
    satellites,
    position,
    setSatellites,
    tolerance,
    setTolerance,
    message,
    isLoading,
    onSubmit,
}) => (
    <>
        {isLoading && <MainLoader />}
        <div>
            <Panel>
                <GlobalStyle />
                <Canvas
                    satellites={satellites}
                    position={position}
                />
                <Controls
                    satellites={satellites}
                    onChange={setSatellites}
                    tolerance={tolerance}
                    onToleranceChange={setTolerance}
                    onSubmit={onSubmit}
                />
            </Panel>
            <Results
                position={position}
                message={message}
            />
        </div>
    </>
);
