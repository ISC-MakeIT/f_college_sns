import * as React from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import { ProductService } from '../services/product';
import { Loading } from '../components';
import { SubHeader } from '../components';
import { ProductVoteItem } from '../components';
import { Product } from '../entities';
import { ApplicationManager } from '../application_manager';

interface Props extends RouteComponentProps<{}> {}

interface State {
    products: any;
}

export class ProductVoteList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            products: { fashion: [], beauty: [] },
        };
    }

    public async componentDidMount() {
        const products = await ProductService.getVotedProducts();
        this.setState({
            products: {
                fashion: products.fashion, beauty: products.beauty,
            },
        });
    }

    public render() {
        if (this.state.products === null) return( <Loading />);

        const votedProductsToFashion = this.state.products.fashion.map((p: Product) => (
            <ProductVoteItem key={p.productId} product={p} />
        ));
        const votedProductsToBeauty = this.state.products.beauty.map((p: Product) => (
            <ProductVoteItem key={p.productId} product={p} />
        ));

        const appManager = ApplicationManager.instance;

        return(
            <Screen name='product_vote_list' showBackButton>
                <SubHeader category='fashion' count={appManager.remainedVoteCount.fashion}/>
                {votedProductsToFashion}
                <SubHeader category='beauty' count={appManager.remainedVoteCount.beauty}/>
                {votedProductsToBeauty}
            </Screen>
        );
    }
}
