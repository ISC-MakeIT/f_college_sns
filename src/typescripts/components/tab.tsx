import * as React from 'react';
import { Icon } from './icon';

interface Props {
    value: string;
    class: string;
    stateChange(e: React.MouseEvent<HTMLElement>): void;
}

export const Tab: React.StatelessComponent<Props> = props => {
    return (
        <div
            onClick={props.stateChange}
            className={`component tab ${props.class}`}
        >
            <p className='text'>{props.value}</p>
        <i />
        </div>
    );
};
