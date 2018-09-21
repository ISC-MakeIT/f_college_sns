import * as React from 'react';
import { ProductService } from '../services';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import {Product} from '../entities';
import { Loading, Icon } from '../components';
import { PhotoService } from '../services/photo';

interface Props extends RouteComponentProps<{id: number}> {}

interface State {
    product: Product | null;
    activeImagePath?: string;
}

export class ProductShow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            product: null,
        };
    }

    public async componentDidMount() {
        const product = await ProductService.get(this.props.match.params.id);
        this.setState({ product });
        this.setState({ activeImagePath: product.imageURLPath });
    }

    public render() {

        if (this.state.product === null ) return ( <Loading />);

        const subImages = ['01.png', '02.png', '11.png', '17.png'].map(i => {
            const path = PhotoService.getS3PhotoPath(i, 'products/sample');
            return (
                // tslint:disable-next-line:jsx-key
                <p className='img-container'>
                    <img src={path} width={100} height={100} />
                </p>
            );
        });

        const product = this.state.product;

        subImages.unshift(
            <p className='img-container'>
                {/* FIXME URL */}
                {/* <img src={product.imageURLPath} width={100} height={100} /> */}
                <img
                    src={'/assets/images/products/1_Br2A_SHIOYA_Konatsu.jpg'}
                    width={100}
                    height={100}
                />
            </p>);

        // const activeImage = this.state.activeImagePath;
        const activeImage = '/assets/images/products/1_Br2A_SHIOYA_Konatsu.jpg';

        return (
            <Screen name='product-show' showBackButton>
                {/*
                    <h1 className='title'>
                        {this.state.product.title}
                    </h1>
                */}
                <div className='image-container'>
                    <img
                        className='product-img'
                        src={activeImage}
                    />
                    <div className='sub-images-container d-flex'>
                        {subImages}
                    </div>
                </div>

                <div className='product-container'>
                    <div className='separator'/>
                    <div className='concept'>
                        <h2>Concept</h2>
                        <p className='text'>hogehoge fugafuga</p>
                    </div>
                    <div className='separator'/>
                    <div className='creators'>
                        <h2>Creator</h2>
                        <div className='main-creator text'>
                            <div className='d-flex justify-content-around'>
                                <div>
                                    <p className='subject'>
                                        ブライダル科 １年
                                        <span className='name'>
                                            山田花子
                                        </span>
                                    </p>

                                    <p className='comment'>
                                        ドレスのバラっぽい所を頑張りました。
                                    </p>
                                </div>
                                <img
                                    src='/assets/images/users/yamashitamizuki_prof.jpg'
                                    className='profile-img'
                                    width={65}
                                    height={65}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bottom'>
                    <button
                        className='vote-button'
                    >
                        <Icon name='crown'/>
                        投票する
                    </button>
                </div>

                {/*
                    <Link to='/products' className='link btn btn-sm mt-3'>
                        '/products'へのリンク
                    </Link>
                */}
            </Screen>
        );
    }
}
