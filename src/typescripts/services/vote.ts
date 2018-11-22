import { ApiClient } from '../infrastructure';
import { ApplicationManager } from '../application_manager';

export class VoteService {
    public static async vote(method: 'POST' | 'DELETE', productId: number) {
        if (method === 'POST') {
            if (!this.canIncrement) return;
            // this.increment(productId);
        } else {
            // this.decrement(productId);
        }
    }

    private static canIncrement() {
        const appManager = ApplicationManager.instance;
        return true;
        // appManager.voteIds;
        // appManager.remainedVoteCount;
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
