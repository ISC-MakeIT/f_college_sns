import * as React from 'react';
import { ProductService } from '../services';
import { Product } from '../entities';

interface Props {
    entryOrder: number | undefined;
    product: Product;
}

export class ProductShowFooter extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    public render() {

        if (!this.props.entryOrder) return null;

        const entryOrder = this.props.entryOrder;
        const prevProductId = ProductService.entryOrder2ProductIdMapperByValue(this.props.product.genre, entryOrder - 1);
        const nextProductId = ProductService.entryOrder2ProductIdMapperByValue(this.props.product.genre, entryOrder + 1);

        const prevUrl = `/products/${prevProductId}`;
        const nextUrl = `/products/${nextProductId}`;

        return (
            <footer>
                <nav id='footer_menu'>
                {
                    prevProductId ?
                        <div className='footer_fashion' onClick={() => this.linkClick(prevUrl)} >＜ PREV</div> :
                        <div className='footer_fashion' />
                }
                {
                    nextProductId ?
                        <div className='footer_beauty' onClick={() => this.linkClick(nextUrl)} >NEXT ＞</div> :
                        <div className='footer_beauty' />
                }
                </nav>
            </footer>
        );
    }

    private currentURL = () => window.location.href.replace(window.location.pathname, '');

    private linkClick = (url: any) => {

        const productId = this.props.product.productId;
        const genre = this.props.product.genre;
        if (genre === 'FASHION') {
            if (20 < productId && productId < 51) {
                return (window.location.href = this.currentURL() + url);
            }
        } else if (genre === 'BEAUTY') {
            if ( 0 < productId && productId < 21) {
                return (window.location.href = this.currentURL() + url);
            }
        }
    }
}
