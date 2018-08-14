export class User {
    public constructor(
        public id: number,
        public name: string,
        public subject: string,
        public profilePhotoPath: string,
    ) {}

    public get profilePhoto() {
        return 'public/assets/images/users/' + this.profilePhotoPath;
    }
}
