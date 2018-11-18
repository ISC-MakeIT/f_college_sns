import { UserFactory } from './user';
import { ProductList, User } from '../entities';

type ProductType = 'fashion' | 'beauty';
interface OwnerProps {
    student_id: number;
    student_name: string;
    student_class: string;
    profile_photo: string;
    leader_flg: boolean;
}

interface ProductProps {
    product_id: number;
    entry_order: number;
    product_number: number;
    head_shot: string;
    owner: OwnerProps;
}

export class ProductListFactory {
    public static createFromJSON(p: ProductProps) {
        return new ProductList(
            p.product_id,
            p.entry_order,
            p.head_shot,
            UserFactory.createFromJSON(p.owner),
        );
    }
}