import * as React from 'react';
import { Product } from '../entities';
import { Modal } from './';

interface Props {
    open: boolean;
    votedProducts: any[];
    onClose(): void;
    selectDeleteImage(e: any): void;
    voteSwitch(e: any): void;
}

export const RefuseVoteModal: React.StatelessComponent<Props> = props => {
    const votedProducts = props.votedProducts.map((product: Product, index: number) => {
        return (
            <p
                key={index}
                className='delete-image-box'
                onClick={props.selectDeleteImage}
                data-product-id={Number(product.productId)}
            >
                <img
                    className='re-vote-product-image'
                    src={product.headShot}
                />
            </p>
        );
    });

    return (
        <Modal
            open={props.open}
            heading='投票権がありません'
            className='re-vote-modal'
            onClose={props.onClose}
        >
            <p className='re-vote-text'>
                このままこの作品への投票を希望する場合は以下の投票済みリストから投票をキャンセルする作品をお選びください
            </p>
            <div className='re-vote-image-list'>
                {votedProducts}
            </div>
            <button className='re-vote-button'　onClick={props.voteSwitch}>
                <span>投票を取り消す</span>
            </button>
        </Modal>
    );
};
