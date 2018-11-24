import * as React from 'react';
import { Product } from '../entities';
import { Modal } from './';

interface Props {
    product: Product;
    open: boolean;
    suggestedProducts: any[];
    onClose(): void;
}

export const VotedModal: React.StatelessComponent<Props> = props => {
    const owner = props.product.owner;
    const suggestedProducts = props.suggestedProducts.map((product: Product, index: number) => {
        return (
            <div
                key={index}
                className='suggested-product'
                onClick={() => window.location.href = window.location.origin + '/products/' + product.productId}
            >
                <img
                    className='short-product-thumb'
                    src={product.headShot}
                />
                <span className='product-label'>{product.theme}</span>
            </div>
        );
    });

    return (
        <Modal
            open={props.open}
            heading='投票が完了しました'
            className='vote-modal'
            onClose={props.onClose}
        >
            <div className='product voted-card'>
                <img className='product-thumb' src={props.product.headShot}/>
                <div className='right-container'>
                        <p className='right-container__title'>{props.product.theme}</p>
                        made by
                    <p className='creator'>{owner.studentName}</p>
                </div>
            </div>

            <p className='suggest-product-title'>他の作品も閲覧しませんか？</p>
            <div className='suggest-product-container'>
                {suggestedProducts}
            </div>

            <button className='vote-button-ext' onClick={props.onClose}>
                <span>閉じる</span>
            </button>
        </Modal>
    );
};
