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
            </header>
        );
    }

}

const BackButton = withRouter(props => (
    <Icon
        name='arrow-left'
        className='back-button'
        onClick={() => props.history.goBack()}
    />
));
