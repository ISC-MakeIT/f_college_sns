import {Product} from '../entities';
import {UserFactory, UserProps} from './user';
import {PhotoService} from '../services/photo';

type ProductType = 'fashion' | 'beauty';
export interface ProductJsonType {
    product_id: number;
    genre: ProductType;
    theme: string;
    concept: string;
    members: UserProps[];
    photos: string[];
}

export class ProductFactory {
    public static createFromJSON(p: ProductJsonType) {
        return new Product(
            p.product_id,
            p.genre,
            p.theme,
            p.concept,
            p.members.map((m: UserProps) => UserFactory.createFromJSON(m)),
            p.photos.map((photoPath: string) => PhotoService.getS3PhotoPath(photoPath)),
        );
    }
}
