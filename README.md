
# 開発において

- 基本はISSUE、PRベースでの開発フローにする（詳しくは後述）
- ISSUEおよびPRはできるだけテンプレにしたがい、Viewを作成した際はスクショを貼り付けたい。

- 開発する際

```javascript
// 初めてときもしくは新たにパッケージを更新などしたとき npm install
$ npm start
// これでTypescript,Scss共にコンパイルされる
```

---------------------------------------------------------------------

## ISSUEについて

- イシュー作るタイミング

1. 新規機能提案
2. Bug報告
3. 何か質問などあれば

TODO

https://tech.gamewith.co.jp/entry/2018/05/22/154951


    ISSUEタイトル -> Bug：〇〇が正常に機能していない

    内容は 何をしたいのか。どうしてしたいのか。それしてどうなるのか。この三つを記載すること。

## PRについて

- 基本的にPRApproveされることをマージ条件とする。
    - 同学年でも疑問におもったらすぐ聞こう。
        - [コードレビューの極意。それは「自分のことは棚に上げる」こと！！](https://qiita.com/jnchito/items/0a0b46106681f41f2f0e)
        - [コードレビューが辛くなった時は](http://c5meru.hatenablog.jp/entry/2017/11/10/235107)


- PRを出すとき、作業に入るときに注意したいこと。

    BranchNameは `${ISSUE_Number}/${作業内容}`のようにすること。 (like : 149/bug_fix_message_send_func)

    ISSUE番号のあとにprefixとして以下を採用するとわかりやすくなる気がする。

    ```
        feat: A new feature
        fix: A bug fix
        docs: Documentation only changes
        style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        refactor: A code change that neither fixes a bug nor adds a feature
        perf: A code change that improves performance
        test: Adding missing or correcting existing tests
        chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
    ```

- PRのdescriptionには

    - ISSUE番号
    - なにを実装したのか
    - どう実装したのか
    - 現状の問題点（特に確認して）もらいたいこと
    などを記載したい。


- [わかりやすいプルリクを目指して
](https://qiita.com/ChurappsWatatani/items/7bf1ef3b6dce3e21c96c)
- [
コミットメッセージアンチパターン: コメント対応](http://koic.hatenablog.com/entry/2016/11/19/000000)

# Docs

    FIXME: 雑に書きすぎてしまった。

## components

  ### ざっくり概要

  - Componentとなる粒度の物を配置する。
    ここでいうコンンポーネントは二画面以上で使い回す or 一画面でしか利用しないがJSXの可読性を上げるために分割した粒度を分割する基準の一つとする。
    ただし↑のルールにとらわれず、Atomicデザインレベルでの分割をしても基本的には動けばおk。
  - 基本的に１コンポーネント1 styleで管理したい。

  ### how2use

  　`src/typescripts/components/`に新規のComponetファイル(${sample}.tsx)を作成したら

```typescript
  export class Sample extends React.Component<{}, {}> { }
```

  のようにファイル名を**CamelCase**にしたクラス名にて作成する

  その後 `src/typescripts/components/index.ts`というファイルにて

  > export * from './sample';

  のようにexportするように宣言をする

## entities

  ### ざっくり概要

    フロントエンドでの型定義のような物
    このEntitiesのインスタンスとしてフロント側で管理することでAPIからうけとったJsonをオブジェクトのように扱えるようにしている。

    Viewファイルから直接触ることはすくなく、factory層にてApiレスポンスを受け取った時の初期化に利用する

    新規にあつかうプロパティを追加する時はここのコンストラクタに追加し、それぞれ`new Class`としている箇所のプロパティを変更してやれば良い。

## factries

  ### ざっくり概要

    APIレスポンス（JSON）を受け取りフロントエンドでのインスタンスに作り直すクラス。
    受け取った値の加工などがあれば簡易な物ならここでやってしまっても良いかも。
    entitiesのコンストラクタを使ってインスタンスを返却する。

  ### how2use

    `***.createFromJSON(ApiRes)`とすることで呼び出すことが可能なのでAPIのレスポンスを受け取った後によび出して上げる。

## infrastructure

  ### ざっくり概要

    汎用性の高いクラスを置く場所、現状はApiClientを管理している

## screens

  ### ざっくり概要
    それぞれの画面を表示している箇所。
    新規ページをつくるさいは基本的にはここを編集して新規の物を作成する。

## services

  ### ざっくり概要
    Viewにおきたくないような処理をおく。

  ### how2use
   `***Service.***`として呼び出すことが多そう。


 最後になってしまったが、基本的に新規のファイルを作成したらそのDirにある`index.ts`にて **export**することが必須。
 'scss'の場合は`application.scss` での **import宣言** なのでうまく動かない場合はそこらへんを疑うといいかも
