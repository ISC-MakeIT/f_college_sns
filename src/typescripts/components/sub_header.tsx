import * as React from 'react';
import { Product as ProductEntity } from '../entities/product';
import { Link } from 'react-router-dom';

interface Props {
    category: string;
    count: number;
}

export class SubHeader extends React.Component<Props, {}> {

    public render() {
        const category = this.props.category;
        return (
            <div className='component sub_header'>
                <div key={1} className={category === 'fashion' ? 'main_fashion' : 'main_beauty'}>
                    <h2>{category === 'fashion' ? 'ファッション部門' : 'ビューティー部門'}</h2>
                    <div className='main_list_votes'>
                    あと<span>{this.props.count}</span>票
                    </div>
                </div>
            </div>
        );
    }

}
