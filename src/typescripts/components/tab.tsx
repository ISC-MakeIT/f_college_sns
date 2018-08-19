import * as React from 'react';

interface Props {
    value: string;
    class: string;
    stateChange(e: any): void;
}

export const Tab: React.StatelessComponent<Props> = props => {
    return (
        <button
            onClick={props.stateChange}
            className={props.class}
        >
            {props.value}
        </button>
    );
};
