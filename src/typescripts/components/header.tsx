import * as React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Icon} from '../components';

interface Props {
    showBackButton?: boolean;
}

export class Header extends React.Component < Props, {} > {

    public render() {
        return (
            <header id='header_wrap' className='component'>
                {this.props.showBackButton ? <BackButton/> : null}
                <Link to='/products' className='header-logo'>
                <img
                    alt='header-logo'
                    className='header_logo'
                    src='../assets/images/logo_png.png'
                />
                </Link>
                <Link to='/votes'>
                    <div id='header_label'>
                        <Icon name='crown'/>
                        <span>あと5票</span>
                        <div className='label_push'>5</div>
                    </div>
                </Link>
            </header>
        );
    }
}

const BackButton = withRouter(props => (<div className='back-arrow' onClick={() => props.history.goBack()}/>));
