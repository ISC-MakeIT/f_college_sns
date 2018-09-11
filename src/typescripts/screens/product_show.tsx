import * as React from 'react';
import { ProductService } from '../services';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import {Product} from '../entities';
import { Loading } from '../components';
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
                <img src={product.imageURLPath} width={100} height={100} />
            </p>);

        const activeImage = this.state.activeImagePath;

        return (
            <Screen name='product_show' showBackButton>
                {/*
                    <h1 className='title'>
                        {this.state.product.title}
                    </h1>
                */}
                <img
                    className='product-img'
                    src={activeImage}
                />
                <div className='sub-images-container d-flex'>
                    {subImages}
                </div>

                <div className='product-container'>
                    <div className='concept'>
                        <h2>Concept</h2>
                        <p>作品のコンセプト</p>
                    </div>
                    <div className='creators'>
                        <h2>Creator</h2>
                        <div className='main creator'>
                            <div>
                                <p className='subject'>
                                    ブライダル科 １年
                                    <span className='name'>
                                        山田花子
                                    </span>
                                </p>
                                <p className='comment'>
                                    ドレスのバラっぽい所を頑張りました。j
                                </p>
                            </div>
                            <img
                                src=''
                            />
                        </div>
                    </div>
                <Link to='/products' className='link btn btn-sm mt-3'>
                    '/products'へのリンク
                </Link>
            </Screen>
        );
    }
}
