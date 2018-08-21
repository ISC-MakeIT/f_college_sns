import * as React from 'react'

interface Props extends React.HTMLProps<HTMLElement> {
    name: string;
    fas?: boolean;
    fab?: boolean;
    far?: boolean;
}

export const Icon = (props: Props) => (
    <i
        onClick={(e => props.onClick ? props.onClick(e) : null)}
        className={`component icon ${faModuleNameFromProps(props)}
        fa-${props.name} ${props.className || ''}`}
    />
);

function faModuleNameFromProps(props: Props) {
    if (props.fas) return 'fas';
    if (props.fab) return 'fab';
    if (props.far) return 'far';
    return 'fa';
}
