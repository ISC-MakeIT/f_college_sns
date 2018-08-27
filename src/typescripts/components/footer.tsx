import * as React from 'react';
import { Product as ProductEntity } from '../entities/product';
import { Link } from 'react-router-dom';

interface Props {
}

export class Footer extends React.Component<Props, {}> {

    public render() {
        return (
            <footer>
                <nav id='footer_menu'>
                    <div class='footer_fashion'>ファッション部門</div>
                    <div class='footer_beauty'>ビューティー部門</div>
                </nav>
            </footer>
        );
    }

}