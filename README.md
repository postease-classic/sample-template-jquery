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

- **[LAMP環境でホスティング](https://jquery-bsc.postease-sample.com)**

- **[Github Pages で静的ホスティング](https://github.postease-sample.com)**

- **[Amazon S3 で静的ホスティング](http://s3.postease-sample.com/index.html)**




---


## 2. 管理画面へのログイン

#### [POSTEASEの管理画面にログイン](https://manage.postease-sample.com)して自由にコンテンツの編集をしていただけます。  

```
URL
https://manage.postease-sample.com

アカウント
user

パスワード
111111
```

- **毎時00分**にすべてのデータがリセットされます。
- 複数のユーザが同時に管理画面にログインする可能性があります。
- 不適切な投稿や画像のアップロードはお控えいただけますようお願いいたします。  



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
