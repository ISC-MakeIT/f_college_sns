import * as React from 'react';

interface Props {
    value: string;
    handleChange(e: any): void;
}

export const MessageInput: React.StatelessComponent<Props> = props => (
    <input
        type='text'
        placeholder='input name'
        value={props.value}
        onChange={props.handleChange}
    />
);
