import * as React from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';

interface Props extends RouteComponentProps<{}> {}

export const NotFound: React.StatelessComponent<Props> = () => {
    return (
        <Screen name='not-found' hideHeader hideFooter>
            <section className='text-center'>
                <div className='content-title'>
                    <h1 className='404'>
                        404
                    </h1>
                    <p>PAGE NOT FOUND</p>
                </div>

                <div className='content-nav'>
                    <p>お探しのページは</p>
                    <p>見つかりませんでした</p>
                </div>

                <Link className='btn btn-light redirect-link' to='/'>
                    トップページへ戻る
                </Link>
            </section>
        </Screen>
    );
};
