import { User } from './';

export class ProductList {
    public constructor(
        public productId: number,
        public entryOrder: number,
        public headShot: string,
        public owner: User,
        public theme: string,
    ) { }
}
