import * as React from 'react';

interface Props {
    handleClick(): void;
}

export const Button: React.StatelessComponent<Props> = props => {
    return (
        <button className='btn' onClick={props.handleClick}>
            send
        </button>
    );
};
