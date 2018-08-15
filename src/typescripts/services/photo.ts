export class PhotoService {
    public static buildPhotoPath = (name: string) => {
        const _ = [
            '01_Br2A_SHIOYA_Konatsu',
            '02_Br2A_TATEHASHI_Yui',
            '03_Br2A_MARUYAMA_Shiori',
            '04_Br2B_OONUKI_Erii',
            '05_Br2B_NEMOTO_Maho',
            '06_FLD2_KITAZAWA_Saaya',
            '07_FB1A_NAKANO_Kaito',
            '08_FB1A_ALABADO_Natasha',
            '09_FB1B_MIYAUCHI_Haruka',
            '10_FB2_KAYANUMA_Azumi',
            '11_FB2_KIMURA_Takaya',
            '12_FB2_MURAYAMA_Sakura',
            '13_FLD1_ISHIZAWA_Asahi',
            '14_FLD1_OKUMA_Aoi',
            '15_FLD1_SUZUKI_Syota',
            '16_FLD1_MATSUMURA_Misaki',
            '17_FLD1_Yamauchi_Ryo',
            '18_FLD2_KATO_Sotaro',
            '19_FLD2_GOTO_Amii',
            '20_FLD2_TAKAHASHI_Ren',
            '21_FLD2_NARUSE_Kaede',
            '22_FLD2_ISHIDA_Hinata',
            '23_FLD2_TAKAHASHI_Kokoro',
            '24_FLD3_OGAWA_Aimi',
            '25_FLD3_OSHITARI_Fuka',
            '26_FLD3_KOHARA_Hiroki',
            '27_FLD3_NOGUCHI_Aika',
            '28_FLD3_OGURA_Mariko',
            '29_FLD3_HIRAMA_Haruki',
            '30_FLD3_SUZUKI_Minatsu',
        ];

        return `./public/assets/images/products/${name}.jpg`;
    }
}
