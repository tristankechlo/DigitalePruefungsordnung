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

export const IconLifeJacket = (props: TablerIconsProps) => {

    const { width, height, color, stroke, ...rest } = props;

    return (
        <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} stroke={color} strokeWidth={0} fill={color}>
            <path d="M20.244 14.045a1.576 1.576 0 0 1-1.2-1.523c0-.863.702-1.565 1.565-1.565.886 0 1.603-.754 1.53-1.631C21.707 4.097 17.328 0 12 0 6.665 0 2.292 4.105 1.861 9.326c-.072.876.644 1.631 1.53 1.631.863 0 1.565.702 1.565 1.565 0 .719-.505 1.359-1.2 1.523-1.155.272-1.93 1.198-1.93 2.305v5.303a2.35 2.35 0 0 0 2.348 2.348h15.652a2.35 2.35 0 0 0 2.348-2.348V16.35c0-1.107-.776-2.033-1.93-2.305zM8.164 4.688A3.917 3.917 0 0 1 12 1.565c.944 0 1.803.321 2.505.907a3.903 3.903 0 0 1 1.335 2.252A5.451 5.451 0 0 0 12 3.131a5.452 5.452 0 0 0-3.843 1.596.506.506 0 0 1 .007-.038zM3.391 16.349c0-.451.39-.703.724-.781a3.138 3.138 0 0 0 .842-.331v3.285a.784.784 0 0 1-.783.783h-.783V16.35zm6.261-3.827h-.783a.783.783 0 1 0 0 1.566h.783v3.652h-.783a.783.783 0 1 0 0 1.566h.783v.783a2.35 2.35 0 0 1-2.348 2.348h-3.13a.784.784 0 0 1-.783-.783v-.783h.783a2.35 2.35 0 0 0 2.348-2.348v-6a3.135 3.135 0 0 0-3.095-3.13c.231-2.569 1.611-4.808 3.6-6.226a5.274 5.274 0 0 0-.399 1.225 5.47 5.47 0 0 0 .422 3.427 5.465 5.465 0 0 0 2.232 2.397.752.752 0 0 1 .371.655v1.652zm.78 9.913a3.895 3.895 0 0 0 .785-2.348v-.783h1.565v.783c0 .88.292 1.693.785 2.348h-3.135zm.785-4.696v-3.652h1.565v3.652h-1.565zm1.565-6.869v1.651h-1.565v-1.652c0-.833-.444-1.605-1.159-2.014a3.885 3.885 0 0 1-1.634-1.791A3.91 3.91 0 0 1 12 4.695a3.91 3.91 0 0 1 3.576 2.371 3.89 3.89 0 0 1-1.616 1.778 2.353 2.353 0 0 0-1.178 2.026zm7.826 10.782a.784.784 0 0 1-.783.783h-3.13a2.35 2.35 0 0 1-2.348-2.348v-.783h.783a.783.783 0 1 0 0-1.566h-.783v-3.652h.783a.783.783 0 1 0 0-1.566h-.783v-1.651c0-.276.149-.527.397-.671a5.476 5.476 0 0 0 2.733-4.721c0-.813-.179-1.602-.514-2.319 1.994 1.417 3.377 3.66 3.609 6.232a3.135 3.135 0 0 0-3.095 3.13v6a2.35 2.35 0 0 0 2.348 2.348h.783v.783zm0-2.348h-.783a.784.784 0 0 1-.783-.783v-3.285a3.139 3.139 0 0 0 .842.331c.334.079.724.33.724.781v2.955z" />
        </svg>
    );

}

IconWalkieTalkie.defaultProps = defaultProps;
IconWhistle.defaultProps = defaultProps;
IconLifeJacket.defaultProps = defaultProps;
