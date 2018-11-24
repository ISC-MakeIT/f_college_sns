import * as React from 'react';
import {Product} from '../entities/product';

interface Props {
    product: Product;
}

export class ProductVoteItem extends React.Component < Props, {} > {

    public render() {
        const product = this.props.product;
        const owner = product.owner;

        return (
            <section className='component product_votes_list' onClick={this.linkClick}>
                <section className='main_sub_list'>

                <img src={this.props.product.headShot} alt=''/>
                <p>
                    <span>{product.theme}</span>
                    {owner.studentName}
                </p>
                <div className='list_arrow'/>
                </section>
            </section>
        );
    }

    private linkClick = () => {
        window.location.href = window.location.origin + '/products/' + this.props.product.productId;
    }
}
