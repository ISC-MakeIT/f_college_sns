import * as React from 'react';
import Screen from './screen';
import { RouteComponentProps, Link} from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {

}

export class Root extends React.Component<Props, {}> {

    public render() {
    // TODO TOPページはここに書くか。
    // 　もしくは他に書いたのを呼ぶだけ.現状は導線用のリンクをはるだけにしてる
        return (
            <Screen name='root'>
                <h1 className='title'>
                    this is Root Component
                </h1>
                <Link to='/products' className='link'>
                    '/products'へのリンク
                </Link>
            </Screen>
        );
    }
}
