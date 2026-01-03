---
title: "チートシート"
author:
  - "サンプルマン"
date: "January 1, 2024"
subtitle: "markdownのテスト"
lang: "ja-JP"
#page-progression-direction: rtl
cover-image: "cover_sample.jpg"
html:
  embed_local_images: true
  embed_svg: true
  offline: true
  toc: false
puppeteer:
  preferCSSPageSize: true
  displayHeaderFooter: false
output:
  custom_document:
    pandoc_args: [
      '--css=.crossnote/style.less',
      '--highlight-style=pygments',
      '--mathml',
      #'--webtex=https://latex.codecogs.com/png.latex?',
      '--toc=false',
      #'--toc-depth=4',
      #'--metadata=toc-title:目次',
      #"--standalone",
      #'--metadata=remove_div_class_name:pdf-toc',
      #'--metadata=convert_list_to_div',
      #'--lua-filter=mpee.lua'
    ]
    path: "test.epub"
---
# チートシート {.center-h-text}

::: {.author}

サンプルマン

:::

::: {.title}

english title

:::

::: {.author}

sample man

:::

Description

:::column

## はじめに

これはサンプルファイルです。

## 見出しレベル２{#midashi_level_2-1}

### 見出しレベル３

#### 見出しレベル４{#midashi_level_4-1}

##### 見出しレベル５{#midashi_level_5-1}

###### 見出しレベル６{#midashi_level_6-1}

### ジャンプ・レベル３－２{#midashi_level_3-2}

###### ジャンプ・レベル６{#midashi_level_6}

###### 見出しレベル６－２{#midashi_level_6-2}

### 見出しレベル３－３{#midashi_level_3-3}

#### 見出しレベル４－２{#midashi_level_4-2}

#### 見出しレベル４－３{#midashi_level_4-3}

#### 見出しレベル４－４{#midashi_level_4-4}

## マークダウンの各記法{#markdown_no_kakukihou}

### 強調{#kyouchou}

この日本語は*斜体*にならないことがあります。  
これも _斜体_ にならないことがあります。  
このテキストは **強調（太字）** になります。  
これも __強調（太字）__ になります。  
*これらを **組み合わせ** られます*  
これは~~取り消し線~~になります。

### リスト{#list}

- 食う
  - 食う
    - 食う
- 寝る
  - 寝る
    - 寝る
- 遊ぶ
  - 遊ぶ
    - 遊ぶ

1. 食う
1. 寝る
1. 遊ぶ
    1. 食う
    1. 寝る
    1. 遊ぶ
        1. 食う
        1. 寝る
        1. 遊ぶ

+ 食う
+ 寝る
+ 遊ぶ

* 食う
* 寝る
* 遊ぶ

1. 食う
    - 食う
    - 食えば
    - 食うとき
1. 寝る
    - 寝る
    - 寝れば
    - 寝るとき
1. 遊ぶ
    - 遊ぶ
    - 遊べば
    - 遊ぶとき

<dl>
  <dt>明日の天気</dt>
  <dd>午前中は晴れ、夕方頃から曇り</dd>
</dl>

### タスクリスト{#tasklist}

タスクリストの表現はEPUB形式へ出力すると致命的なエラーとなるので要注意。

```markdown
- [x] 完了したアクションアイテム１
- [x] 完了したアクションアイテム２
- [ ] 残課題１

```

参考：各種チェックマーク記号

- ✓ ✔ ✅ ☐ ☑ ☒

### 図・画像{#zu_gazou}

画像のサンプル。

:::hidden-caption
![幅・特小の表示](sample.jpg){.x-ss}
:::

あいうえお

![幅・小の表示](sample.jpg){.x-s}

あいうえお

![幅・大の表示](sample.jpg "図マウスオーバータイトル"){.x-l}

あいうえお

:::hidden-caption
![幅・特大の表示](sample.jpg "図マウスオーバータイトル"){.x-ll .column-all}
:::

あいうえお

:::hidden-caption
![全幅の表示](sample.jpg "図マウスオーバータイトル"){.x-xl .column-all}
:::

あいうえお

