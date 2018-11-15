import { Product, User } from '../entities';
import { UserFactory } from './user';
import { PhotoService } from '../services/photo';

type ProductType = 'fashion' | 'beauty';
interface ProductJsonType {
    product_id: number;
    genre: ProductType;
    theme: string;
    concept: string;
    members: User[];
    photos: string[];
}

export class ProductFactory {
    public static createFromJSON(p: ProductJsonType ) {
        return new Product(
            p.product_id,
            p.genre,
            p.theme,
            p.concept,
            p.members.map(m => UserFactory.createFromJSON(m)),
            p.photos.map(p => PhotoService.getS3PhotoPath(p)),
        );
    }
}
