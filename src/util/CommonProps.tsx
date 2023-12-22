import { MantineSize } from '@mantine/core';

export const TEXT_PROPS = {
    size: 'sm',
    pb: '0.4rem',
} as {
    pb: React.CSSProperties['paddingBottom'];
    size: MantineSize;
};

export const SUBTITLE_PROPS = {
    size: 'sm',
    fw: 'bolder',
    pb: '0.3rem',
} as {
    pb: React.CSSProperties['paddingBottom'];
    size: MantineSize;
    fw: React.CSSProperties['fontWeight'];
};
