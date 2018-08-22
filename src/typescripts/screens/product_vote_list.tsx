import * as React from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import { Product as ProductEntity } from '../entities/product';
import { ProductService } from '../services/product';
import { Loading } from '../components';

interface Props extends RouteComponentProps<{}> {}

interface State {
    products: ProductEntity[] | null;
}

export class ProductVoteList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            products: null,
        };
    }

    public async componentDidMount() {
        const products = await ProductService.getVotedProducts();
        this.setState({products});
    }

    public render() {
        if (this.state.products === null) return( <Loading />);

        const votedProducts = this.state.products.map( p => (
                <div key={p.id}>
                    <img src={p.owner.profilePhotoPath} alt={p.concept} width='100' height='100'/>
                    <p>{p.owner.name}</p>
                </div>
        ));

        return(
            <Screen name='product_vote_list' showBackButton>
                <div className='d-flex flex-column'>
                    {votedProducts}
                </div>
            </Screen>
        );
    }
}
