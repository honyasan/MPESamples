---
title: "チートシート"
author:
  - "サンプルマン"
date: "December 25, 2024"
subtitle: "markdownのテスト"
lang: "ja-JP"
dir: "ltr"
cover-image: cover.jpg
link:
  - rel: stylesheet
    href: .crossnote/style.less
html:
  print_background: true
  embed_local_images: true
  embed_svg: true
  offline: true
puppeteer:
  format: "A5"
  landscape: false
  margin:
    top: 9.6mm
    right: 0mm  
    bottom: 9.6mm
    left: 0mm
output:
  custom_document:
    path: "test.epub"
    pandoc_args: [
      "--css=.crossnote/style.less",
      "--highlight-style=tango",
      "--mathml",
      "--standalone"
    ]
---
# チートシート{ignore=true .noPageBreak}

## はじめに{ignore=true .noPageBreak}

このドキュメントはVSCode×MPE×Pandocで、html(offline)形式・Chrome(puppeteer) PDF形式・Pandoc EPUB形式に出力するマークダウンを書くためのスタイルを適用したチートシートです。

本文各行はKindle Previewerが許可するEPUB形式に出力できないものもあるので記載内容に注意してください。

## 目次{ignore=true .noPageBreak}

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [マークダウンの見出しサンプル・見出しレベル２ー１](#マークダウンの見出しサンプル見出しレベル2ー1)
  - [見出しレベル３－１](#見出しレベル3-1)
    - [見出しレベル４－１](#見出しレベル4-1)
    - [見出しレベル４－２](#見出しレベル4-2)
  - [見出しレベル３－２](#見出しレベル3-2)
    - [見出しレベル４－３](#見出しレベル4-3)
    - [見出しレベル４－４](#見出しレベル4-4)
- [マークダウンの各サンプル](#マークダウンの各サンプル)
  - [強調](#強調)
  - [リスト](#リスト)
  - [タスクリスト](#タスクリスト)
  - [図・画像](#図画像)
  - [図・画像の回り込み](#図画像の回り込み)
  - [リンク](#リンク)
  - [引用](#引用)
  - [水平線](#水平線)
  - [インラインコード](#インラインコード)
  - [コードブロック](#コードブロック)
  - [表](#表)
  - [絵文字](#絵文字)
  - [上付き・下付き文字](#上付き下付き文字)
  - [脚注](#脚注)
  - [マーク](#マーク)
  - [数式](#数式)
  - [ルビ](#ルビ)
    - [Admonition](#admonition)

<!-- /code_chunk_output -->

## マークダウンの見出しサンプル・見出しレベル２ー１

### 見出しレベル３－１

#### 見出しレベル４－１

##### 見出しレベル５－１

###### 見出しレベル６－１

#### 見出しレベル４－２

##### 見出しレベル５－２

###### 見出しレベル６－２

### 見出しレベル３－２

#### 見出しレベル４－３

#### 見出しレベル４－４

## マークダウンの各サンプル

### 強調

この日本語は*斜体*にならないことがあります。  
これも _斜体_ にならないことがあります。  
このテキストは **強調（太字）** になります。  
これも __強調（太字）__ になります。  
*これらを **組み合わせ** られます*  
これは~~取り消し線~~になります。

### リスト

箇条書きの例１

- 食う
  - 食う
    - 食う
- 寝る
  - 寝る
    - 寝る
- 遊ぶ
  - 遊ぶ
    - 遊ぶ

箇条書きの例２

1. 食う
1. 寝る
1. 遊ぶ
    1. 食う
    1. 寝る
    1. 遊ぶ
        1. 食う
        1. 寝る
        1. 遊ぶ

箇条書きの例３

+ 食う
+ 寝る
+ 遊ぶ

箇条書きの例４

* 食う
* 寝る
* 遊ぶ

### タスクリスト

タスクリストの表現はEPUB形式へ出力すると致命的なエラーとなるので要注意。

```markdown
- [x] 完了したアクションアイテム１
- [x] 完了したアクションアイテム２
- [ ] 残課題１

```

### 図・画像

画像のサンプル。

![幅・小の表示](sample.jpg){.xSmall}

![幅・大の表示](sample.jpg "図マウスオーバータイトル"){.xLarge}

![幅・特大の表示](sample.jpg "図マウスオーバータイトル"){.xLLarge}

![全幅の表示](sample.jpg "図マウスオーバータイトル"){.xXLarge}

```markdown
![高さ・小の表示](sample.jpg){.ySmall}

![高さ・大の表示](sample.jpg "図マウスオーバータイトル"){.yLarge}

![高さ・特大の表示](sample.jpg "図マウスオーバータイトル"){.yLLarge}

![全高の表示](sample.jpg "図マウスオーバータイトル"){.yXLarge}
```

### 図・画像の回り込み

これが画像に対する文字の回り込みのサンプルである。
これはKindle Previewer(EPUB形式)では回り込みとして作用しない。

このサンプルでは図表式への自動的な番号付けをしていて、回り込みに十分な構造で出力されないため、回り込みをしない状態としている。
そのため無視してよい。

回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。

![小サイズのサンプル画像](sample2.jpg){.xLarge}

回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。回り込み後の文章。

### リンク

[これはKDPへのリンクです](https://kdp.amazon.co.jp/ja_JP/)

### 引用

> １段階の引用  
> １行目末尾にスペース×２で、２行に渡るケース
>
> > ２段階目の引用 リスト等はぶら下がらない
>
> > > ３段階目の引用  

### 水平線

三つ以上の * - _ で水平線。スペースが入っていても良い。

***
___

---

*    *    *

### インラインコード

インラインコードブロック `gem install hoge` です。

### コードブロック

    # Space４つ以上でのpre表記
    class Hoge
      def hoge
        print 'hoge'
      end
    end

```css
.markdown-preview.markdown-preview {
  pre, code {
       white-space: pre-wrap;
  }
}
```

```javascript {.class1 .class}
function add(x, y) {
  return x + y
}
```

```javascript {.line-numbers}
({
  onWillParseMarkdown: async function (markdown) {
    markdown = markdown.replace(/:::success[\s\S]*?:::/gm, (success_alert) => {
      success_alert =
        '<div class="alert alert-success">\n' + success_alert.slice(10);
      success_alert = success_alert.slice(0, -3) + "</div>";
      return success_alert;
    });

    return markdown;
  },
});
```

```javascript {highlight=[1-3,8,11-12]}
({
  onWillParseMarkdown: async function (markdown) {
    markdown = markdown.replace(/:::success[\s\S]*?:::/gm, (success_alert) => {
      success_alert =
        '<div class="alert alert-success">\n' + success_alert.slice(10);
      success_alert = success_alert.slice(0, -3) + "</div>";
      return success_alert;
    });

    return markdown;
  },
});
```

### 表

標準的な表の例。

|a列|b列|c列|
|:--|:-:|--:|
|a1|b2|c2|
|a3|b3|c3|
|a4|b4|c4|

table:テーブル

項目 | 説明
:---|:---
title | 書籍名・Ｈ１見出し
author | 著者名
date | 出版日
subtitle | 副題
lang | 日本語の場合の言語指定
dir | 横書き（ltr）・縦書き（rtl）の指定

table:テーブル

### 絵文字

絵文字の例

:smile: :smiley: :grinning: :wink: :sunglasses: :heart_eyes: :laughing: :sweat_smile: :joy: :rofl: :grin: :yum: :zany_face:

:sob: :worried: :thinking: :tired_face: :weary: :woozy_face:  :grimacing: :sleepy: :yawning_face: :innocent:

:kiss: :sparkling_heart: :muscle:
:point_down: :point_left: :point_right: :point_up_2: :punch: :raised_back_of_hand: :raised_hand_with_fingers_splayed:

:question:
:100: :pencil: :clock1: :clock230:
:u7a7a: :u6e80:

:mouse: :mouse2:
:cow: :cow2:
:tiger: :tiger2:
:rabbit: :rabbit2:
:dragon_face: :dragon:
:snake:
:horse: :racehorse:
:ram:
:monkey_face: :monkey:
:chicken: :rooster:
:dog: :dog2:
:boar:
:pig: :pig_nose: :pig2:
:cat: :cat2:

### 上付き・下付き文字

上付の指定 30cm^3^ 1m^2^

下付の指定 H~2~O

### 脚注

今日のお昼ご飯はうどん[^1]です。

[^1]: 小麦粉と塩水を練り合わせて麺状に切った食べ物。魚介の出汁がきいたつゆにつけて食べる。

### マーク

どうやらマークを表現できるが==Kindle Previewerではスタイルが制限される==ようだ。

### 数式

本文中に数式 $f(x) = sin(x) + cos(Θ) + tan(λ) +12$ を書く記述。

本文中に数式 $(1 + 2) \times 3 - 4 \div 2 = 7$ を書く記述。

文中に数式 $\int^{b}_{a} f(x) dx = \lim_{n \to \infty} \sum^{n-1}_{i=1} f(x_{i}) \Delta x$ を書く記述。

本文中に数式 $\def\foo{x^2} \foo + \foo$ を書く記述。

本文中に数式 \((1 + 2) \times 3 - 4 \div 2 = 7\) を書く記述。

本文中に数式 \(\def\foo{x^2} \foo + \foo\) を書く記述。

$$f(x) = sin(x) + cos(Θ) + tan(λ) +12$$

$$(1 + 2) \times 3 - 4 \div 2 = 7$$

$$\int^{b}_{a} f(x) dx = \lim_{n \to \infty} \sum^{n-1}_{i=1} f(x_{i}) \Delta x$$

$$\def\foo{x^2} \foo + \foo$$

$$\sum_{n=1}^{100} n$$

 \[\def\foo{x^2} \foo + \foo\]

\[\sum_{ \begin{subarray}{l} i\in\Lambda\\ 0<j<n \end{subarray}}\]

\[\def\foo{x^2} \foo + \foo\]

### ルビ

ルビは今のところ主なマークダウンでは非対応。
次のいずれかに対応している事例は見られたが、lua-filterの適用・改造など個別の対応が必要になる。

- 難しい当て字《あてじ》
- 難しい｜当て字《あてじ》の｜試験《テスト》
- {吾輩|わがはい}
- <ruby>吾輩<rp>（</rp><rt>わがはい</rt><rp>）</rp></ruby>

#### Admonition

「Admonition」アドモニションの記述を使うとサイドコンテンツをアイコン表示を伴った引用スタイルで表現できる。
これはVSCodeの設定でワークスペースに対して次のように適用されたときに有効なので、Pandocを利用するEPUB形式の出力には使えない。

- Markdown-preview-enhanced: Use Pandoc Parserがチェック「オフ」

!!! note
    ノートを表現できます。  
    長い文章は複数行で

    表現できます。

!!! note タイトルはカスタムできます
    ノートを表現できます。

!!! note ""
    タイトルは空白にもできます。

!!! Abstract
    ノートを表現できます。

!!! Info
    情報を表現できます。

!!! Tip
    ティップスを表現できます。

!!! Success
    成功を表現できます。

!!! Question
    疑問を表現できます。

!!! Warning
    警告を表現できます。

!!! Failure
    失敗を表現できます。

!!! Danger
    情報を表現できます。

!!! Bug
    バグを表現できます。

!!! Example
    例を表現できます。

!!! Quote
    引用を表現できます。

### おわりに {ignore=true}

あとがき。

## 文献{ignore=true .noPageBreak}

### 引用文献 {ignore=true}

- 引用した文献

### 参考文献 {ignore=true}

- 参考にした文献

## 奥付{ignore=true .noPageBreak}

- 書名 チートシート
- 著者・発行元 サンプルマン
- 2024年12月25日 初版発行
