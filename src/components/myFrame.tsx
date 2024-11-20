'use client';

import React, { useState, useRef, useEffect, PropsWithChildren, FunctionComponent } from 'react'
import { createPortal } from 'react-dom'
import ErrorBoundary, { ErrorDetails } from './ErrorBoundary';

export interface MyFrameComponentProps {
    src: string;
}

// todo: export contentRef from component? 
const MyFrameComponent: FunctionComponent<MyFrameComponentProps> = ({
    children,
    ...props
}: PropsWithChildren<MyFrameComponentProps>) => {

    const [src, setSrc] = useState<string>(props.src)
    const [message, setMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<ErrorDetails | undefined>(undefined)

    // This hook is listening an event that came from the Iframe
    useEffect(() => {
        const handler = (ev: MessageEvent<{ type: string, message: string }>) => {
            console.log('MyFrameComponent MessageEvent', ev);

            if (typeof ev.data !== 'object') return;
            if (!ev.data.type) return;
            if (ev.data.type !== 'button-click') return;
            if (!ev.data.message) return;

            if (ev.origin == src) {
                console.log('ev.origin == src', ev);
            }

            setMessage(ev.data.message);
        };

        window.addEventListener('message', handler);

        // Don't forget to remove addEventListener
        return () => window.removeEventListener('message', handler);
    }, []);

    const contentRef: React.RefObject<HTMLIFrameElement> = useRef<HTMLIFrameElement>(null);

    const mountNode =
        contentRef.current?.contentWindow?.document?.body

    return (
        <>
            <div>message: {message}</div>

            {/* setErrorMessage={setErrorMessage} */}
            <ErrorBoundary  location={'MyFrameComponent.iframe: ' + src}>
                <iframe {...props} ref={contentRef} src={src} >
                    {mountNode && createPortal(children, mountNode)}
                    {errorMessage != undefined ? errorMessage.error : ''}
                </iframe>
            </ErrorBoundary>
        </>
    )
}

export default MyFrameComponent;