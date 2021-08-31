import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { renderSatelite, renderEmissor } from "./utils";
import {
    getPixelCoordsTransform,
} from "../math2d";

const StyledCanvas = styled.canvas`
    width: 100%;
    height: 100%;
    min-height: 480px;
    border: 1px solid #eee;
    background-color: #001100;
    box-sizing: border-box;
    &:focus {
        outline: none;
        border: 1px solid #aaa;
    }
`;

const createRenderer = (canvas, satellites, position) => {
    const ctx = canvas.getContext("2d");
    const diameter = 1000;
    let pixelRect = null;
    let viewport = null;
    let screenCoordTransform = [1, 0, 0, 1, 0, 0];
    // let worldCoordTransform = [1, 0, 0, 1, 0, 0];
    let frameId = null;
    
    const updateTransforms = () => {
        screenCoordTransform = getPixelCoordsTransform(viewport, pixelRect);
        // worldCoordTransform = getInvPixelCoordsTransform(viewport, pixelRect);
    };

    const resize = () => {
        if (canvas.clientWidth !== canvas.width
            || canvas.clientHeight !== canvas.height
            || pixelRect === null
            || viewport === null
        ) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            pixelRect = { x: 0, y: 0, width: canvas.width, height: canvas.height };
            const aspect = canvas.width / canvas.height;
            viewport = { x: 0, y: 0, width: diameter, height: diameter / aspect };
            updateTransforms();
        }
    };

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.save();
        ctx.transform(...screenCoordTransform);
        satellites.map((satellite) => renderSatelite(ctx, satellite));
        if (!Number.isNaN(position[0]) || !Number.isNaN(position[1])) {
            renderEmissor(ctx, position)
        }
        ctx.restore();
    };

    const loop = () => {
        resize();
        render();
        frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
};

export default ({ className, satellites, position }) => {
    const canvasRef = useRef();

    useEffect(
        () => createRenderer(canvasRef.current, satellites, position),
        [satellites, position],
    );

    return (
        <StyledCanvas
            className={className}
            tabIndex="-1"
            ref={canvasRef}
        />
    );
}