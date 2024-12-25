# MPESamples

## 概要

このプロジェクトは、Kindle本「Visual Studio CodeとマークダウンでKindle本を出版しよう！」の解説に利用したマークダウンのサンプルである。

まず、VSCode × MPE で実際に出力したファイルがどのようなものになるか、assetsサブフォルダの各ファイルを見てもらうのが良いだろう。

画面右上の「<>CODE」をクリックすると、zipファイルでまとめてダウンロードできる。

以下に詳細を記載する。

## 各フォルダについて

- tategaki_kindle　縦書きの例
- yokogaki_chouhen_kindle　長編（複数mdファイル）の使用例
- yokogaki_kindle　横書きで、PandocによりKindle Previewerを前提にしたEUB形式を得る場合の例
- yokogaki_minutes_pdf　議事録をイメージした簡素なスタイルの場合の例
- yokogaki_pdf　横書きで、Chrome(puppeteer)によりPDF形式を得る場合の例
- yokogaki_plane_pdf　横書きで、スタイルシートを空にした場合の例

## サブフォルダについて

- .crossnote　VSCode×MPEで参照されるワークスペース毎のファイル。主にスタイルをあてている。
- .vscode　使用したVSCodeのワークスペースの設定
- assets　実際に出力したファイル

## その他

これらのサンプルは厳格なCSSではなく（テーマをリセットしない）、VSCodeの次のテーマ設定の影響を受ける。

- Markdown-preview-enhanced: Preview Theme

KDPではライト系とダーク系のどちらにも切替できること、という要件があり、「リーダーの設定」に影響を受けるようにしている。
ライト系とダーク系と両方に適用しやすいスタイルにしたつもりではあるが、印刷などを考慮してどちらかというとライト系のテーマの方が違和感がないだろう。
もし普段使用しているテーマがダーク系なら、制作で使用した atom-light を選択してみて欲しい。

## ライセンスについて

このプロジェクトは、MITライセンスのもとで公開されています。詳細はLICENSEファイルをご覧ください。
