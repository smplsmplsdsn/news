# news
お知らせ情報を簡単に更新できるツール(埋め込み型)

## 前提条件

PHPを使ってJSONファイルを生成しているため、phpが使える環境であること

## 設置方法

最低限必要なファイルは、下記5つ。
ファイルはどこにおいても問題ない。

- news-config.php
- news-edit.css
- news-edit.js
- news-edit-custom.js
- news-json.php

### html

1. 3つのファイル(news-design.css, news-edit.js, news-edit-custom.js) を読み込むようにパス指定する
1. お知らせエリアの要素に、class属性「js-news」を追加して、data-json属性に「jsonファイル生成ファイルパス」指定する
1. 編集するエリアを表示するためのリンク(class属性「js-news-link」を追加したリンク)をbody内に記載する
1. データを表示する側の要素に、class属性「js-news-data」を追加する
1. news-edit-custom.js でコーディングする

### php

news-config.php
**重要** デフォルトでは誰でも更新できる状態のため、判別処理を適宜追記する

