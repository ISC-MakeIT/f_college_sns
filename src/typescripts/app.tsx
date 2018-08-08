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
                    <Route exact path='/' component={Screens.Root}/>
                    <Route exact path='/products' component={Screens.Products}/>
                    <Route exact path='/products/:id' component={Screens.ProductShow}/>
                </Switch>
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));
