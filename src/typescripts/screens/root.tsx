import * as React from 'react';
import Screen from './screen';

export class Root extends React.Component<{}, {}> {

    public render() {
        return (
            <Screen name='root'>
                <h2>
                    rootほげ。
                </h2>
            </Screen>
        );
    }
}
