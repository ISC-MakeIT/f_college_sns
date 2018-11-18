import { User } from '../entities';
import { PhotoService } from '../services/photo';

export interface UserProps {
    student_id: number;
    student_name: string;
    student_class: string;
    profile_photo: string;
    leader_flg: boolean;
}

export class UserFactory {
    public static createFromJSON(user: UserProps) {
        return new User(
            user.student_id,
            user.student_name,
            user.student_class,
            PhotoService.getS3PhotoPath(user.profile_photo),
            user.leader_flg,
        );
    }
}
