import React, { useState } from "react";
import { render } from "react-dom";
import { SexyCircle } from "./Component";
import styled from "styled-components";
import "./reset.css";

const rootElement = document.getElementById("root");

const DuoContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  margin-top: 5rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 5rem;

  background-color: papayawhip;
`;

const pointsOnCircle = ({ radius, angle, center }) => {
  const radiusAngle = angle * (Math.PI / 180);
  const x = center + radius * Math.sin(radiusAngle);
  const y = center + radius * Math.cos(radiusAngle);
  return [x, y];
};

const SolidColor = () => {
  return (
    <>
      <linearGradient id="Color">
        <stop stopColor="#991132" />
      </linearGradient>

      <filter id="Filter">
        <feGaussianBlur stdDeviation={1} />
      </filter>
    </>
  );
};

/**
 * Example of a fancy gradient
 */
const SvgGradient = ({ center, progress, angle, radius }) => {
  const [x, y] = pointsOnCircle(center, angle, radius);

  return (
    <>
      <radialGradient
        id="Color"
        cx={center}
        cy={center}
        r={center * 2}
        fx={x}
        fy={y}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="blue" />
        <stop offset="90%" stopColor="red" />
        <stop offset="100%" stopColor="blue" />
      </radialGradient>
    </>
  );
};

const SvgFilter = ({ progress }) => (
  <filter id="Filter">
    <feGaussianBlur stdDeviation={2 * progress} />
  </filter>
);
const Component = () => {
  const [value, setValue] = useState(100);

  return (
    <Container>
      <DuoContainer>
        <SexyCircle
          progress={value / 100}
          size={300}
          barWidth={20}
          svgGradient={SvgGradient}
          svgFilter={SvgFilter}
        >
          <div>hi 👋</div>
        </SexyCircle>
      </DuoContainer>
      <Input
        id="control"
        type="range"
        onChange={(e) => setValue(e.target.valueAsNumber)}
        value={value}
      />
      <p>{value}</p>
      <a href="https://github.com/RiccardoCampitelli/svgCircle" target="_blank">
        Source code
      </a>
    </Container>
  );
};

render(<Component />, rootElement);
