import { User } from './';
export type ProductType = 'FASHION' | 'BEAUTY';
export type ProductLowerType = 'fashion' | 'beauty';

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

    public get genreLowerCase(): ProductLowerType {
        return this.genre === 'FASHION' ? 'fashion' : 'beauty';
    }

    public get headShot() {
        if (this.photos == null || this.photos.length < 0) return '';
        return this.photos[0];
    }

}
