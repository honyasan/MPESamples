---
title: "Cheet-sheet"
author:
  - "Sample man"
date: "January 1, 2024"
subtitle: "markdown for test"
lang: "en"
dir: "ltr"
page-progression-direction: ltr
cover-image: "cover_sample.jpg"
number_offset: 1
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
      '--toc=true',
      '--toc-depth=3',
      '--metadata=toc-title:CONTENTS',
      #"--standalone",
      '--metadata=remove_div_class_name:pdf-toc',
      '--metadata=remove_br_in_header',
      #'--metadata=convert_list_to_div',
      '--lua-filter=mpee.lua'
    ]
    path: "test.epub"
---
:::::: {.page-center}

::: {.title}

Test Book

:::

::: {.sub-title}

Sub Titlte

:::

::: {.author}

author

:::

::::::

:::::: {.page-end .page-break-common}

::: copyright

Test Book
First Edition: May 2026

© 2026 Author

All rights reserved. No part of this book may be reproduced or used in any manner without the prior written permission of the copyright owner, except for the use of brief quotations in a book review or as permitted by Japanese copyright law.

:::

::::::

::::::::: {.page-center .page-break}

:::::: disclaimer

::: header

DISCLAIMER

:::

Although the author and publisher have made every effort to ensure that the information in this book was correct at press time, the author and publisher do not assume and hereby disclaim any liability to any party for any loss, damage, or disruption caused by errors or omissions, whether such errors or omissions result from negligence, accident, or any other cause.

::::::

:::::::::

:::pdf-toc

## CONTENTS {ignore=true .noNumbering .page-break}

