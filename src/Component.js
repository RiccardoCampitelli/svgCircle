import React from "react";
import styled from "styled-components";

const ProgressCircle = styled.circle`
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: ${(props) =>
    `${2 * Math.PI * props.radius * props.progress}, ${
      2 * Math.PI * props.radius
    }`};
  stroke-dashoffset: ${(props) => props.progress};
`;

const Circle = styled.circle`
  fill: none;
  stroke: inherit;
`;

const Svg = styled.svg`
  position: absolute;
  overflow: visible;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-0.25turn);
`;

const TOTAL = 360;

const Absolute = styled.div`
  height: 200px;
  width: 200px;
  margin-left: 500px;
  background-color: papayawhip;
  position: relative;
`;

const DuoContainer = styled.div`
  position: relative;
  height: ${(props) => props.size + "px"};
  width: ${(props) => props.size + "px"};
`;

const Children = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SexyCircle = ({
  children,
  progress,
  size = 120,
  barWidth = 12,
  svgGradient: SvgGradient,
  svgFilter: SvgFilter,
}) => {
  const angle = (progress - barWidth / 2) * TOTAL;

  const sizeWithWidth = size + barWidth;

  const radiusPlusWidth = sizeWithWidth / 2;

  const radius = size / 2;

  return (
    <>
      <DuoContainer size={size}>
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${sizeWithWidth} ${sizeWithWidth}`}
        >
          <defs>
            <SvgGradient
              center={radiusPlusWidth}
              progress={progress}
              angle={angle}
              radius={radius}
            />
            <SvgFilter
              center={radiusPlusWidth}
              progress={progress}
              angle={angle}
              radius={radius}
            />
          </defs>
          <Circle
            cx={radiusPlusWidth}
            cy={radiusPlusWidth}
            r={radius}
            strokeWidth={barWidth}
          />
          {progress !== 0 && (
            <ProgressCircle
              progress={progress}
              radius={radiusPlusWidth}
              cx={radiusPlusWidth}
              cy={radiusPlusWidth}
              r={radiusPlusWidth - barWidth / 2}
              strokeWidth={barWidth}
              stroke="url(#Color)"
              filter="url(#Filter)"
            />
          )}
        </Svg>
        <Children>{children}</Children>
      </DuoContainer>
    </>
  );
};

export { SexyCircle };
