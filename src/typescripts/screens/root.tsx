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
                <h2>
                    this is Root Component
                </h2>
                <Link to='/products'>
                    '/products'へのリンク
                </Link>
            </Screen>
        );
    }
}
