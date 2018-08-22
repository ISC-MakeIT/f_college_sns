import * as React from 'react';
import { Icon } from './icon';

interface Props {
    value: string;
    class: string;
    stateChange(e: React.MouseEvent<HTMLElement>): void;
}

export const Tab: React.StatelessComponent<Props> = props => {
    return (
        <button
            onClick={props.stateChange}
            className={`component tab ${props.class}`}
        >
            <Icon name='caret-up' fas />
            {props.value}
        </button>
    );
};
