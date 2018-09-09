import * as React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Icon} from '../components';
import { PhotoService } from '../services/photo';

interface Props {
    showBackButton?: boolean;
}

export class Header extends React.Component < Props, {} > {

    public render() {
        return (
            <header id='header_wrap' className='component'>
                {this.props.showBackButton ? <BackButton/> : null}
                <Link to='/' className='header-logo'>
                <img
                    alt='header-logo'
                    className='header_logo'
                    src={PhotoService.getS3PhotoPath('logo.svg', 'logos')}
                />
                </Link>
                <Link to='/votes'>
                    <div id='header_label'>
                        <Icon name='crown'/>
                        <span>あと５票</span>
                        <div className='label_push'>5</div>
                    </div>
                </Link>
            </header>
        );
    }
}

const BackButton = withRouter(props => (<div className='back-arrow' onClick={() => props.history.goBack()}/>));
