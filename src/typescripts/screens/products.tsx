import * as React from 'react';
import { ProductService } from '../services';
import { RouteComponentProps } from 'react-router-dom';
import Screen from './screen';
import { Product } from '../entities';
import { Photo } from '../components/photo';
import { createPhotoPath } from '../components/createPhotoPath';

interface Props {
    id: number[];
}

interface State {
    products: Product[];
    photoPath: string[];
}

export class Products extends React.Component<Props, State> {
public id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    constructor(props: Props) {
        super(props);
        this.state = {
            photoPath: createPhotoPath(this.id),
        };
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
                        <Photo photoPath={this.state.photoPath[0]} />
                        <Photo photoPath={this.state.photoPath[1]} />
                        <Photo photoPath={this.state.photoPath[2]} />
                        <Photo photoPath={this.state.photoPath[3]} />
                        <Photo photoPath={this.state.photoPath[4]} />
                        <Photo photoPath={this.state.photoPath[5]} />
                        <Photo photoPath={this.state.photoPath[6]} />
                        <Photo photoPath={this.state.photoPath[7]} />
                        <Photo photoPath={this.state.photoPath[8]} />
                        <Photo photoPath={this.state.photoPath[9]} />
                    </div>
                </div>
            </Screen>
        );
    }
}
