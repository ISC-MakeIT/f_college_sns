import * as React from 'react';
import { ProductService } from '../services';
import Screen from './screen';
import { Product } from '../entities';
import { Photo } from '../components/photo';
import { PhotoService } from '../services/photo';

interface Props {
    id: number[];
}

interface State {
    products: Product[];
}

export class Products extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    public async componentDidMount() {
        const products = await ProductService.getAll();
        this.setState({products});
    }

    public render() {
        const products = this.state.products.map( p => {
            const owner = p.owner;
            console.log(p);
            console.log(owner);
            return (
                <div key={p.id} className='product'>
                    <p className='concept'>{p.concept}</p>
                    <p className='owner'>{owner.name}</p>
                    <p>{owner.subject}</p>
                    <img src={owner.profilePhoto} width='100' height='100'/>
                </div>
            );
        });

        return (
            <Screen name='products'>
                <div className='display'>
                    <div>
                        <Photo photoName={'01_Br2A_SHIOYA_Konatsu'} />
                        <Photo photoName={'03_Br2A_MARUYAMA_Shiori'} />
                        <Photo photoName={'04_Br2B_OONUKI_Erii'} />
                        <Photo photoName={'06_FLD2_KITAZAWA_Saaya'} />
                        <Photo photoName={'09_FB1B_MIYAUCHI_Haruka'} />
                        <Photo photoName={'12_FB2_MURAYAMA_Sakura'} />
                        <Photo photoName={'14_FLD1_OKUMA_Aoi'} />
                        <Photo photoName={'17_FLD1_Yamauchi_Ryo'} />
                        <Photo photoName={'22_FLD2_ISHIDA_Hinata'} />
                        <Photo photoName={'28_FLD3_OGURA_Mariko'} />
                    </div>
                </div>
            </Screen>
        );
    }
}
