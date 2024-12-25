# MPESamples

## 概要

このプロジェクトは、Kindle本「Visual Studio CodeとマークダウンでKindle本を出版しよう！」の解説に利用したマークダウンのサンプルである。

まず、VSCode × MPE で実際に出力したファイルがどのようなものになるか、assetsサブフォルダの各ファイルを見てもらうのが良いだろう。

画面右上の「CODE」をクリックすると、zipファイルでまとめてダウンロードできる。

以下に詳細を記載する。

## 各フォルダについて

- tategaki_kindle　縦書きの例
- yokogaki_chouhen_kindle　長編（複数mdファイル）の使用例
- yokogaki_kindle　横書きで、PandocによりKindle Previewerを前提にしたEUB形式を得る場合の例
- yokogaki_pdf　横書きで、Chrome(puppeteer)によりPDF形式を得る場合の例
- yokogaki_plane_pdf　横書きで、スタイルシートを空にした場合の例

## サブフォルダについて

- .crossnote　VSCode×MPEで参照されるワークスペース毎のファイル。主にスタイルをあてている。
- .vscode　使用したVSCodeのワークスペースの設定
- assets　実際に出力したファイル

## ライセンスについて

このプロジェクトは、MITライセンスのもとで公開されています。詳細はLICENSEファイルをご覧ください。
