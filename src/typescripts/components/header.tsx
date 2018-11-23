import * as React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Icon} from '../components';
import { ApplicationManager } from '../application_manager';

interface Props {
    showBackButton?: boolean;
}

export class Header extends React.Component < Props, {} > {

    public render() {
        const appManager = ApplicationManager.instance;
        const remainVoteCount = appManager.remainedVoteCount.beauty + appManager.remainedVoteCount.fashion;
        const showIcon = remainVoteCount !== 0 ? <div className='label_push'>{remainVoteCount}</div> : null;

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
                        <span>あと{remainVoteCount}票</span>
                        {showIcon}
                    </div>
                </Link>
            </header>
        );
    }
}

const BackButton = withRouter(props => (<div className='back-arrow' onClick={() => props.history.goBack()}/>));
