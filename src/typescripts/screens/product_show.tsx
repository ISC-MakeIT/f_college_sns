import * as React from 'react';
import { ProductService } from '../services';
import { RouteComponentProps } from 'react-router-dom';
import Screen from './screen';
import {Product} from '../entities';

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
        console.log(this.state.product); // tslint:disable-line:no-console

        if (this.state.product === null ) {
            // TODO loading
            return ( <></>);
        }

        return (
            <Screen name='product_show'>
                <h1 className='title'>
                    {this.state.product.title}
                </h1>
            </Screen>
        );
    }
}

