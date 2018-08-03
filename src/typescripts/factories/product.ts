import { Product } from '../entities';

export class ProductFactory {
    public static createFromJSON(product: any) {
        return new Product(
            product.id,
            product.owner,
            product.concept,
            product.imageURLPath,
        );
    }
}
