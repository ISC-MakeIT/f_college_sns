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

export class ProductRank extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            products: { fashion: [], beauty: [] },
        };
    }

    public async componentDidMount() {
        const products = await RankingService.ranking();

        this.setState({
            products: {
                fashion: products.fashion,
                beauty: products.beauty,
            },
        });
    }

    public render() {
        if (JSON.stringify(this.state.products) === JSON.stringify({ fashion: [], beauty: [] })) return (<Loading />);

        const fashionRankingProducts = this.state.products.fashion.map((p: RankingProduct) => <ProductRankItem key={`fashion_${p.productId}`} product={p} />);
        const beautyRankingProducts = this.state.products.beauty.map((p: RankingProduct) => <ProductRankItem key={`beauty_${p.productId}`} product={p} />);

        return(
            <Screen name='product_vote_list'>
                <RankSubHeader category='fashion'/>
                <ul className='component product_votes_list rank-list'>
                {fashionRankingProducts}
                </ul>
                <RankSubHeader category='beauty'/>
                <ul className='component product_votes_list rank-list'>
                {beautyRankingProducts}
                </ul>
            </Screen>
        );
    }
}
