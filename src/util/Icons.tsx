import type { TablerIconsProps } from '@tabler/icons-react';

const defaultProps = {
    width: 24,
    height: 24,
    color: 'currentColor',
    stroke: 2,
} as TablerIconsProps;

export const IconWalkieTalkie = (props: TablerIconsProps) => {

    const { width, height, color, stroke, ...rest } = props;

    return (
        <svg {...rest} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" stroke={color} strokeWidth={0.4} fill={color}>
            <path d="M10.071 14.143a.643.643 0 0 0 0 1.286h3.857a.643.643 0 0 0 0-1.286h-3.857ZM8.786 6a.643.643 0 0 0-.643.643v4.714c0 .356.288.643.643.643h6.429a.643.643 0 0 0 .643-.643V6.643A.643.643 0 0 0 15.215 6H8.786Zm.643 4.714V7.285h5.143v3.429H9.429Z" />
            <path d="M8.786.857a.643.643 0 0 1 .643.643V3h7.5a1.929 1.929 0 0 1 1.928 1.929v8.785a.643.643 0 0 1-.163.427l-1.551 1.746v4.041a1.929 1.929 0 0 1-1.929 1.929H8.785a1.929 1.929 0 0 1-1.928-1.928v-4.041l-1.551-1.746a.643.643 0 0 1-.163-.428V4.929A1.929 1.929 0 0 1 7.071 3h1.072V1.5a.643.643 0 0 1 .643-.643ZM6.429 4.929v8.541l1.551 1.746a.643.643 0 0 1 .163.427v4.286c0 .355.288.643.643.643h6.429a.643.643 0 0 0 .643-.643v-4.286a.643.643 0 0 1 .163-.427l1.551-1.746V4.929a.643.643 0 0 0-.643-.643H7.071a.643.643 0 0 0-.643.643Z" />
        </svg>
    );
}

export const IconWhistle = (props: TablerIconsProps) => {

    const { width, height, color, stroke, ...rest } = props;

    return (
        <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} stroke={color} strokeWidth={0} fill={color}>
            <path d="M23.189 4.673H8.45A7.373 7.373 0 0 0 4.4 5.88a2.296 2.296 0 0 0-2.106-1.386A2.296 2.296 0 0 0 0 6.787c0 1.062.725 1.957 1.707 2.217a7.37 7.37 0 0 0-.673 3.085c0 4.089 3.327 7.416 7.416 7.416 4.09 0 7.417-3.327 7.417-7.416v-1.346h7.323a.81.81 0 0 0 .811-.811V5.484a.81.81 0 0 0-.811-.811zM2.294 6.115a.672.672 0 1 1 0 1.344.672.672 0 0 1 0-1.344zm20.085 3.007h-7.323a.81.81 0 0 0-.811.811v2.157c0 3.195-2.6 5.795-5.795 5.795s-5.795-2.6-5.795-5.795 2.6-5.795 5.795-5.795h.672V8.45a.81.81 0 1 0 1.622 0V6.295h11.635v2.827z" />
        </svg>

    );
}

IconWalkieTalkie.defaultProps = defaultProps;
IconWhistle.defaultProps = defaultProps;
