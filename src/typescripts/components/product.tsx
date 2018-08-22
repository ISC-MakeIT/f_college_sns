import * as React from 'react';
import { Product as ProductEntity } from '../entities/product';

interface Props {
    product: ProductEntity;
}

export class Product extends React.Component<Props, {}> {

    public render() {
        const product = this.props.product;
        const owner = product.owner;

        return (
            <div key={product.id} className='product d-flex flex-column'>
                <img src={product.imageURLPath} className='product-img'/>
                    <p className='concept'>{product.concept}</p>
                    <p className='owner'>{owner.name}</p>
                    <p>{owner.subject}</p>
                    <img src={owner.profilePhotoPath} className='profile_image'/>
            </div>
        );
    }

}