```markdown
![高さ・特小の表示](sample.jpg){.y-ss}

![高さ・小の表示](sample.jpg){.y-s}

![高さ・大の表示](sample.jpg "図マウスオーバータイトル"){.y-l}

![高さ・特大の表示](sample.jpg "図マウスオーバータイトル"){.y-ll}

![全高の表示](sample.jpg "図マウスオーバータイトル"){.y-xl}
```

### 図・画像の回り込み{#zu_gazou_no_mawarikmi}

これが画像に対する文字の回り込みのサンプルである。
Kindle Previewer(EPUB形式)では回り込みを解除して表示されることが多々ある。

このサンプルでは図表式への自動的な番号付けをしていて、回り込みに十分な構造で出力されないため、回り込みをしない状態としている。
そのため無視してよい。

回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。

::: {.x-ss .float-left}
![幅・大サイズのサンプル画像を左へ回り込みさせた場合](sample2.jpg)
:::

回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。

::: {.x-ss .float-right}
![幅・大サイズのサンプル画像を右へ回り込みさせた場合](sample2.jpg)
:::

回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。

### リンク{#link}

[これはKDPへのリンクです](https://kdp.amazon.co.jp/ja_JP/)

### 引用{#inyou}

> １段階の引用  
> １行目末尾にスペース×２で、２行に渡るケース
>
> > ２段階目の引用 リスト等はぶら下がらない
>
> > > ３段階目の引用  

### 水平線{#suiheisen}

三つ以上の * - _ で水平線。スペースが入っていても良い。

文章と水平線

***

文章と水平線

___

文章と水平線

---

文章と水平線

*    *    *

### インラインコード{#inline_code}

インラインコードブロック `gem install hoge` です。

### コードブロック{#codeblock}

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
    markdown = markdown.replace( /:::success[\s\S]*?:::/gm, (success_alert) => {
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

``` {.line-numbers highlight=[1-3,8,11-12]}
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

### 表{#table}

|a列|b列|c列|
|:--|:-:|--:|
|a1|b2|c2|
|a3|b3|c3|
|a4|b4|c4|

|a列|b列|c列|
|:--|:-:|--:|
|a1|b2|c2|
|a3|b3|c3|
|a4|b4|c4|

: パイプテーブル

項目 | 説明
:---|:---
title | 書籍名・Ｈ１見出し
author | 著者名
date | 出版日
subtitle | 副題
lang | 日本語の場合の言語指定
dir | 横書き（ltr）・縦書き（rtl）の指定

: シンプルパイプテーブル

::: {.x-ss .center-h}

項目 | 説明
:---|:---
title title title | 書籍名
author | 著者名 著者名 著者名
date | 出版日

: 長いテーブル長い長い長い

:::

::: {.x-l .center-h .column-all}

| 項目 | 説明 |
| :-: | :-: |
| title title title title title title | 書籍名 |
| author | 著者名 著者名 著者名 著者名 著者名 著者名 |
| date | 出版日 |

: 長い長い長い長い長い長い長い長いテーブル

:::

::: {.x-ll .center-h .column-all}

項目 | 説明
--- | ---
title title title title title title title title title  | 書籍名
author | 著者名 著者名 著者名 著者名 著者名 著者名 著者名 著者名 著者名
date | 出版日

: 長いテーブル長い長い長い長い長い長い長い長い長い長い長い

:::

::: {.x-xl .center-h .column-all}

|項目|説明|
|---|---|
|title title title title title title title title title title title title|書籍名|
|author|著者名 著者名 著者名 著者名 著者名 著者名 著者名 著者名 著者名 著者名 著者名 著者名 
date|出版日|

: 長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長いテーブル

:::

### 絵文字{#emoji}

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

### 上付き・下付き{#uetsuki_shitatsuki}

上付の指定 30cm^3^ 1m^2^

下付の指定 H~2~O

### 脚注{#kyakuchu}

```text
今日のお昼ご飯はうどん[^1]です。

[^1]: 小麦粉と塩水を練り合わせて麺状に切った食べ物。魚介の出汁がきいたつゆにつけて食べる。
```

### マーク{#mark}

どうやらマークを表現できるが==Kindle Previewerではスタイルが制限される==ようだ。

### 数式{#math}

本文中に数式 $f(x) = sin(x) + cos(Θ) + tan(λ) +12$ を書く記述。

本文中に数式 $(1 + 2) \times 3 - 4 \div 2 = 7$ を書く記述。

文中に数式 $\int^{b}_{a} f(x) dx = \lim_{n \to \infty} \sum^{n-1}_{i=1} f(x_{i}) \Delta x$ を書く記述。

本文中に数式 $\def\foo{x^2} \foo + \foo$ を書く記述。

本文中に数式 \((1 + 2) \times 3 - 4 \div 2 = 7\) を書く記述。

本文中に数式 \(\def\foo{x^2} \foo + \foo\) を書く記述。

キャプションなしでブロックの数式を書く。

$$f(x) = sin(x) + cos(Θ) + tan(λ) +12$$

キャプションありでブロックの数式を書く（pandoc拡張）。

:::math
$$(1 + 2) \times 3 - 4 \div 2 = 7$$
: 
:::

:::math
$$\int^{b}_{a} f(x) dx = \lim_{n \to \infty} \sum^{n-1}_{i=1} f(x_{i}) \Delta x$$
: 式１０
:::

:::math
$$\def\foo{x^2} \foo + \foo$$
: 
:::

:::math
$$\sum_{n=1}^{100} n$$
: 
:::

 \[\def\foo{x^2} \foo + \foo\]
: 

\[\sum_{ \begin{subarray}{l} i\in\Lambda\\ 0<j<n \end{subarray}}\]
: 

\[\def\foo{x^2} \foo + \foo\]
: 

### 対応されないルビ{#rubi}

ルビは今のところ主なマークダウンでは非対応。
次のいずれかに対応している事例は見られたが、lua-filterの適用・改造など個別の対応が必要になる。

- 難しい当て字《あてじ》
- 難しい｜当て字《あてじ》の｜試験《テスト》

### CriticMarkup、Admonition{#criticmarkup_admonition}

「Admonition」アドモニションの記述を使うとサイドコンテンツをアイコン表示を伴った引用スタイルで表現できる。

!!! note
    ノートを表現できます。  
    長い文章は複数行で。

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

## 青空文庫的拡張{#aozora}

青空文庫の記法の一部に対応（参考：青空文庫「ルビとルビのように付く文字」。縦書きの前提）。  
一部に試験的な拡張された表現を含む場合があります。

```
文字《もじ》へのルビ  
区切りを｜明示する文字《めいじするもじ》へのルビ
```

文字《もじ》へのルビ  
区切りを｜明示する文字《めいじするもじ》へのルビ

「往来の人を呼ぶ声｜喧《かまびす》しく、 局女郎《つぼねじょろう》より遥劣りて鈍く見ゆるとて喧鈍《けんどん》と書かせたり」  
国会図書館に掲げられているヘー・アレーテイア・エレウテローセイ・ヒュマース《真理はわれらを自由にする》の理念  
A.I. 《人工知能》がおかしな結果を返すごとに思い出す｜ Artificial Incompetence 《人工無能》  
「銀河鉄道999《スリーナイン》」は日本のアニメ界を代表する名作のひとつである  
いかなるときも｜木を見て森を見ず《●●●●●●●●》となることには注意が必要である

```
［＃注記付き］名※［＃「（銘々）」の注記付き終わり］  
［＃左に注記付き］名※［＃左に「（銘々）」の注記付き終わり］  
```

［＃注記付き］名※［＃「（銘々）」の注記付き終わり］  
［＃左に注記付き］　名※［＃左に「（銘々）」の注記付き終わり］

［＃注記付き］名※［＃「（明々）」の注記付き終わり］と［＃左に注記付き］白※［＃左に「（白々）」の注記付き終わり］  
［＃左に注記付き］　名※［＃左に「（明々）」の注記付き終わり］と［＃注記付き］名※［＃「（白々）」の注記付き終わり］  

```
数多くの修整［＃「修整」に「ママ」のルビ］の右にルビ  
数多くの修整［＃「修正」に「ママ」のルビ］の右にルビ、修正［＃「修整」に「ママ」の注記］の左に注記  
数多くの修整［＃「修整」の左に「パパ」のルビ］の左に注記  
数多くの修整［＃「修正」の左に「パパ」のルビ］の左に注記、修正［＃「修整」の左に「パパ」の注記］の左に注記  
数多くの修正［＃「修正」の左に「ママ」のルビ］の左に注記、修正と修正［＃「修正」の左に「パパ」の注記］の左に注記
```

数多くの修整［＃「修整」に「ママ」のルビ］の右にルビ  
数多くの修整［＃「修正」に「ママ」のルビ］の右にルビ、修正［＃「修整」に「ママ」の注記］の左に注記  
数多くの修整［＃「修整」の左に「パパ」のルビ］の左に注記  
数多くの修整［＃「修正」の左に「パパ」のルビ］の左に注記、修正［＃「修整」の左に「パパ」の注記］の左に注記  
数多くの修正［＃「修正」の左に「ママ」のルビ］の左に注記、修正と修正［＃「修正」の左に「パパ」の注記］の左に注記

```
:::chiyose
今日はいろいろあった。
:::
```

:::chiyose
今日はいろいろあった。
:::

```
:::chitsuki
昨日もいろいろあった気がする。
:::
```

:::chitsuki
昨日もいろいろあった気がする。
:::

```
:::page-center
一昨日の憂鬱　其の一
:::
```

:::page-center
一昨日の憂鬱　其の一
:::

- 外字指定　→　ユニコードでそのまま入力
- 同行中見出し、窓見出し　→　大変そう
- 訓点、訓点送り仮名　→　上付き・下付きで代用
- 傍点•◦●○◉◎▲△﹅﹆×　→　ルビで代用

- 傍線　→　１種類に制限されるが、強調*で代用

## 会話文{#conversation}

花子は言った。
にこやかに。  
「１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９」  
太郎は答えた。
朗らかに。  
「１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９」

:::sage1
花子は言った。
にこやかに。  
太郎は答えた。
朗らかに。  
:::

:::sage3
花子は言った。
にこやかに。  
太郎は答えた。
朗らかに。  
:::

## スタイルの設定用{#check_page}

### フォントの特徴の確認{#check_fonts}

本文

□□□□□□□□□□□□□□□□□□□  
□□VSCode□□EPUB□□Kindle□□GIMP□　半角  
□□□□□□□□□□□□□□□□□□□  
□□{}()[]□□"'`^□□?!□□□□□□□　半角記号  
□□□□□□□□□□□□□□□□□□□  
□□『』「」（）□”’‘？！□□□□□　全角記号  
□□□□□□□□□□□□□□□□□□□  
□□Ｏ０□□Ｉｌ１□□！｜□□－□‐□　似た文字  
□□□□□□□□□□□□□□□□□□□  
□□O0□□□□Il1|!:□□□□□□□□□　半角の似た文字  
□□□□□□□□□□□□□□□□□□□  
□□　□ □ □□□□□□□□□□□□□　スペース  
□□□□□□□□□□□□□□□□□□□

コードブロック

```markdown
□□□□□□□□□□□□□□□□□□□  
□□VSCode□□EPUB□□Kindle□□GIMP□　半角  
□□□□□□□□□□□□□□□□□□□  
□□{}()[]□□"'`^□□?!□□□□□□□　半角記号  
□□□□□□□□□□□□□□□□□□□  
□□『』「」（）□”’‘？！□□□□□　全角記号  
□□□□□□□□□□□□□□□□□□□  
□□Ｏ０□□Ｉｌ１□□！｜□□－‐□□　似た文字  
□□□□□□□□□□□□□□□□□□□  
□□O0□□□□Il1|!:□□□□□□□□□　半角の似た文字  
□□□□□□□□□□□□□□□□□□□  
□□　□ □ □□□□□□□□□□□□□　スペース  
□□□□□□□□□□□□□□□□□□□
```

### 文字数テスト{#char_size}

１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９

### 行数テスト{#line_numbers}

１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  
１２３４５６７８９０  
２３４５６７８９０１  
３４５６７８９０１２  
４５６７８９０１２３  
５６７８９０１２３４  
６７８９０１２３４５  
７８９０１２３４５６  
８９０１２３４５６７  
９０１２３４５６７８  
０１２３４５６７８９  

## まとめ {#matome}

## 謝辞 {#syaji}

## 引用文献 {#inyou_bunken}

- サンプル文献

:::
