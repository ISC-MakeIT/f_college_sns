import { User } from '../entities';

export class UserFactory {
    public static createFromJSON(account: any) {
        return new User(
            account.id,
            account.name,
            account.subject,
            account.profilePhotoPath,
        );
    }
}
