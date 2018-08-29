import * as React from 'react';
import { ProductService } from '../services';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import {Product} from '../entities';
import { Loading } from '../components';

interface Props extends RouteComponentProps<{id: number}> {}

interface State {
    product: Product | null;
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
        this.setState({product});
    }

    public render() {
        if (this.state.product === null ) return ( <Loading />);

        return (
            <Screen name='product_show'>
                <h1 className='title'>
                    {this.state.product.title}
                </h1>
                <Link to='/products' className='link btn btn-sm mt-3'>
                    '/products'へのリンク
                </Link>
            </Screen>
        );
    }
}
