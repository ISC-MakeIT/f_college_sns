export class Product {
    public constructor(
        public id: number,
        public title: string,
        public owner: string,
        public concept: string,
        public imageURLPath: string,
        public otherImageURLPath: string[] | null,
        public promotion: string | null,
        public members: string[] | null,
    ) {}
}
