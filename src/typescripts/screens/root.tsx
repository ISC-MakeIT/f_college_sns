import * as React from 'react';
import Screen from './screen';
import { RouteComponentProps, Link} from 'react-router-dom';
import { Icon } from '../components/icon';
import { Loading } from '../components';
import { PhotoService } from '../services/photo';

interface Props extends RouteComponentProps<{}> {

}

export class Root extends React.Component<Props, {}> {

    public render() {
        return (
            <Screen name='root' style='d-flex flex-column text-center justify-content-center' hideHeader hideFooter>
                {/* <Loading /> */}
                <div className='img-container'>
                    <img
                        alt='top page icon'
                        className='icon'
                        src={`${PhotoService.s3basePhotoPath()}/logos/icon.png`}
                    />
                    <img
                        alt='top page f-college logo'
                        className='logo'
                        src={`${PhotoService.s3basePhotoPath()}/logos/logo.svg`}
                    />
                </div>

                <Link to='/products' className='link btn btn-sm mt-3' >
                    <div className='circle'>
                        <i className='root_icon' />
                    </div>
                </Link>
            </Screen>
        );
    }
}
