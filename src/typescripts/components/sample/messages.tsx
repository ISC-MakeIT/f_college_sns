import * as React from 'react';

interface Props {
    hello: string;
    value: string;
}

export const Messages: React.StatelessComponent<Props> = props => {
    const value = (props.value !== '') ? <h1>{props.hello} {props.value} !</h1> : null;

    return (
        <div>
            {value}
        </div>
    );
};
