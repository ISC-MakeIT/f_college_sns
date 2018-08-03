import * as React from 'react';
import Screen from './screen';
import { Message } from '../components/sample/message';

export class Sample extends React.Component<{}, {}> {
    public render() {
        return (
            <Screen name='sample'>
                <h2>
                    sample
                </h2>
                <Message hello='message' />
            </Screen>
        );
    }
}
