import * as React from 'react';
import { Product } from '../entities/product';
import { Link } from 'react-router-dom';

interface Props {
    product: Product;
}

export class ProductVotesList extends React.Component<Props, {}> {

    public render() {
        const product = this.props.product;
        const owner = product.owner;
        return (
            <section className='component product_votes_list'>
                <section className='main_sub_list'>
                    <img src='./assets/images/users/kizunaai.jpeg' alt=''/>
                    <p>
                        <span>{owner.subject} {owner.name}</span>
                        {product.concept}
                    </p>
                    <div className='list_arrow'/>
                </section>
            </section>
        );
    }

}
