import * as React from 'react';
import { Product as ProductEntity } from '../entities/product';
import { Link } from 'react-router-dom';

interface Props {
    product: any;
}

export class ProductVotesList extends React.Component<Props, {}> {

    public render() {
        const product = this.props.product;
        const owner = product.owner;
        return (
            <div className='component product_votes_list'>
                <section className='main_sub_list'>
                    {/* <img src="icon/owner_01.html" alt=""> */}
                    <p>
                        <span>{owner.subject} {owner.name}</span>
                        {product.concept}
                    </p>
                    <div className='list_arrow'/>
                </section>
            </div>
        );
    }

}