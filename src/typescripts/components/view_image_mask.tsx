import * as React from 'react';
import { Icon } from '.';

interface Props extends React.HTMLProps<HTMLDivElement> {
    open?: boolean;
    onClose: () => void;
}

export class Mask extends React.Component<Props, {}> {
    public render() {
        const { className, open, onClose, children } = this.props;
        if (!open) return null;

        return (
            <div
                className={`component modal ${className}`}
                onClick={onClose}
            >
            {children}
            </div>
        );
    }
}
