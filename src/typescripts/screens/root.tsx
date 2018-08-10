import * as React from 'react';
import Screen from './screen';
import { RouteComponentProps, Link} from 'react-router-dom';
import { Loading } from '../components';

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
                <Link to='products/1' className='link'>
                    'product/:id'へのリンク
                </Link>
                <Loading />
            </Screen>
        );
    }
}
