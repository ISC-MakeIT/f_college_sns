export class PhotoService {

    public static buildPhotoPath = (name: string, dir: string) => {
        return `${PhotoService.basePhotoPath()}/${dir}/${name}`;
    }

    public static getS3PhotoPath = (img: string, path?: string) => {
        if (path === undefined) {
            return `https://s3-ap-northeast-1.amazonaws.com/f-college-images/${img}`;
        }
        return `https://s3-ap-northeast-1.amazonaws.com/f-college-images/${path}/${img}`;
    }
    private static basePhotoPath = () => './assets/images';
}
