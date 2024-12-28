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
- 寝る
- 遊ぶ
  - 食う
  - 寝る
  - 遊ぶ
    - 食う
    - 寝る
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

![小サイズのサンプル画像](sample.jpg){.xSmall}

![大サイズのサンプル画像](sample.jpg "図マウスオバータイトル"){.xLarge}

![特大サイズのサンプル画像](sample2.jpg "図マウスオバータイトル"){.xLLarge}

![全幅サイズのサンプル画像](sample2.jpg "図マウスオバータイトル"){.xXLarge}

### 図・画像の回り込み

これが画像に対する文字の回り込みのサンプルである。
これはKindle Previewer(EPUB形式)では回り込みとしては作用しない。

回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。回り込み前の文章。

![小サイズのサンプル画像](sample2.jpg){.xLarge .floatEnd}

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

標準的な表の例

|a列|b列|c列|
|:--|:-:|--:|
|a1|b2|c2|
|a3|b3|c3|
|a4|b4|c4|

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

どうやら==マーカーを表現できる==ようである。

### 数式

文中に数式$\int^{b}_{a} f(x) dx = \lim_{n \to \infty} \sum^{n-1}_{i=1} f(x_{i}) \Delta x$を書ける。

四則演算は $(1 + 2) \times 3 - 4 \div 2 = 7$ といった感じになる。

三角関数は $f(x) = sin(x) + cos(Θ) + tan(λ) +12$ といった感じである。

あるいは、「$$」で挟んで数式ブロックとしてTEXの構文を書けばよいようだ。

$$
\int^{b}_{a} f(x) dx = \lim_{n \to \infty} \sum^{n-1}_{i=1} f(x_{i}) \Delta x
$$

$$\sum_{n=1}^{100} n$$

### ルビ

ルビは今のところ主なマークダウンでは非対応。
次のいずれかに対応している事例は見られたが、lua-filterの適用・改造など個別の対応が必要になる。

- 難しい当て字《あてじ》
- 難しい｜当て字《あてじ》の｜試験《テスト》
- {吾輩|わがはい}
- <ruby>吾輩<rp>（</rp><rt>わがはい</rt><rp>）</rp></ruby>

### Admonition

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
