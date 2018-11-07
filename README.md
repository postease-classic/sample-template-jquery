# POSTEASE SAMPLE
## 静的サイトへのCMS組込みサンプル


ヘッドレスCMS「POSTEASE（ポストイーズ）」を利用して、**javascript（jQuery）のみでCMSを組込んだWEBサイト**のサンプルソースです。静的サイトへの実装コードを確認していただけるとともに、実際にPOSTEASEの管理画面を操作しデータの反映をご確認いただけます。

### このページから以下のことができます。 

1. 静的サイト上で動的コンテンツが動作するサンプルサイトの確認
2. 管理画面にログインしコンテンツを編集
3. ファイルのダウンロード、実装コードの確認


---


## 1. サンプルサイトの確認

サンプルサイトは３通りのホスティングをしています。
（すべて同じ内容です）

#### [LAMP環境でホスティング](https://jquery-bsc.postease-sample.com)

#### [Github Pages で静的ホスティング](https://postease-cms.github.io/sample-template-jquery-basic)

#### [Amazon S3 で静的ホスティング](https://s3-ap-northeast-1.amazonaws.com/postease.net)


※ Github Pages および Amazon S3 には独自ドメインをあてていません。


---


## 2. 管理画面へのログイン

#### [POSTEASEの管理画面にログイン](https://manage.postease-sample.com)してコンテンツの編集ができます。  

```
URL
https://manage.postease-sample.com

アカウント
user

パスワード
111111
```

- 管理画面から登録したデータは不特定多数のユーザーから閲覧される可能性があります。不適切な内容の投稿はお控えいただけますようお願いいたします。  
- **毎時00分**にすべてのデータがリセットされます。


---


## 3. ファイルのダウンロード

https://github.com/postease-cms/sample-template-jquery-basic/archive/master.zip

ソースをダウンロードしてzipファイルを解凍後、index.html をブラウザで開いてください。
ローカルでもPOSTEASEからデータを取得して表示することを確認いただけます。

---

## その他留意事項

- Github Pages およびローカル環境で動作させるため、あえてURLは整形していません。
- ローカルではソーシャルボタンなどが正常に機能しません。


---

## バージョン履歴

**現在のバージョン 1.0**

- v1.0 (05.Nov.2018, first release)
