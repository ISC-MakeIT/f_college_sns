import * as React from 'react';
import Screen from './screen';
import { RouteComponentProps, Link} from 'react-router-dom';
import { Icon } from '../components/icon';
import { Loading } from '../components';

interface Props extends RouteComponentProps<{}> {

}

export class Root extends React.Component<Props, {}> {

    public render() {
        return (
            <Screen name='root' style='d-flex flex-column text-center justify-content-center' hideHeader>
                {/* <Loading /> */}
                <div className='img-container'>
                    <img
                        alt='top page icon'
                        className='icon'
                        src='./assets/images/top/icon.png'
                    />
                    <img
                        alt='top page f-college logo'
                        className='logo'
                        src='./assets/images/top/logo.svg'
                        width={800}
                    />
                </div>

                <Link to='/products' className='link btn btn-sm mt-3' >
                    <div className='circle'>
                        <Icon name='chevron-down' fas />
                    </div>
                </Link>
            </Screen>
        );
    }
};
