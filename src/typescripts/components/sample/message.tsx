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
    // outputValue: string;
    outputArray: any[];
}

export class Message extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: '',
            // outputValue: '',
            outputArray: [],
        };
    }

    public render() {
        const messages = this.state.outputArray.map( e => <Messages hello='Hello' value={e} />);
        return (
            <div className='sample'>
                <MessageInput value={this.state.inputValue} handleChange={this.handleChange} />
                <Button handleClick={this.handleClick} />
                {messages}
            </div>
        );
    }

    private handleChange = (e: any): void => {
        this.setState({inputValue: e.target.value});
    }

    private handleClick = (): void => {
        this.setState({
            inputValue: '',
            outputArray: this.state.outputArray.concat(this.state.inputValue),
        });
           // outputValue: this.state.inputValue,
    }

}
