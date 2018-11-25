import * as React from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import { Product, RankingProduct } from '../entities';
import { ProductService, RankingService } from '../services';
import { RankSubHeader, ProductRankItem, Loading } from '../components';

interface Props extends RouteComponentProps<{}> {}

interface State {
    products: any;
}

export class ProductRank extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            products: { fashion: [], beauty: [] },
        };
    }

    public async componentDidMount() {
        const products = await RankingService.ranking();
        this.setState({products: {
            fashion: products.fashion,
            beauty: products.beauty,
        }});
    }

    public render() {
        if (this.state.products === null) return( <Loading />);

        const fashionRankingProducts = this.state.products.fashion.map((p: RankingProduct) => <ProductRankItem key={p.productId} product={p} />);
        const beautyRankingProducts = this.state.products.beauty.map((p: RankingProduct) => <ProductRankItem key={p.productId} product={p} />);

        return(
            <Screen name='product_vote_list' showBackButton>
                <RankSubHeader category='fashion'/>
                {fashionRankingProducts}
                <RankSubHeader category='beauty'/>
                {beautyRankingProducts}
            </Screen>
        );
    }
}
