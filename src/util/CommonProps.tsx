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

export const FORMATTING_OPTIONS: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};
