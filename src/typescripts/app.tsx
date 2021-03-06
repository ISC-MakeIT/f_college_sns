import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Screens from './screens';
import { InitializationService } from './services';
import { ApplicationManager } from './application_manager';

class App extends React.Component<{}, {loaded: boolean}> {
    public async componentDidMount() {
        try {
            await InitializationService.isPrivateMode().then(isPrivate => {
                // tslint:disable-next-line:no-console
                console.log('Is in private mode: ', isPrivate);
                if (isPrivate) alert('プライベートウインドウでは正常に動作しない場合があるため通常のブラウザをご利用ください。');
            });

            // インスタンス初期化 && 今後使うなら変数を利用するs
            const _ = ApplicationManager.instance;
        } catch (e) {} // tslint:disable-line:no-empty
    }

    public render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Screens.Root}/>
                    <Route exact path='/products' component={Screens.Products}/>
                    <Route exact path='/products/:id' component={Screens.ProductShow}/>
                    <Route exact path='/votes' component={Screens.ProductVoteList} />
                    <Route exact path='/ranking' component={Screens.ProductRank} />
                    <Route path='*' component={Screens.NotFound} />
                </Switch>
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));
