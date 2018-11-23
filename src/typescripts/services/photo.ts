export class PhotoService {

    public static buildPhotoPath = (name: string, dir: string) => {
        return `${PhotoService.basePhotoPath()}/${dir}/${name}`;
    }

    public static getS3PhotoPath = (img: string, path?: string) => {
        const awsURL = 'https://image.fc-fb-live.com';
        if (path === undefined) {
            return `${awsURL}/${img}`;
        }
        return `${awsURL}/${path}/${img}`;
    }
    private static basePhotoPath = () => './assets/images';
}
