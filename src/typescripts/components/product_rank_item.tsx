import * as React from 'react';
import { RankingProduct } from '../entities';

interface Props {
    product: RankingProduct;
}

export class ProductRankItem extends React.Component < Props, {} > {

    public render() {
        const product = this.props.product;

        return (
                <li className='rank_sub_list'>
                <p>
                    <span>{product.theme}</span>
                    {product.leader}
                </p>
                {/* <img src={product.headShot} alt='' /> */}
                <img src='https://cdn.kdkw.jp/cover_1000/321507/321507000276.jpg' alt=''/>
                </li>
        );
    }

}
