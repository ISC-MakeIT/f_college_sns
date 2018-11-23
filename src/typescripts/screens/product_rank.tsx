import * as React from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import { Product as ProductEntity } from '../entities/product';
import { ProductService } from '../services/product';
import { Loading } from '../components';
import { RankSubHeader } from '../components';
import { ProductRankList } from '../components';

interface Props extends RouteComponentProps<{}> {}

interface State {
    products: any;
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

        return(
            <Screen name='product_vote_list' showBackButton>
                <RankSubHeader category='fashion'/>
                <RankSubHeader category='beauty'/>
                {ProductRankList}
                <ul className='component product_votes_list rank-list'>
                    <li className='component product_votes_list'>
                        <section className='rank_sub_list'>
                        <p>
                            <span>ブライダル科1年 山田花子</span>
                            コンセプト
                        </p>
                        <img src='./assets/images/users/kizunaai.jpeg' alt=''/>
                        </section>
                    </li>
                    <li className='component product_votes_list'>
                        <section className='rank_sub_list'>
                        <p>
                            <span>ブライダル科1年 山田花子</span>
                            コンセプト
                        </p>
                        <img src='./assets/images/users/kizunaai.jpeg' alt=''/>
                        </section>
                    </li>
                </ul>
            </Screen>
        );
    }
}
