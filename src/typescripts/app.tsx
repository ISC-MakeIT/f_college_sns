import * as React from 'react';
import { render } from 'react-dom';
import {Message} from './components/sample/message';

class App extends React.Component<{}, {loaded: boolean}> {
    public async componentDidMount() {
        try {
            // await Initialization.initialize();
        } catch (e) {}
    }

    public render() {
        // TODO ロードして。
        // if(!this.state) return null;
        return (
            <Message hello='hello' />
        );
    }
}

render(<App/>, document.getElementById('app'));
