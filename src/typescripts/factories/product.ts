import { Product } from '../entities';
import { UserFactory } from './user';

export class ProductFactory {
    public static createFromJSON(product: any) {
        const owner = UserFactory.createFromJSON(product.owner);
        return new Product(
            product.id,
            product.title,
            owner,
            product.concept,
            product.imageURLPath,
            product.otherImageURLPath,
            product.promotion,
            product.members,
        );
    }
}
