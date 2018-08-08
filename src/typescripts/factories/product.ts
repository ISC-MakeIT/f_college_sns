import { Product } from '../entities';

export class ProductFactory {
    public static createFromJSON(product: any) {
        return new Product(
            product.id,
            product.title,
            product.owner,
            product.concept,
            product.imageURLPath,
            product.otherImageURLPath,
            product.promotion,
            product.members,
        );
    }
}
