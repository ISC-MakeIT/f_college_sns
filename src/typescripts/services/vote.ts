import { ApiClient } from '../infrastructure';
import { ApplicationManager } from '../application_manager';
import { ProductType, Product } from '../entities';

export class VoteService {
    public static async vote(method: 'POST' | 'DELETE', productId: number, genre: ProductType) {
        if (method === 'POST') {
            this.increment(productId, genre);
        } else {
            this.decrement(productId, genre);
        }
    }

    public static canIncrement(genre: ProductType) {
        const appManager = ApplicationManager.instance;
        const maxVoteCount = genre.toLowerCase() === 'fashion' ? ApplicationManager.FASHION_VOTE_COUNT : ApplicationManager.BEAUTY_VOTE_COUNT;
        const voteIds = appManager.voteIds[genre.toLowerCase()];

        const beVoter = maxVoteCount > voteIds.length ? true : false;
        return beVoter;
    }

    public static includeVoteId(product: Product) {
        const appManager = ApplicationManager.instance;
        const type = product.genre.toLowerCase() === 'fashion' ? 'fashion' : 'beauty';

        return appManager.voteIds[type].includes(product.productId);
    }

    private static async increment(productId: number, genre: ProductType) {
        await ApiClient.post(`/vote/${productId}`);
        const appManager = ApplicationManager.instance;
        appManager.pushVoteIds(productId, genre);
    }

    private static async decrement(productId: number, genre: ProductType) {
        await ApiClient.delete(`/vote/${productId}`);
        const appManager = ApplicationManager.instance;
        appManager.popVoteIds(productId, genre);
    }
}
