import { ApiClient } from '../infrastructure';
import { ApplicationManager } from '../application_manager';
import { ProductType } from '../entities';

export class VoteService {
    public static async vote(method: 'POST' | 'DELETE', productId: number, genre: ProductType) {
        if (!this.canIncrement(genre)) return;
        if (method === 'POST') {
            // this.increment(productId);
        } else {
            // this.decrement(productId);
        }
    }

    private static canIncrement(genre: ProductType) {
        const appManager = ApplicationManager.instance;
        const maxVoteCount = genre.toLowerCase() === 'fashion' ? ApplicationManager.FASHION_VOTE_COUNT : ApplicationManager.BEAUTY_VOTE_COUNT;
        const voteIds = appManager.voteIds[genre.toLowerCase()];

        return maxVoteCount > voteIds.length - 1 ? true : false;
    }

    private static increment(productId: number) {
        console.log('increment');
        // ApiClient.post(`/vote/${productId}`);
    }

    private static decrement(productId: number) {
        console.log('decrement');
        // ApiClient.delete(`/vote/${productId}`);
    }
}
