import * as React from 'react';
import {Product} from '../entities/product';

interface Props {
    product: Product;
}

export class ProductRankItem extends React.Component < Props, {} > {

    public render() {
        const product = this.props.product;
        const owner = product.owner;

        return (
            <section className='component product_votes_list'>
                <section className='main_sub_list'>
                <p>
                    <span>{owner.studentClass} {owner.studentName}</span>
                    {product.concept}
                </p>
                <img src={product.headShot} alt='' />
                </section>
            </section>
        );
    }

}
