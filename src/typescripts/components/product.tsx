import * as React from 'react';
import { ProductList } from '../entities';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from '@tjoskar/react-lazyload-img';
import { Icon } from './icon';
import { PhotoService } from '../services/photo';

interface Props {
    product: ProductList;
}

export class Product extends React.PureComponent<Props, {}> {

    public render() {
        const product = this.props.product;
        const owner = product.owner;
        const imagePath = PhotoService.getS3PhotoPath('loading.svg', 'app/logos');

        return (
            <div key={product.productId} className='component product'>
                <Link to={`/products/${product.productId}`} className='link-container'>
                    <LazyLoadImage width='46.2vmin' height='100%' defaultImage={imagePath} image={product.headShot}/>
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
