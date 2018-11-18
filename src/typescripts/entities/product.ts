import { User } from './';
type ProductType = 'fashion' | 'beauty';

export class Product {
    public constructor(
        public productId: number,
        public genre: ProductType,
        public theme: string,
        public concept: string,
        public members: User[],
        public photos: string[] | null,
    ) {}

    public get owner() {
        return this.members.find(m => m.leaderFlg) || this.members[0];
    }
}
