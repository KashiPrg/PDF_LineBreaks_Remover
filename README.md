# PDF_LineBreaks_Remover
Chromeに、最後にコピーした文字列中の改行を取り除く機能を追加する拡張機能です。  
PDF文書などのテキストをコピーすると、ページ幅の制限によって文が折り返されている箇所に改行が入ることがあります。  
コピーしたテキストをそのまま貼り付けると、文の途中であるにもかかわらず改行が何度も挟まれたテキストが貼り付けられてしまいます。これでは非常に使い勝手が悪く、また、挟まれた改行を毎度消すことにも労力がかかります。  
この拡張機能は、そういった現象に対処するための機能を提供します。

### 使い方

Chromeで開いているページ内で右クリックすると、右クリックメニューに`最後にコピーした文字列中の改行を取り除く`というものがあります。  
それを選択すると、最後にコピーした文字列中の改行を取り除いた文字列を、新たにクリップボードにコピーします。

また、わざわざ右クリックして選んでという手順が面倒な方は、`Ctrl+G`で同じことができます。

改行を取り除く都合上、段落が分けられているなどで改行が必要な箇所であっても取り除いてしまいます。  
したがって、段落分けを保ちたい場合は、

- 段落を考慮せずすべてのテキストをコピーして拡張機能を適用し、目的の箇所に貼り付けた後、元の文書のように段落分けをする
- 段落ごとにテキストをコピーして拡張機能を適用し、目的の箇所に貼り付ける

などの方法をおすすめします。  
前者は段落の最後の文面を探すのが大変なので、個人的には後者のほうが労力が少ないと考えています。

### 機能だけ使いたい場合

機能だけ使いたい場合は、クローンしたリポジトリの中にある`dist`ディレクトリをChromeに取り込んでください。  
詳細な手順は以下のとおりです。

1. [Chromeの拡張機能管理ページ](chrome://extensions/)にアクセスします。
1. ページ右上の`デベロッパーモード`をオンにします。
1. ページ左上の`パッケージ化されていない拡張機能を読み込む`を押して、クローンしたリポジトリの中にある`dist`ディレクトリを指定します。
1. 読み込んだ拡張機能(PDF LineBreaks Remover)がオンになっていることを確認します。
1. ページの中を右クリックして、出てきたメニューの中に`最後にコピーした文字列中の改行を取り除く`があることを確認します。

### 改良を加えたい場合

この拡張機能はTypeScriptによって記述されていますが、このリポジトリにはTypeScriptのコンパイルに必要なリソースが含まれていません。  
この拡張機能を改良したい場合は、クローンしたリポジトリのルートディレクトリで

```
`npm install --save-dev typescript ts-loader webpack webpack-cli webpack-dev-server copy-webpack-plugin @types/chrome`
```

を実行してください。私もこれを作った当時(2020-10-29)は全くの初心者なので、いくらか不要なリソースが含まれているかもしれません。  
また、このコマンドの実行には`node.js`が必要なので、別途インストールしてください。

`npx webpack --mode production`を実行すると、`dist`ディレクトリ以下にビルドした拡張機能が配置されます。  
Chromeにこの拡張機能を読み込んでいない場合は、読み込めば変更後の拡張機能が利用できます。  
すでにこの拡張機能を読み込んでいた場合は、[Chromeの拡張機能管理ページ](chrome://extensions/)でこの拡張機能をリロードすれば変更が適用されます。

---

## Change Log

#### ver 0.1.0

- 最後にコピーした文字列中の改行を取り除いた文字列を新たにクリップボードにコピーする機能を追加(右クリックメニューとCtrl+Gショートカット)