import * as React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Icon} from '../components';
import { ApplicationManager } from '../application_manager';

interface Props {
    showBackButton?: boolean;
}

export class Header extends React.PureComponent<Props, {}> {

    public render() {
        return (
            <header id='header_wrap' className='component'>
                {this.props.showBackButton ? <BackButton/> : null}
                <div
                    className='header-logo'
                    onClick={async () => {
                        await ApplicationManager.instance.changeActiveCategory('fashion');
                        window.location.href = window.location.origin + '/products';
                    }}
                >
                <img
                    alt='header-logo'
                    className='header_logo'
                    src='../assets/images/logo_png.png'
                />
                </div>
                {location.pathname.includes('/products') ? <RankingLink /> : <ProductsLink />}
            </header>
        );
    }
}

const BackButton = withRouter(props => (<div className='back-arrow' onClick={() => props.history.goBack()}/>));

const RankingLink = withRouter(props => (
    <Link to='/ranking'>
        <div id='header_label'>
            <Icon name='crown'/>
            <span>投票結果</span>
        </div>
    </Link>
));

const ProductsLink = withRouter(props => (
    <Link to='/products'>
        <div id='header_label'>
            <Icon name='th-large'/>
            <span>作品一覧</span>
        </div>
    </Link>
));
