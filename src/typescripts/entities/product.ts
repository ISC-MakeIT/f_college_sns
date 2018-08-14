import { User } from './';

export class Product {
    public constructor(
        public id: number,
        public title: string,
        public owner: User,
        public concept: string,
        public imageURLPath: string,
        public otherImageURLPath: string[] | null,
        public promotion: string | null,
        public members: string[] | null,
    ) {}
}
