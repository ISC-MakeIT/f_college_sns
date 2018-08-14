import { ApiClient } from '../infrastructure';
import { UserFactory } from '../factories';
import { User } from '../entities';

export class UserService {

    public static async getAll() {
        // ApiClient.get('/users')

        const array = [];
        for (let i = 0; i < 3; i++) {
            const u = new User(
                i,
                this.userPhotoNames()[i].name,
                this.userPhotoNames()[i].subject,
                this.userPhotoNames()[i].path,
            );
            array.push(u);
        }
        return array;
    }

    public static async get(id: number) {
        // const ret = ApiClient.get(`api/users/${id}`);
        // const account = UserFactory.createFromJSON(ret);
        return new User(
            id,
            this.userPhotoNames()[id].name,
            this.userPhotoNames()[id].subject,
            this.userPhotoNames()[id].path,
        );
    }

    private static userPhotoNames() {
        return [
            {name: '山下 美月', subject: 'ブライダル科 ３年', path: 'yamashitamizuki_prof.jpg'},
            {name: '西野 七瀬', subject: 'ビューティ科 １年', path: 'nishinonanase_prof.jpg'},
            {name: '鈴木 絢音', subject: 'ファッション科 ２年', path: 'suzukiayane_prof.jpg'},
        ];
    }
}
