import * as React from 'react';
import {Product} from '../entities/product';

interface Props {
    product: Product;
}

export class ProductVotesList extends React.Component < Props, {} > {

    public render() {
        const product = this.props.product;
        const owner = product.owner;

        // TODO
        return (
            <section className='component product_votes_list'>
                <section className='main_sub_list'>

                <img src='./assets/images/users/kizunaai.jpeg' alt=''/>
                <p>
                    <span>{owner.studentClass} {owner.studentName}</span>
                    {product.concept}
                </p>
                <div className='list_arrow'/>
                </section>
            </section>
        );
    }

}
