import * as React from 'react';
import { Product as ProductEntity } from '../entities/product';
import { Link } from 'react-router-dom';

interface Props {
    product: ProductEntity;
}

export class Product extends React.Component<Props, {}> {

    public render() {
        const product = this.props.product;
        const owner = product.owner;

        return (
            <div key={product.id} className='component product d-flex flex-column'>
                <Link to={`/products/${product.id}`} className=''>
                    <img src={product.imageURLPath} className='product-img'/>
                    <div className='product-creator d-flex flex-row align-items-center'>
                        <div className='mt-3 ml-5'>
                            <p className='owner-subject'>{owner.subject}</p>
                            <p className='owner-name'>{owner.name}</p>
                        </div>
                        <img src={owner.profilePhotoPath} className='profile_image'/>
                    </div>
                </Link>
            </div>
        );
    }

}
