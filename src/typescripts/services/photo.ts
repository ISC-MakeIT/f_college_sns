import { Constants } from '../infrastructure/constants';

export class PhotoService {

    public static buildPhotoPath = (name: string, dir: string) => {
        return `${PhotoService.basePhotoPath()}/${dir}/${name}`;
    }

    public static s3basePhotoPath = () => {
        return `https://s3-ap-northeast-1.amazonaws.com/f-college-images`;
    }

    public static getS3Image = (type: 'logos' | 'products', name: string) => {
        const params = {
            Bucket: 'f-college-images',
            Key: `${type}/${name}`,
        };

        Constants.s3Client.getObject(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                // debugger
                return;
            }
            console.log(data);
            // debugger
        });
    }

    public static buildPhotoPathFromId = (id: number) => {
        const imageNames = [
            '1_Br2A_SHIOYA_Konatsu.jpg',
            '2_Br2A_TATEHASHI_Yui.jpg',
            '3_Br2A_MARUYAMA_Shiori.jpg',
            '4_Br2B_OONUKI_Erii.jpg',
            '5_Br2B_NEMOTO_Maho.jpg',
            '6_FLD2_KITAZAWA_Saaya.jpg',
            '7_FB1A_NAKANO_Kaito.jpg',
            '8_FB1A_ALABADO_Natasha.jpg',
            '9_FB1B_MIYAUCHI_Haruka.jpg',
            '10_FB2_KAYANUMA_Azumi.jpg',
            '11_FB2_KIMURA_Takaya.jpg',
            '12_FB2_MURAYAMA_Sakura.jpg',
            '13_FLD1_ISHIZAWA_Asahi.jpg',
            '14_FLD1_OKUMA_Aoi.jpg',
            '15_FLD1_SUZUKI_Syota.jpg',
            '16_FLD1_MATSUMURA_Misaki.jpg',
            '17_FLD1_Yamauchi_Ryo.jpg',
            '18_FLD2_KATO_Sotaro.jpg',
            '19_FLD2_GOTO_Amii.jpg',
            '20_FLD2_TAKAHASHI_Ren.jpg',
            '21_FLD2_NARUSE_Kaede.jpg',
            '22_FLD2_ISHIDA_Hinata.jpg',
            '23_FLD2_TAKAHASHI_Kokoro.jpg',
            '24_FLD3_OGAWA_Aimi.jpg',
            '25_FLD3_OSHITARI_Fuka.jpg',
            '26_FLD3_KOHARA_Hiroki.jpg',
            '27_FLD3_NOGUCHI_Aika.jpg',
            '28_FLD3_OGURA_Mariko.jpg',
            '29_FLD3_HIRAMA_Haruki.jpg',
            '30_FLD3_SUZUKI_Minatsu.jpg',
        ];

        const img = imageNames.find(i => Number(i.split('_')[0]) === id) || '';
        // ${PhotoService.getS3Image('products', img)}
        // debugger
        return `${PhotoService.getS3Image('products', img)}`;
    }

    private static basePhotoPath = () => './assets/images';
}
