import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Screens from './screens';

class App extends React.Component<{}, {loaded: boolean}> {
    public async componentDidMount() {
        try {
            // await Initialization.initialize();
        } catch (e) {} // tslint:disable-line:no-empty
    }

    public render() {
        // TODO ロードして。
        // if(!this.state) return null;
        return (
            <Router>
                <Switch>
                    <Route path='/' component={Screens.Root}/>
                    <Route exact path='/sample' component={Screens.Sample} />
                    {/* <Route> */}
                </Switch>
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));
