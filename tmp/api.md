- 一覧画面API

```javascript
[
    {
        image_url: string,
        owner: {
            name: string,
            subject: string,
            profile_photo_path: string,
        },
        like_count: integer,
    },
    {
        image_url: '1_Br2A_SHIOYA_Konatsu.jpg',
        owner: {
                name: '山下 美月',
                subject: 'ブライダル科 ３年',
                image_url: 'yamashitamizuki_prof',
            },
        like_count: 10,
    },
    {
    image_url: '2_Br2A_TATEHASHI_Yui.jpg',
    owner: {
            name: '西野 七瀬',
            subject: 'ビューティ科 １年',
            image_url: 'nishinonanase_prof'
        },
    like_count: 10,
    }
]
```

---------------------

詳細画面

```javascript
{
    id: integer,
    image_url: string,
    like_count: integer,
    concept: string,
    Point: [string, string, string],
    owner: {
        name: string,
        subject: string,
        image_url: string,
        message: string,
    },
}

--------------------------------------------------

{
    id: 1,
    image_url: '1_Br2A_SHIOYA_Konatsu.jpg',
    like_count: 100,
    concept: '作品コンセプト',
    Point: ['作品概要', 'アピールポイント', '機能面'],
    owner: {
        name: '西野 七瀬',
        subject: 'ビューティ科 １年',
        image_url: 'nishinonanase_prof',
        s: 'hogehoge'
    },
}
```
