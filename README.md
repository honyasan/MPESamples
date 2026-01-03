# MPESamples

## 概要

このプロジェクトは、Kindle本「Visual Studio CodeとマークダウンでKindle本を出版しよう！」の解説に利用したマークダウンのサンプルです。

まず、VSCode × MPE で実際に出力したファイルがどのようなものになるか、assetsサブフォルダの各ファイルを見るとよいでしょう。

ファイル一式は、画面右上の「<>CODE」をクリックすると、zipファイルでまとめてダウンロードできます。

以下に詳細を記載します。

## 各フォルダについて

|           フォルダ名           |                 説明                 |
| :----------------------------- | :----------------------------------- |
| type1_report                   | レポート風・見出し深さ２まで         |
| type2_report_long              | レポート風・見出し深さ３まで         |
| type3_non_fiction              | ノンフィクション風                   |
| type4_non_fiction_wo_numbering | ノンフィクション風・ナンバリングなし |
| type5_fiction                  | フィクション風                       |
| type6_tategaki_fiction         | 縦書き・フィクション風（試験段階）   |
| type7_paper_like               | 論文風（出力はPDFのみ）              |
| scripts                        | 関連スクリプト                       |

## type1からtype7の各フォルダについて

次のファイルがあります。

- .crossnote　MPEの関連ファイル
  - config.js　MPEのファイル（初期状態のまま）
  - head.html　MPEのファイル（初期状態のまま）
  - parser.js　MPEのファイルで、和文用にマークダウンをカスタマイズするJavaScript
  - style.les　MPEのファイルで、CSSにより各種スタイルを指定している
- assets　MPEから実際に出力したファイル（HTML/EPUB/PDF）
- mpee.lua　MPEからEPUBを出力する動作をカスタマイズするLuaスクリプト
- test.md　サンプルのマークダウン
- .jpg, .png　サンプル画像

次のようにファイルを確認すると効率がよいでしょう。

1. assetsフォルダのファイルを見て、目的の様式として十分かを確認する。
1. VSCodeからフォルダをワークスペースとして開き、test.mdを変更してみる。

## scriptフォルダについて

|      ファイル名       |                            説明                            |
| :-------------------- | :--------------------------------------------------------- |
| GetFontFamily.ps1     | フォントファミリ名を表示するPowerShellスクリプト           |
| GetFontFamilySjis.ps1 | フォントファミリ名を表示するPowerShellスクリプト（SJIS用） |
| parser_debug.js       | parser.jsのデバッグ版                                      |
| parser_tester.js      | parser.jsのデバッグ用起動スクリプト                        |
| collectTocPage.js     | HTMLとPDFを突合して目次の対象ページを調べるツール          |
| pdfinfo.js            | PDFファイル中の画像の解像度を調べるツール                  |

## GetFontFamilyスクリプトについて

インストール済みフォントのフォントファミリ名を表示するPowerShellスクリプトです。  
PowerShellを開き、以下のようにスクリプトを実行します。

```PowerShell
> cd （GetFontFamily.ps1があるディレクトリ）
> .\GetFontFamily.ps1
```

文字コードがShiftJISの環境で正常に動作しない場合は、代わりにGetFontFamilySjis.ps1を実行してください。

## parser.jsのデバッグ環境について

VSCodeからparser_test.jsを起動すると、parser_debug.js内の関数を呼び出してデバッグできます。  
デバッグ用のファイルは、testサブフォルダに配置します。

テストデータはonWillParseMarkdown、onDidParseMarkdown関数の入口で`throw new Error(markdown);`を有効にすると、MPEから呼び出された際のデータをテキストでキャッチして利用できます。

## collectTocPage.jsについて

1. マークダウンに@import [TOC]形式により目次を埋め込ませます。
1. 目次を`:::pdf-toc`と`:::`で囲みます。
1. MPEからHTML出力します。
1. MPEからPDF出力します。
1. 以下のように実行します。

```PowerShell
> node collectTocPage.js test.html -p test.pdf
```

正常にスクリプトが起動すると、HTMLを読み込んで目次を解析します。  
次にPDFを読み込んで、目次の項目に対応するページを調査し、出力します。

スクリプトの起動で試行錯誤するより、手作業で目次の番号を調べて付与した方が早いでしょう。  
参考のために公開しています。

## pdfinfo.jsについて

Popplerを利用して、PDFファイル中の画像の解像度を調査するスクリプトです。

1. Popplerをインストールします。
1. 以下のように実行します。

```PowerShell
> node pdfinfo.js test.pdf -p C:\Uty\poppler
```

参考のために公開しています。

## ライセンスについて

このプロジェクトは、MITライセンスのもとで公開されています。詳細はLICENSEファイルをご覧ください。
