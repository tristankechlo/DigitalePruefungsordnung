import { useRef, useState } from 'react';
import { useIsomorphicEffect, useWindowEvent } from '@mantine/hooks';


/**
 * ORIGINAL: https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/components/AppShell/use-resizing/use-resizing.tsx  
 * slightly adjusted for this app
 */
export function useResizing({ transitionDuration }: { transitionDuration: number | undefined }) {
    const [resizing, setResizing] = useState(false);
    const resizingTimeout = useRef<number>();
    const disabledTimeout = useRef<number>();

    useWindowEvent('resize', () => {
        setResizing(true);
        clearTimeout(resizingTimeout.current);
        resizingTimeout.current = window.setTimeout(() => setResizing(false), 200);
    });

    useIsomorphicEffect(() => {
        setResizing(true);
        clearTimeout(disabledTimeout.current);
        disabledTimeout.current = window.setTimeout(() => setResizing(false), transitionDuration || 0);
    }, [transitionDuration]);

    return resizing;
}