- [INTRODUCTION](#introduction)
- [HEADER LEVEL2](#midashi_level_2-1)
  - [Header Level3](#header-level3) p.7
  - [Jump Level3-2](#midashi_level_3-2) p.7
  - [Header Level3-3](#midashi_level_3-3) p.8
- [MARKDOWN BASICS](#markdown_no_kakukihou) p.9
  - [Emphasis](#kyouchou)
  - [Lists](#list)
  - [Task list](#tasklist)
  - [Images](#zu_gazou)
  - [Image wrapping around figures and images](#zu_gazou_no_mawarikmi)
  - [Links](#link)
  - [Blockquote](#inyou)
  - [Horizontal Rule](#suiheisen)
  - [Inline code](#inline_code)
  - [Code blocks](#codeblock)
  - [Tables](#table)
  - [Emoji](#emoji)
  - [Superscript and subscript](#uetsuki_shitatsuki)
  - [Footnote](#kyakuchu)
  - [Mark](#mark)
  - [Math typesetting](#math-typesetting)
  - [Unsupported Ruby Text](#rubi)
  - [CriticMarkup、Admonition](#criticmarkup_admonition)
- [青空文庫的拡張](#aozora)
- [CONVERSATION](#conversation)
- [For setting styles](#check_page)
  - [Checking font characteristics](#check_fonts)
  - [Character count test](#char_size)
  - [Line number test](#line_numbers)
- [CONCLUSION](#matome)
- [SELECTED BIBLIOGRAPHY & PRIMARY SOURCES](#inyou_bunken)

:::

## INTRODUCTION {.page-break-common}

This is for sample.

## HEADER LEVEL2 {#midashi_level_2-1 .page-break-common}

### Header Level3

#### Header Level4{#midashi_level_4-1}

##### Header Level5{#midashi_level_5-1}

###### Header Level6{#midashi_level_6-1}

### Jump Level3-2{#midashi_level_3-2}

###### Jump Level6{#midashi_level_6}

###### Header Level6-2{#midashi_level_6-2}

### Header Level3-3{#midashi_level_3-3}

#### Header Level4-2{#midashi_level_4-2}

#### Header Level4-3{#midashi_level_4-3}

#### Header Level4-4{#midashi_level_4-4}

## MARKDOWN BASICS{#markdown_no_kakukihou .page-break-common}

### Emphasis{#kyouchou}

This Japanese text may not be *italicized*.  
This may also not be _italicized_.  
This text will be **bolded**.  
This will also be __bolded__.  
*These can be **combined** *.  
This will be ~~strikethrough~~.

### Lists{#list}

- Eat
  - Eat
    - Eat
- Sleep
  - Sleep
    - Sleep
- Play
  - Play
    - Play

1. Eat
1. Sleep
1. Play
    1. Eat
    1. Sleep
    1. Play
        1. Eat
        1. Sleep
        1. Play

+ Eat
+ Sleep
+ Play

* Eat
* Sleep
* Play

1. Eat
    - To eat
    - If you eat
    - When you eat
1. Sleep
    - To sleep
    - If you sleep
    - When you sleep
1. Play
    - To play
    - If you play
    - When you play

<dl>
  <dt>Tomorrow's weather forecast:</dt>
  <dd>Sunny in the morning, cloudy from the evening onwards.</dd>
</dl>

### Task list{#tasklist}

Note that the way task lists are represented in EPUB format will result in a fatal error.

```markdown
- [x] Completed Action Item 1
- [x] Completed Action Item 2
- [ ] Remaining Task 1

```

Reference: Various checkmark symbols

- ✓ ✔ ✅ ☐ ☑ ☒

### Images{#zu_gazou}

Image sample.

![width: special small](sample.jpg){.x-ss .hidden-caption}

abcde

![width: small](sample.jpg){.x-s}

abcde

![width: large](sample.jpg "mouse over title"){.x-l}

abcde

![width: spcial large](sample.jpg "mouse over title"){.x-ll .hidden-caption}

abcde

![width: full](sample.jpg "mouse over title"){.x-xl .hidden-caption}

abcde

```markdown
![height: special small](sample.jpg){.y-ss}

![height: small](sample.jpg){.y-s}

![height: large](sample.jpg "mouse over title"){.y-l}

![height: special large](sample.jpg "mouse over title"){.y-ll}

![height: full](sample.jpg "mouse over title"){.y-xl}
```

### Image wrapping around figures and images{#zu_gazou_no_mawarikmi}

This is an example of text wrapping around an image. Kindle Previewer (EPUB format) often displays the image with the wrapping disabled.

This sample uses automatic numbering for the diagram/table format, and the output structure is not sufficient for text wrapping; therefore, it is displayed without wrapping. You can ignore this example.

The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it.

::: {.x-ss .float-left}
![幅・大サイズのサンプル画像を左へ回り込みさせた場合](sample2.jpg)
:::

The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it.

::: {.x-ss .float-right}
![幅・大サイズのサンプル画像を右へ回り込みさせた場合](sample2.jpg)
:::

The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it. The text before wrapping around it.

### Links{#link}

[This is a link to KDP.](https://kdp.amazon.co.jp/ja_JP/)

### Blockquote{#inyou}

> First level of quotation
> Case where the quotation spans two lines, with two spaces at the end of the first line
>
> > Second level of quotation (lists etc. do not hang over it)
>
> > > Third level of quotation

### Horizontal Rule{#suiheisen}

Three or more * - _ characters represent a horizontal line. Spaces are allowed.

Text and horizontal line

***
Text and horizontal line

___
Text and horizontal line

---
Text and horizontal line

*    *    *

### Inline code{#inline_code}

This is an inline code block: `gem install hoge`.

### Code blocks{#codeblock}

    # Prescript with four or more spaces

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

### Tables{#table}

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

: pipe table

item | description
:---|:---
title | Book title
author | author name
date | publishing date
subtitle | sub title
lang | language
dir | specified ltr-rtl

: simple pipe table

::: {.x-ss .center-h}

item | description
:---|:---
title title title | Book title
author | author name author name author name
date | publishing date

: long table long long long

:::

::: {.x-l .center-h }

| item | desctiption |
| :-: | :-: |
| title title title title title title | Book title |
| author | author name author name author name author name |
| date | publishing date |

: long long long long long long long table

:::

::: {.x-ll .center-h }

item | description
--- | ---
title title title title title title title title title  | Book title
author | author name author name author name author name author name
date | publishing date

: long table long long long long long long long long long

:::

::: {.x-xl .center-h }

|item|desctiption|
|---|---|
|title title title title title title title title title title title title|Book title|
|author|author name author name author name author name author name author name author name|
date|publishing date|

: long table long long long long long long long long long long long long

:::

### Emoji{#emoji}

Sample of Emoji

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

### Superscript and subscript{#uetsuki_shitatsuki}

Upper specification: 30cm^3^ 1m^2^

Lower specification: H~2~O

### Footnote {#kyakuchu}

```text
Today's lunch is udon [^1].

[^1]: A food made by kneading wheat flour and salt water together and cutting it into noodle-like shapes. It is eaten dipped in a broth flavored with seafood stock.
```

### Mark {#mark}

Apparently, it's possible to represent marks, but ==the style is limited in Kindle Previewer==.

### Math typesetting

This text contains the mathematical formula $f(x) = sin(x) + cos(Θ) + tan(λ) + 12$.

This text contains the mathematical formula $(1 + 2) \times 3 - 4 \div 2 = 7$.

This text contains the mathematical formula $\int^{b}_{a} f(x) dx = \lim_{n \to \infty} \sum^{n-1}_{i=1} f(x_{i}) \Delta x$.

This text contains the mathematical formula $\def\foo{x^2} \foo + \foo$.

This text contains the mathematical formula \((1 + 2) \times 3 - 4 \div 2 = 7\).

Writing a mathematical formula \(\def\foo{x^2} \foo + \foo\) within the text.

Writing a block formula without a caption.

$$f(x) = sin(x) + cos(Θ) + tan(λ) +12$$

Writing a block formula with a caption (pandoc extension).

:::math
$$(1 + 2) \times 3 - 4 \div 2 = 7$$
:
:::

:::math
$$\int^{b}_{a} f(x) dx = \lim_{n \to \infty} \sum^{n-1}_{i=1} f(x_{i}) \Delta x$$
: Formula 10
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

### Unsupported Ruby Text{#rubi}

Ruby text is currently not supported in most Markdown versions. While some instances of support have been observed, individual modifications such as applying or modifying the lua-filter are necessary.

- Difficult phonetic equivalent《ateji》
- Difficult｜Pronunciation of phonetic equivalent《ateji》｜Test《test》

### CriticMarkup、Admonition{#criticmarkup_admonition}

The "Admonition" description allows you to display side content in a quoted style with icons.

!!! note
You can display notes.

Long texts can be displayed on multiple lines.

You can display them.

!!! note Title can be customized

You can display notes.

!!! note ""

The title can be blank.

!!! Abstract
You can display notes.

!!! Info
You can display information.

!!! Tip
You can display tips.

!!! Success
You can display successes.

!!! Question
You can display questions.

!!! Warning
You can display warnings.

!!! Failure
You can display failures.

!!! Danger
You can display information.

!!! Bug
You can display bugs.

!!! Example
You can display examples.

!!! Quote
You can display quotes.

## 青空文庫的拡張{#aozora .page-break-common}

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

## CONVERSATION {.page-break-common}

Hanako said:
Smiling.
"1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567899"
Taro replied:
Cheerfully.

"1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"

:::sage1
Hanako said.
Smiling.
Taro replied.
Cheerfully.
:::

:::sage3
Hanako said.
Smiling.
Taro replied.
Cheerfully.
:::

## For setting styles {#check_page .page-break-common}

### Checking font characteristics {#check_fonts}

main text

□□□□□□□□□□□□□□□□□□□  
□□VSCode□□EPUB□□Kindle□□GIMP□　Half-width characters  
□□□□□□□□□□□□□□□□□□□  
□□{}()[]□□"'`^□□?!□□□□□□□　Half-width symbols  
□□□□□□□□□□□□□□□□□□□  
□□『』「（）□”’‘？！□□□□□　Full-width symbols  
□□□□□□□□□□□□□□□□□□□  
□□Ｏ０□□Iｌ１□□！｜□□－□‐□　Similar characters  
□□□□□□□□□□□□□□□□□□□  
□□O0□□□□Il1|!:□□□□□□□□□　Similar half-width characters  
□□□□□□□□□□□□□□□□□□□  
□□□　□ □ □□□□□□□□□□□□　Space  
□□□□□□□□□□□□□□□□□□□

Code Block

```markdown
□□□□□□□□□□□□□□□□□□□  
□□VSCode□□EPUB□□Kindle□□GIMP□　Half-width characters  
□□□□□□□□□□□□□□□□□□□  
□□{}()[]□□"'`^□□?!□□□□□□□　Half-width symbols  
□□□□□□□□□□□□□□□□□□□  
□□『』「（）□”’‘？！□□□□□　Full-width symbols  
□□□□□□□□□□□□□□□□□□□  
□□Ｏ０□□Iｌ１□□！｜□□－‐□□　Similar characters  
□□□□□□□□□□□□□□□□□□□  
□□O0□□□□Il1|!:□□□□□□□□□　Similar half-width characters  
□□□□□□□□□□□□□□□□□□□  
□□　□ □ □□□□□□□□□□□□□　Space  
□□□□□□□□□□□□□□□□□□□
```

### Character count test {#char_size}

１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９

### Line number test {#line_numbers}

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

## CONCLUSION {#matome .page-break-common}

## SELECTED BIBLIOGRAPHY & PRIMARY SOURCES {#inyou_bunken .page-break-common}

- Sample literature
