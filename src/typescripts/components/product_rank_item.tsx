import * as React from 'react';
import { RankingProduct } from '../entities';

interface Props {
    product: RankingProduct;
}

export class ProductRankItem extends React.Component < Props, {} > {

    public render() {
        const product = this.props.product;

        return (
            <section className='component product_votes_list'>
                <section className='main_sub_list'>
                <p>
                        <span>{product.theme}</span>
                    {product.leader}
                </p>
                {/* <img src={product.headShot} alt='' /> */}
                </section>
            </section>
        );
    }

}
