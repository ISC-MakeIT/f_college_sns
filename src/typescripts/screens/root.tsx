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
            <Screen name='root' style='d-flex flex-column text-center justify-content-center'>
                <h1 className='title mb-4'>
                    this is Root Component
                </h1>
                <Link to='/products' className='link btn btn-sm mt-3'>
                    '/products'へのリンク
                </Link>
                <Link to='products/1' className='link btn btn-sm mt-3'>
                    'product/:id'へのリンク
                </Link>

                <Loading />
            </Screen>
        );
    }
}
