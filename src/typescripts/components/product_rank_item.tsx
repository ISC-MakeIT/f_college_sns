import * as React from 'react';
import { RankingProduct } from '../entities';

interface Props {
    product: RankingProduct;
}

export class ProductRankItem extends React.Component < Props, {} > {

    public render() {
        const rankProduct = this.props.product;
        const product = rankProduct.product || null;
        if (!product) return null;

        return (
            <li className='rank_sub_list' onClick={this.linkClick}>
                <span className='rank'>{rankProduct.ranking}</span>
                <p>
                    <span>{product.theme}</span>
                    {product.owner.studentName}
                </p>
                <img src={product.headShot} alt={product.theme}/>
            </li>
        );
    }

    private linkClick = () => {
        window.location.href = window.location.origin + '/products/' + this.props.product.productId;
    }

}
