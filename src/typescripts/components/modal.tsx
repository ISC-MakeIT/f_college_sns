import * as React from 'react';
import { Icon } from '.';

interface Props extends React.HTMLProps<HTMLDivElement> {
    open?: boolean;
    heading: string | JSX.Element;
    onClose: () => void;
}

export class Modal extends React.Component<Props, {}> {
    public render() {
        const { className, open, heading, onClose, children } = this.props;
        if (!open) return null;
        return (
            <div
                className={`component modal ${className}`}
                onClick={e => e.target === e.currentTarget ? onClose() : null}
            >
                <div className='modal-container'>
                    <div className='modal-header pb2'>
                        <h2>{heading}</h2>
                        <Icon name='times' onClick={e => onClose()} className='close-button'/>
                    </div>
                    <div className='modal-content'>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
