import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { ProductService } from '../services';
import Screen from './screen';
import { Product } from '../entities';
import { Photo } from '../components/photo';

interface Props extends RouteComponentProps<{}> {}

interface State {
    products: Product[];
}

export class Products extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    public async componentDidMount() {
        const products = await ProductService.getAll();
        this.setState({products});
    }

    public render() {
        const products = this.state.products.map( p => {
            {/*
                FIXME
                ↓でゴニョごにょしている箇所をコンポーネントにしたい
                <Product key={p.id} product={p} /> のように呼び出して
                同様の処理になるようなコンポーネントを作って欲しい
            */}

            const owner = p.owner;
            console.log(p);
            console.log(owner);
            return (
                <div key={p.id} className='product d-flex flex-column'>
                    <p className='concept'>{p.concept}</p>
                    <p className='owner'>{owner.name}</p>
                    <p>{owner.subject}</p>
                    <img src={p.imageURLPath} width='100' height='100' />
                    <img src={owner.profilePhotoPath} width='100' height='100'/>
                </div>
            );
        });

        return (
            <Screen name='products'>
                <Link to='/products' className='link btn btn-sm mt-3'>
                    '/products'へのリンク
                </Link>
                {products}
                <div className='d-flex flex-wrap'>
                    <Photo photoName={'1_Br2A_SHIOYA_Konatsu'} dirName={'products'} />
                    <Photo photoName={'3_Br2A_MARUYAMA_Shiori'} dirName={'products'} />
                    <Photo photoName={'4_Br2B_OONUKI_Erii'} dirName={'products'} />
                    <Photo photoName={'6_FLD2_KITAZAWA_Saaya'} dirName={'products'} />
                    <Photo photoName={'9_FB1B_MIYAUCHI_Haruka'} dirName={'products'} />
                    <Photo photoName={'12_FB2_MURAYAMA_Sakura'} dirName={'products'} />
                    <Photo photoName={'14_FLD1_OKUMA_Aoi'} dirName={'products'} />
                    <Photo photoName={'17_FLD1_Yamauchi_Ryo'} dirName={'products'} />
                    <Photo photoName={'22_FLD2_ISHIDA_Hinata'} dirName={'products'} />
                    <Photo photoName={'28_FLD3_OGURA_Mariko'} dirName={'products'} />
                </div>
            </Screen>
        );
    }
}
