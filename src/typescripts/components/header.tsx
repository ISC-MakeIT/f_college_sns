import * as React from 'react';
import {withRouter, Link } from 'react-router-dom';
import { Icon } from '../components';

interface Props {
    showBackButton?: boolean;
}

export class Header extends React.Component<Props, {}> {

    public render() {

        return (
            <header className='component header'>
                {this.props.showBackButton ? <BackButton/> : null}
                <Link to='/' className='header-logo'>
                    <img src='./assets/images/top/logo.png' alt='header-logo'/>
                </Link>
                <div className='ribbon mt-2'>
                    <Link to='/votes' className='link btn btn-sm mt-3' >
                        <Icon name='crown' fas />
                    </Link>
                </div>
            </header>
        );
    }
}

const BackButton = withRouter(props => (
    <Icon
        name='angle-left'
        className='back-button'
        onClick={() => props.history.goBack()}
        fas
    />
));
