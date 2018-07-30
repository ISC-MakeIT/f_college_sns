import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MessageInput} from './message_input';
import {Messages} from './messages';
import {Button} from './button';

interface Props {
    hello: string;
}

interface State {
    inputValue: string;
    outputValue: string;
}

export class Message extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: '',
            outputValue: '',
        };
    }

    public render() {
        return (
            <div>
                <MessageInput value={this.state.inputValue} handleChange={this.handleChange} />
                <Button handleClick={this.handleClick} />
                <Messages hello='Hello' value={this.state.outputValue} />
            </div>
        );
    }

    private handleChange = (e: any): void => {
        this.setState({inputValue: e.target.value});
    }

    private handleClick = (): void => {
        this.setState({inputValue: '', outputValue: this.state.inputValue});
    }

}
