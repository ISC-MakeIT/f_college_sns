import * as React from 'react';
import { ProductList } from '../entities';
import { Link } from 'react-router-dom';
import { Icon } from './icon';

interface Props {
    product: ProductList;
}

export class Product extends React.Component<Props, {}> {

    public render() {
        const product = this.props.product;
        const owner = product.owner;

        return (
            <div key={product.productId} className='component product'>
                <Link to={`/products/${product.productId}`} className='link-container'>
                    <img src={product.headShot} className='product-img'/>
                    <div className='product-creator'>
                        <div className='product_number'/>
                        <div className='owner-area'>
                            <p className='owner-subject'>{product.theme}</p>
                            <p className='owner-name'>{owner.studentName}</p>
                        </div>
                        <img src={owner.profilePhoto} className='profile_image'/>
                    </div>
                    <p className='likes-count'/>
                </Link>
            </div>
        );
    }

}
