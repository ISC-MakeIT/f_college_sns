import * as React from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import { Product as ProductEntity } from '../entities/product';
import { ProductService } from '../services/product';
import { Loading } from '../components';
import { RankSubHeader } from '../components';
import { ProductVotesList } from '../components';

interface Props extends RouteComponentProps<{}> {}

interface State {
    products: ProductEntity[] | null;
}

export class ProductRank extends React.Component<Props, State> {

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

        const votedProductsRank = this.state.products.map( p => (
            // ここをいい感じにランキング形式にする
            <ProductVotesList key={p.productId} product={p} />
        ));

        return(
            <Screen name='product_vote_list' showBackButton>
                <RankSubHeader category='fashion'/>
                <RankSubHeader category='beauty'/>
                {votedProductsRank}
            </Screen>
        );
    }
}
