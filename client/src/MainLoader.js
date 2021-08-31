import styled from "styled-components";

export const LoaderWrapper = styled.div`
    background-color: rgba(255, 255, 255, 0.25);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

export default ({ className }) => (
    <LoaderWrapper className={className}>
        Loading...
    </LoaderWrapper>
);