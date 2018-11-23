import * as React from 'react';
import { Product as ProductEntity } from '../entities/product';
import { Link } from 'react-router-dom';

interface Props {
    category: string;
}

export class RankSubHeader extends React.Component<Props, {}> {

    public render() {
        const category = this.props.category;
        return (
            <div className='component sub_header'>
                <div className={category === 'fashion' ? 'main_fashion rank' : 'main_beauty rank'}>
                    <h2>{category === 'fashion' ? 'ファッション部門結果' : 'ビューティー部門結果'}</h2>
                </div>
            </div>
        );
    }

}
