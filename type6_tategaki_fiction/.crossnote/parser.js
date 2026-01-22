({
  // Please visit the URL below for more information:
  // https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser
  // https://github.com/honyasan/MPESamples

  onWillParseMarkdown: async function (markdown) {
    //return markdown;
    //throw new Error(markdown);
    // ここから

    // 動作オプションの選択
    selectedOptionType = 'type6';

    // 動作オプションの定義
    defaultsOptions = {
      custom: { // カスタムを使用
        name: 'custom settings',
        enableNumbering: false,
        enableDetailNumbering: false,
        aozoraRuby: true,
        indentString: ''
      },
      type0: {  // デフォルトを使用
        name: 'default settings',
        isBypass: false,
      },
      type1: {  // レポート風・見出し深さ２まで
        name: 'report',
        enableNumbering: true,
        headFrom: 'h2',
        headDepth: 2,
        headFormat: [
          '{num}',
          '-{num}'
        ],
        classPrefixList: ['chapter', 'section'],
        combineTitle: true,
        endOfOutline: ' ',

        enableDetailNumbering: true,
        isThroughOut: true,
        figurePrefix: 'Fig. ',
        tablePrefix: 'Table ',
        mathPrefix: 'Eq. ',
        detailFormat: '{num}',
      },
      type2: {  // レポート風・見出し深さ３まで
        name: 'detail report',
        enableNumbering: true,
        headFrom: 'h2',
        headDepth: 3,
        headFormat: [
          '{num}',
          '-{num}',
          '-{num}'
        ],
        classPrefixList: ['chapter', 'section', 'paragraph'],
        combineTitle: true,
        endOfOutline: ' ',

        enableDetailNumbering: true,
        isThroughOut: false,
        figurePrefix: 'Fig. ',
        tablePrefix: 'Table ',
        mathPrefix: 'Eq. ',
        detailFormat: '{num}',
      },
      type3: {  // ノンフィクション風
        name: 'Non-fictions',
        enableNumbering: true,
        headFrom: 'h2',
        headDepth: 2,
        headFormat: [
          '第{zenkaku}章',
          '{zenkaku}.'
        ],
        classPrefixList: ['chapter', 'section'],
        combineTitle: false,
        endOfOutline: ' ',

        enableDetailNumbering: true,
        isThroughOut: true,
        figurePrefix: '図',
        tablePrefix: '表',
        mathPrefix: '（式',
        detailFormat: '{zenkaku}',

        aozoraRuby: true
      },
      type4: {  // ノンフィクション風・ナンバリングなし
        name: 'Non-fictions(no-numbering)',
        enableNumbering: false,
        enableDetailNumbering: false,
        aozoraRuby: true
      },
      type5: {  // フィクション風
        name: 'story book',
        enableNumbering: true,
        enableDetailNumbering: false,
        headFrom: 'h2',
        headDepth: 1,
        headFormat: [
          '第{kanji}章'
        ],
        classPrefixList: ['chapter'],
        combineTitle: false,
        endOfOutline: '　',

        aozoraRuby: true
      },
      type6: {  // 縦書き・フィクション風（試験段階）
        name: 'Japanese story book',
        enableNumbering: true,
        enableDetailNumbering: false,
        headFrom: 'h2',
        headDepth: 2,
        headFormat: [
          '第{kanji}章',
          '{kanji}'
        ],
        classPrefixList: ['chapter', 'section'],
        combineTitle: false,
        endOfOutline: '　',

        aozoraRuby: true
      },
      typeX: {  // バイパス
        name: 'bypass true',
        isBypass: true
      }
    };

    class Node {
      constructor(type, raw) {
        this.type = type;
        this.raw = raw;
        this.modifiedContent = null;
      }

      toString() {
        return this.modifiedContent !== null ? this.modifiedContent : this.raw;
      }

      update(newContent) {
        this.modifiedContent = newContent;
      }
    }

    class MarkdownParser {
      constructor(markdown) {
        this.lines = markdown.split('\n');
        const parsed = this.parse()
        this.nodes = parsed['nodes'];
        this.hasProcessed = parsed['hasProcessed'];
      }

      parse() {
        const nodes = [];
        const lines = this.lines;
        let foundFrontmatter = false;
        let i = 0;

        // 行ごとにパース
        while (i < lines.length) {
          let t = lines[i].trim();

          // ブロック間の空行スキップ
          if (t === '') {
            const buf = [];
            buf.push(lines[i++]);     // 開始行
            while (i < lines.length && lines[i].trim() === '') {
              buf.push(lines[i++]);   // 連続する空行
            }
            nodes.push(new Node('paragraph', buf.join('\n')));
            continue;
          }

          // リスト類（preより優先度・高）
          if (/^([-|\*|\+]\s|1.\s)/.test(t)) {
            let lastIsBreakLine = /\s\s$/.test(lines[i]);
            const buf = [];
            buf.push(lines[i++]);     // 開始行
            while (i < lines.length && (/^([-|\*|\+]\s|1.\s)/.test(lines[i].trim()) || lastIsBreakLine)) {
              lastIsBreakLine = /\s\s$/.test(lines[i]);

              buf.push(lines[i++]);   // リスト類の各行
            }
            nodes.push(new Node('list-item', buf.join('\n')));
            continue;
          }

          // preコードブロック
          if (/(^\s{4,}|\r\s{4,})/.test(lines[i])) {
            const buf = [];
            buf.push(lines[i++]);     // 開始行
            while (i < lines.length && /^\s{4,}/.test(lines[i])) {
              buf.push(lines[i++]);   // preコードブロックの各行
            }
            nodes.push(new Node('code', buf.join('\n')));
            continue;
          }

          // コードフェンスブロック
          const fence = t.match(/^(`{3,}|~{3,})/);
          if (fence) {
            const buf = [];
            const fenceStr = fence[1];
            buf.push(lines[i++]);     // 開始行
            while (i < lines.length && lines[i].trim() !== fenceStr) {
              buf.push(lines[i++]);   // コードブロックの各行
            }
            if (i < lines.length) {
              buf.push(lines[i++]);   // 終了行
            }
            nodes.push(new Node('code', buf.join('\n')));
            continue;
          }

          // 数式ブロック
          if (/^\$\$.*\$\$$/.test(t)) {
            const buf = [];
            buf.push(lines[i++]);     // 開始行

            // Pandoc 拡張キャプション行(: ～)を数式端２行以内から取り込む
            if (i < lines.length && !this.isBlockBoundaryToken(lines[i].trim()) && /^:\s*/.test(lines[i].trim())) {
              buf.push(lines[i++]);
            }
            else if (i + 1 < lines.length && !this.isBlockBoundaryToken(lines[i + 1].trim()) && /^:\s*/.test(lines[i + 1].trim())) {
              buf.push(lines[i++]);
              buf.push(lines[i++]);
            }

            nodes.push(new Node('math', buf.join('\n')));
            continue;
          }

          // パイプテーブルブロック
          const isHeader = /^.*\|.*/.test(t);
          const isAlign = i + 1 < lines.length && /^\s*\|?:?-+:?\|?\s*:?-+:?/.test(lines[i + 1].trim());
          if (isHeader && isAlign) {
            const buf = [];
            buf.push(lines[i++]); // ヘッダ行 |aaa|bbb|ccc| または |aaa|bbb
            buf.push(lines[i++]); // アライメント行 |---|---|---| または ---|---

            // 表で続くパイプ行 |aaa|bbb|ccc| または aaa|bbb
            while (i < lines.length && /^.*\|.*/.test(lines[i].trim())) {
              buf.push(lines[i++]);
            }

            // Pandoc 拡張キャプション行(table: ～, : ～)を数式端２行以内から取り込む
            if (i < lines.length && !this.isBlockBoundaryToken(lines[i].trim()) && (/^table:\s*/.test(lines[i].trim()) || /^:\s*/.test(lines[i].trim()))) {
              buf.push(lines[i++]);
            }
            else if (i + 1 < lines.length && !this.isBlockBoundaryToken(lines[i + 1].trim()) && (/^table:\s*/.test(lines[i + 1].trim()) || /^:\s*/.test(lines[i + 1].trim()))) {
              buf.push(lines[i++]);
              buf.push(lines[i++]);
            }

            nodes.push(new Node('table', buf.join('\n')));
            continue;
          }

          // import形式のTOCブロック
          if (/^<!-- @import "\[TOC]"/.test(t)) {
            const buf = [];
            buf.push(lines[i++]);     // 開始行
            while (i < lines.length && !/^<!-- \/code_chunk_output -->/.test(lines[i].trim())) {
              buf.push(lines[i++]);   // 取り込まれたTOCの各行
            }
            if (i < lines.length) {
              buf.push(lines[i++]);   // 終了行
            }
            nodes.push(new Node('import-toc', buf.join('\n')));
            continue;
          }

          // admonitionブロック
          if (/^!!! /.test(t)) {
            const buf = [];
            buf.push(lines[i++]);     // 開始行
            while (i < lines.length && (/^\s{4,}/.test(lines[i]) || lines[i].trim() == '')) {
              buf.push(lines[i++]);   // admonitionの各行
            }
            nodes.push(new Node('admonition', buf.join('\n')));
            continue;
          }

          // フロントマターブロック
          if (/^---/.test(t) && !foundFrontmatter) {
            const buf = [];
            buf.push(lines[i++]);     // 開始行
            while (i < lines.length && !/^---/.test(lines[i].trim())) {
              buf.push(lines[i++]);   // YAMLフロントマターの各行
            }
            if (i < lines.length) {
              buf.push(lines[i++]);   // 終了行
            }
            nodes.push(new Node('frontmatter', buf.join('\n')));
            foundFrontmatter = true;  // 冒頭の１回だけフロントマターとして処理
            continue;
          }

          // pandoc拡張divブロック
          // マークダウンにない階層構造を作らないように開始行・終了行だけで
          // ノードにする
          if (/^:::/.test(t)) {
            const nodeType = /^:::$/.test(t) ? 'container-end' : 'container';
            const buf = [];
            buf.push(lines[i++]);     // 開始行または終了行
            nodes.push(new Node(nodeType, buf.join('\n')));
            continue;
          }

          // その他の行レベルの要素
          const buf = [];
          buf.push(lines[i++]);

          // ブロック区切りのトークンが出るまでバッファに貯める
          while (i < lines.length && lines[i].trim() !== '' && !this.isBlockBoundaryToken(lines[i].trim())) {
            buf.push(lines[i++]);
          }

          // 区切りにたどり着いたらタイプ判定してバッファをノード化する
          const type = this.identifyBlockType(buf.join('\n'), buf);
          nodes.push(new Node(type, buf.join('\n')));
        }

        // フロントマターが先頭にある想定で、parser.jsで処理したスタンプ文字列をコメントで加える
        // 意図したフロントマターを見つけられないとナンバリングが多重に動作して異常な結果となる
        let hasProcessed = false;
        const frontmatter = nodes.filter(node => node.type === 'frontmatter');
        if (frontmatter.length > 0) {
          if (frontmatter[0].raw.match(/# parser.js processed.\r/)) {
            // 既に実行済みの場合は全機能をバイパスすべき状態だと保持する
            hasProcessed = true;
          }
          else {
            // 初回実行の場合は、処理したスタンプ文字列をYAMLコメントに付与しておく
            const yaml = frontmatter[0].raw.split('\n');
            yaml.splice(1, 0, '# parser.js processed.\r');
            frontmatter[0].update(yaml.join('\n'));
          }
        }

        return { 'nodes': nodes, 'hasProcessed': hasProcessed };
      }

      isBlockBoundaryToken(testString) {
        return /^(:::|#{1,6}\s|---|===|>|\s{4,}|`{3,}|~{3,}|!\[|\[TOC\]|<!--\s|\|.*\||.*\|.*|\$\$|([-\*_]\s?){3,}|[-|\*|\+]\s|1.\s|\[\^[0-9]+?\]:|!!!\s|@import\s)/.test(testString);
      }

      toString() {
        return this.nodes.map(node => node.toString()).join('\n');
      }

      identifyBlockType(raw, lines) {
        // 行の種類を判別して返す　ブロック要素はparse関数の判断による
        // 行頭の空白、改行、\rを除去してチェック
        const block = raw.trim();
        if (/^:::/.test(block)) {
          return 'container';   // pandoc拡張のdivコンテナ
        }
        else if (/^#{1,6}\s/.test(block)) {
          return 'heading';     // 見出し
        }
        else if (/^>/.test(block)) {
          return 'blockquote';  // 引用
        }
        else if (/^!\[.*\]\(.*\)/.test(block)) {
          return 'figure';      // 図
        }
        else if (/^\[TOC\]/.test(block)) {
          return 'toc';         // [TOC] - onWillParseMarkdown後に挿入される
        }
        else if (/^([\*_-]\s*?){3,}/.test(block)) {
          return 'hair-line';   // ヘアライン
        }
        else if (/^\[\^[0-9]+?\]:/.test(block)) {
          return 'footnote';    // 脚注
        }
        else if (/^@import\s/.test(block)) {
          return 'import';      // インポート
        }
        return 'paragraph';     // その他は段落
      }
    }

    class NumberingManager extends MarkdownParser {
      constructor(markdown, userOptions = null) {
        super(markdown);

        // デフォルトの動作オプション
        this.options = {
          isBypass: false,              // true - 処理全体をバイパスする, false - 実行する
          enableNumbering: true,        // true - アウトラインを表示する, false - 表示しない
          enableDetailNumbering: false, // true - 図・表・式のアウトラインを表示する, 
          ignoreClass: 'noNumbering',   // ナンバリングしないクラス名

          headFrom: 'h2',               // 処理する見出しレベル
          headDepth: 3,                 // 見出しレベルの深さ
          headFormat: [                 // {num} - 半角数字, {zenkaku} - 全角数字, {kanji} - 漢数字
            '{num}',
            '-{num}',
            '-{num}'
          ],
          classPrefixList: ['chapter', 'section', 'paragraph'], // sectionに付けるクラス名
          combineTitle: true,           // true - アウトラインを繋げる, false -セクションごと
          endOfOutline: '　',           // アウトライン後のスペース文字

          isThroughOut: false,          // ナンバリングの範囲 true - 文書全体, false - チャプターごと
          figurePrefix: 'Fig.',         // 図のナンバリングの接頭語
          figureSuffix: ' ',            // 図のナンバリングの接尾語・スペース
          tablePrefix: 'Table',         // テーブルのナンバリングの接頭語
          tableSuffix: ' ',             // テーブルのナンバリングの接尾語・スペース
          mathPrefix: '(',              // 数式のナンバリングの接頭語
          mathSuffix: ' ',              // 数式のナンバリングの接尾語
          detailFormat: '{num}',        // ナンバリングする文字の形式

          aozoraRuby: false,            // true - 青空文庫書式の一部を有効, false - 青空文庫書式をスルー
          indentString: '　',           // 段落字下げで挿入する文字列, 空 - 挿入しない
          excludeIndentClasses: []      // indentStringを適用しないクラス名
        }
        if (userOptions) {
          this.options = Object.assign(this.options, userOptions);
        }

        if (this.hasProcessed) {
          this.options.isBypass = true;
        }
      }

      get isBypass() {
        return this.options.isBypass;
      }

      GenerateIndent() {
        if (this.options.indentString === '') {
          return;
        }

        function jisage(lineText, indentString, lastIsBreakLine, waitingFirstHead) {
          const startWithPs = /^[\u0028\u005B\u007B\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2308\u230A\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u2E42\u2E55\u2E57\u2E59\u2E5B\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3F\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62]/.test(lineText)
          const startWithPf = /^[\u00BB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21]/.test(lineText)
          const startWithPi = /^[\u00AB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20\u0022\u0027]/.test(lineText)
          const isHangingPunctuationFirst = startWithPs || startWithPf || startWithPi;
          const isEmptyLine = lineText.trim() === '';
          let resultText = '';
          if (isEmptyLine) {
            resultText = lineText;
          }
          else if (waitingFirstHead || (lastIsBreakLine && !isHangingPunctuationFirst)) {
            const sageText = lineText.replace(/(.*?)/, `${indentString}$1`);
            resultText = sageText;
          }
          else {
            resultText = lineText;
          }

          const isBreakLine = /  \r?\n?$/.test(lineText);
          return {
            text: resultText,
            waitingFirstHead: isEmptyLine && waitingFirstHead,
            isBreakLine: isBreakLine
          };
        }

        function getClassList(divStack) {
          const classList = divStack.flatMap(div => {
            return div.split(' ');
          });
          return classList;
        }

        function serialize(obj) {
          if (obj === null) {
            return "null";
          }
          if (typeof obj === "string") {
            return '"' + obj.replace(/"/g, '\\"') + '"';
          }
          if (typeof obj === "number" || typeof obj === "boolean") {
            return String(obj);
          }
          if (Array.isArray(obj)) {
            return "[" + obj.map(serialize).join(", ") + "]";
          }
          if (typeof obj === "object") {
            return "{" + Object.keys(obj).map(k => '"' + k + '": ' + serialize(obj[k])).join(", ") + "}";
          }
          return 'null';
        }

        let divStack = [];
        let currentDivClasses = [];
        this.nodes = this.nodes.map(node => {

          if (node.type === 'container') {
            const lineText = node.toString();
            const divStyleMatch = lineText.match(/^:::([^\s\{]+)/);
            if (divStyleMatch) {
              divStack.push(divStyleMatch[1]);
            }

            let classList = [];
            let regex = /\.(\w[\w-]*)/g
            let spanStyleMatch;
            while ((spanStyleMatch = regex.exec(lineText)) !== null) {
              classList.push(spanStyleMatch[1]);
            }
            if (classList.length > 0) {
              divStack.push(classList.join(' '));
              currentDivClasses = getClassList(divStack);
            }
          }
          else if (node.type === 'container-end') {
            if (divStack.length > 0) {
              divStack.pop();
              currentDivClasses = getClassList(divStack);
            }
          }
          else if (node.type === 'paragraph') {
            if (!this.options.excludeIndentClasses.find(item => currentDivClasses.includes(item))) {
              let buf = node.toString().split('\n');
              let waitingFirstHead = true;
              let lastIsBreakLine = true;
              for (let index = 0; index < buf.length; index++) {
                const result = jisage(buf[index], this.options.indentString, lastIsBreakLine, waitingFirstHead);
                buf[index] = result.text;
                waitingFirstHead = result.waitingFirstHead;
                lastIsBreakLine = result.isBreakLine;
              }

              if (!waitingFirstHead) {
                node.update(buf.join('\n'));
              }
            }
          }

          return node;
        });
      }

      ParseAozora() {
        if (!this.options.aozoraRuby) {
          return;
        }

        const thruList = ['container', 'code', 'math', 'frontmatter'];
        this.nodes
          .filter(node => !thruList.includes(node.type))
          .forEach(node => {
            const rawLine = node.toString();
            const formattedText = this.aozoraFormat(rawLine);
            if (formattedText !== rawLine) {
              node.update(formattedText);
            }
          }
          );
      }

      aozoraFormat(text) {
        const mode = this.options.aozoraRuby;
        if (mode === false) {
          return text;
        }

        // 注記のはじめと終わりで挟んだルビの記法
        const remoteRubyReplacer = (match, isLeftPre, baseText, isLeftPost, rubyText) => {
          if (mode === 'delete') {
            return baseText;
          }
          if (isLeftPre !== isLeftPost) {
            return match;
          }

          const checkRegexp = new RegExp(`${baseText}［＃`, 'g');
          if (!checkRegexp.test(match)) {
            // 注釈の直前に対象がなければ原文を返す
            return match;
          }

          const regexp = new RegExp(`${baseText}`, 'g');
          if (isLeftPre === '左に') {
            // ［＃注記付き］名※［＃二の字点、1-2-22］［＃「（銘々）」の注記付き終わり］の、注記の付け方
            return `${baseText}<span class="notes">［＃左に「${rubyText}」の注記付き終わり］</span>`;
          }
          else {
            // ［＃左に注記付き］名※［＃二の字点、1-2-22］［＃左に「（銘々）」の注記付き終わり］の、注記の付け方
            return `<span><ruby><rb>${baseText}</rb><rp>（</rp><rt>${rubyText}</rt><rp>）</rp></ruby></span>`;
          }
        };
        text = text.replace(/［＃(左に|\S*?)注記付き］(.*?)［＃(左に|\S*?)「(\S*?)」の注記付き終わり］/g, remoteRubyReplacer);

        // 単独の注記によるルビの記法
        const annotatedReplacer = (match, preamble, annotate, baseText, isLeft, rubyText, descriptor) => {
          if (mode === 'delete' || descriptor === '') {
            return preamble;
          }

          const checkRegexp = new RegExp(`${baseText}［＃`, 'g');
          if (!checkRegexp.test(match)) {
            // 注釈の直前に対象がなければ原文を返す
            return match;
          }

          const regexp = new RegExp(`${baseText}`, 'g');
          if (isLeft === 'の左') {
            // ［＃「文章」に「ママ」の注記］の、ルビの付け方
            return `${preamble}<span class="notes">${annotate}</span>`;
          }
          else {
            // ［＃「文章」の左に「ママ」の注記］の、注記の付け方
            return preamble.replace(regexp, `<span><ruby><rb>${baseText}</rb><rp>（</rp><rt>${rubyText}</rt><rp>）</rp></ruby></span>`);
          }
        };
        text = text.replace(/(\S*?)(［＃「(.*?)」(の左|.*?)に「(.*?)」の(ルビ|注記)］)/g, annotatedReplacer);

        // パイプ付きルビの記法
        const specificWordReplacer = (match, baseText, rubyText) => {
          return (mode === 'delete') ? baseText : `<span><ruby><rb>${baseText}</rb><rp>（</rp><rt>${rubyText}</rt><rp>）</rp></ruby></span>`;
        };
        text = text.replace(/｜([^《]+)《([^》]+)》/g, specificWordReplacer);

        const autoWordDetectReplacer = (match, baseText, rubyText) => {
          return (mode === 'delete') ? baseText : `<span><ruby><rb>${baseText}</rb><rp>（</rp><rt>${rubyText}</rt><rp>）</rp></ruby></span>`;
        };

        // 自主判別型のルビの記法
        text = text.replace(/([\u4E00-\u9FFF仝々〆〇ヶ※]+)《([^》]+)》/g, autoWordDetectReplacer);  // 漢字に続く
        text = text.replace(/([\u3040-\u309F]+)《([^》]+)》/g, autoWordDetectReplacer); // ひらがなに続く
        text = text.replace(/([\u30A0-\u30FF]+)《([^》]+)》/g, autoWordDetectReplacer); // カタカナに続く
        // 英数に続く・ラテン1補助～IPA拡張を含む
        text = text.replace(/\b([a-zA-Z!-@\uFF41-\uFF5A\uFF21-\uFF3A\uFF01-\uFF21\u00A0-\u02AF]+)\s*《([^》]+)》/g, autoWordDetectReplacer);
        return text;
      }

      replaceZenkakuToHankaku(str) {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
          return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
      }

      GenerateNumbers() {
        if (!this.options.enableNumbering) {
          return;
        }

        this.counters = [1, 1, 1, 1, 1, 1];
        this.lastHeaderLevel = 0;
        this.figureCounter = 1;
        this.tableCounter = 1;
        this.mathCounter = 1;
        this.currentHeadingNumber = 0;
        this.isNumberingBlock = false;

        this.nodes.forEach(node => {
          //      node.children && node.children.forEach(child => processNode(child));
          if (node.type === 'heading') {
            this.processHeading(node);
          }
          else if (this.options.enableDetailNumbering && node.type === 'figure') {
            this.processFigure(node);
          }
          else if (this.options.enableDetailNumbering && node.type === 'table') {
            this.processTable(node);
          }
          else if (this.options.enableDetailNumbering && node.type === 'math') {
            this.processMath(node);
          }
          else if (node.type === 'container' && node.children) {
            console.warn('unknown container merge process');
            // コンテナの中身も同様にマージ＋処理したい場合は再帰
            node.children.forEach(child => processNode(child));
            // 子供を toString して container 全体を更新
            const parts = node.toString().split('\n');
            const head = parts[0], tail = parts[parts.length - 1];
            const body = node.children.map(c => c.toString()).join('\n');
            node.update([head, body, tail].join('\n'));
          }
        });

        // importタイプの目次の見出しを更新する
        const headerNodes = this.nodes
          .filter(node => node.type === 'heading')
          .map(node => {
            const match = node.toString().trim().match(/^(#{1,6})\s+?([^\{]*)?(?:\s*\{(.*)\})?/);
            if (!match) {
              console.warn('unexpected header node.');
              return null;
            }
            const attributes = match[3];
            if (attributes &&
              (attributes.includes('ignore=true') || attributes.includes('.unnumbered') || attributes.includes('.nonumbering'))) {
              return null;  // 目次にしない見出しを除外する
            }

            const level = match[1].length;
            const title = match[2];
            const modifiedMatch = node.modifiedContent ? node.modifiedContent.match(/^(#{1,6})\s+?([^\{]*)?(?:\s*\{(.*)\})?/) : null;
            const numberedTitle = modifiedMatch ? modifiedMatch[2] : null;

            const generatedId = this.replaceZenkakuToHankaku(title);  // 仮のIDを、全角文字を半角にするなどして生成
            let evaluationId = null;
            if (attributes) {
              // ユーザー指定されているIDを抽出するか、アトリビュートにIDがなければ生成したIDを評価用に用意する
              const attributeMatch = attributes.match(/(?<=^|\s)#[\p{L}0-9_-]+/gu);
              evaluationId = attributeMatch && attributeMatch.length > 0 ? attributeMatch[0] : `#${generatedId}`;
            }
            else {
              // ID情報がなければ生成したIDを評価用に用意する
              evaluationId = `#${generatedId}`;
            }

            // 目次と見出しの突合に必要な情報を用意して返す
            return [level, title, numberedTitle, evaluationId];
          })
          .filter(node => node);

        const tocNodes = this.nodes
          .filter(node => node.type === 'import-toc')
          .flatMap(tocNode => {
            const newTitle = tocNode.toString().replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (tocRaw, tocAnchorTitle, tocAnchorTag) => {
              const newTitles = headerNodes.map(headerNode => {
                if (headerNode == null) {
                  return null;  // 目次に挙げない項目はスルー
                }

                // ナンバリング前の見出し文字列とID値が同じなら、目次の当該見出しと見なしてナンバリング後の表記を返す
                const originalTitle = headerNode[1];
                const numberedTitle = headerNode[2];
                const evaluationId = headerNode[3];

                const titleMatched = originalTitle === tocAnchorTitle;
                const anchorMatched = evaluationId ? evaluationId === tocAnchorTag : true;

                return titleMatched && anchorMatched ? `[${numberedTitle}](${tocAnchorTag})` : null;
              })
                .filter(node => node);

              //console.warn(`level = ${headerNode[0]}, title = ${numberedTitle}, e.id = ${evaluationId}`);

              // 通常はないはずの状況をチェック
              if (newTitles.length == 0) {
                console.warn('not found header for toc.');
                return tocRaw;
              }
              else if (newTitles.length > 1) {
                console.warn('toc and headings are not one-to-one.');
              }

              // ナンバリング後の表記を返す
              return newTitles[0];
            });

            // tocブロックの全体がreplaceし終わったrawデータをmodifiedContentへ反映する
            tocNode.update(newTitle);
            return newTitle;
          });
      }

      processHeading(node) {
        const match = node.toString().match(/^(#{1,6})\s+(.*)/);
        if (!match) return;

        const level = match[1].length;
        const title = match[2];
        const hIndex = level - 1;

        console.log(`level = ${level}, title = ${title}`);

        // 見出しレベルをインデックス値に変換するデータ
        const headsToIndex = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const headLevel_i = headsToIndex.findIndex(h => h === `h${match[1].length}`);
        const headFrom_i = headsToIndex.findIndex(h => h === this.options.headFrom);
        const headTo_i = headFrom_i + this.options.headDepth;

        if (headLevel_i < headFrom_i || headTo_i <= headLevel_i || headsToIndex.length <= headLevel_i) {
          this.isNumberingBlock = false;
          return;
        }
        if (/\{[^\}]*\.noNumbering[^\}]*\}/.test(title)) {
          this.isNumberingBlock = false;
          return;
        }
        this.isNumberingBlock = true;

        // H1～H6用のカウンター配列で使わない下位部分をリセットし、当該カウンター値を用意する
        for (let i = headLevel_i + 1; i < this.counters.length; i++) {
          this.counters[i] = 1;
        }
        const updatedCounter = (headLevel_i <= this.lastHeaderLevel) ? ++this.counters[hIndex] : this.counters[hIndex];
        this.lastHeaderLevel = headLevel_i;

        // 図表式の番号は通し番号でない場合、章ごとにリセット
        this.currentHeadingNumber = this.counters[headFrom_i];
        if (headLevel_i == headFrom_i && !this.options.isThroughOut) {
          this.figureCounter = 1;
          this.tableCounter = 1;
          this.mathCounter = 1;
        }

        // 表示文字種に従ってカウンターを書式付文字列に置き換えて見出しへ付ける
        const headFormatsFrom = this.options.combineTitle ? 0 : headLevel_i - headFrom_i;
        const headFormatsTo = headLevel_i - headFrom_i + 1;
        const headFormats = this.options.headFormat.slice(headFormatsFrom, headFormatsTo);

        const numberingPartsFrom = this.options.combineTitle ? headFrom_i : headLevel_i;
        const numberingPartsTo = headLevel_i + 1;
        const numberingParts = this.counters.slice(numberingPartsFrom, numberingPartsTo);

        const printedParts = headFormats.map(format => {
          if (numberingParts.length == 0) {
            return format;
          }
          const partNumber = numberingParts.shift().toString();
          const partString = this._printf(format, partNumber);
          return partString;
        });
        const combined = printedParts.join('');

        node.update(`${match[1]} ${combined}${this.options.endOfOutline}${title}`);
      }

      _printf(format, value) {
        const text = format.replace(/(.?)(\{[a-z]+\})(.?)/g, function (match, prefix, typeString, suffix) {
          if (typeString === '{zenkaku}') {
            value = value.replace(/[0-9]/g, function (s) {
              const zenkaku = '０１２３４５６７８９';
              return zenkaku[parseInt(s)];
            });
          }
          else if (typeString === '{kanji}') {
            value = value.replace(/[0-9]/g, function (s) {
              const kanji = '〇一二三四五六七八九';
              return kanji[parseInt(s)];
            });
          }
          return `${prefix}${value}${suffix}`;
        })

        return text;
      }

      getNumbering(type) {
        if (!this.isNumberingBlock) {
          return '';
        }

        let prefix = '';
        let format = '';
        let counter = 0;
        let suffix = '';

        switch (type) {
          case 'figure':
            prefix = this.options.figurePrefix;
            format = this.options.detailFormat;
            counter = this.figureCounter++;
            suffix = this.options.figureSuffix;
            break;

          case 'table':
            prefix = this.options.tablePrefix;
            format = this.options.detailFormat;
            counter = this.tableCounter++;
            suffix = this.options.tableSuffix;
            break;

          case 'math':
            prefix = this.options.mathPrefix;
            format = this.options.detailFormat;
            counter = this.mathCounter++;
            suffix = this.options.mathSuffix;
            break;
        }

        const headingNumberString = this._printf(format, this.currentHeadingNumber.toString());
        const numberString = this._printf(format, counter.toString());
        if (this.options.isThroughOut) {
          return `${prefix}${numberString}${suffix}`;
        }
        else {
          return `${prefix}${headingNumberString}-${numberString}${suffix}`;
        }
      }

      processFigure(node) {
        const numbering = this.getNumbering('figure');
        const newRaw = node.toString().replace(/(!\[)([^\]]*)(\])/, `$1${numbering}$2$3`);
        node.update(newRaw);
      }

      processTable(node) {
        if (!node.toString().match(/(.*\|.*\r?\n)(table:|:)(.*)/s)) {
          return;
        }

        const numbering = this.getNumbering('table');
        const newRaw = node.toString().replace(/(.*\|.*\r?\n)(table:|:)(.*)/s, `$1$2${numbering}$3`);
        node.update(newRaw);
      }

      processMath(node) {
        if (!/(\r?\n:\s)(.*)/s.test(node.toString())) {
          return;
        }

        const numbering = this.getNumbering('math');
        const newRaw = node.toString().replace(/(\r?\n:\s)(.*)/s, `$1${numbering}$2`);
        node.update(newRaw);
      }
    }

    // メインフロー

    const userSettings = defaultsOptions[selectedOptionType];
    const numberingManager = new NumberingManager(markdown, userSettings);

    if (numberingManager.isBypass) {
      return markdown;
    }

    numberingManager.GenerateIndent();
    numberingManager.ParseAozora();
    numberingManager.GenerateNumbers();
    return numberingManager.toString();

    // ここまで
  },




































  onDidParseMarkdown: async function (html) {
    //return html;
    //throw new Error(html);
    // ここから

    // 動作オプションの選択
    selectedOptionType = 'type6';

    // 動作オプションのパターン
    defaultsOptions = {
      custom: { // カスタムを使用
        name: 'custom settings',
        headFrom: 'h2',
        headDepth: 2,
        classPrefixList: ['chapter', 'section'],
        headerType: 'outside',
        headerTitle: 'chapter'
      },
      type0: {  // デフォルトを使用
        name: 'default settings',
        isBypass: false
      },
      type1: {  // レポート風・見出し深さ２まで
        name: 'report',
        headFrom: 'h2',
        headDepth: 2,
        classPrefixList: ['chapter', 'section'],
        headerType: 'center',
        headerTitle: 'none',
      },
      type2: {  // レポート風・見出し深さ３まで
        name: 'detail report',
        headFrom: 'h2',
        headDepth: 3,
        classPrefixList: ['chapter', 'section', 'paragraph'],
        headerType: 'center',
        headerTitle: 'none',
        totalPages: true
      },
      type3: {  // ノンフィクション風
        name: 'Non-fictions',
        headFrom: 'h2',
        headDepth: 2,
        classPrefixList: ['chapter', 'section'],
        headerType: 'outside',
        headerTitle: 'chapter'
      },
      type4: {  // ノンフィクション風・ナンバリングなし
        name: 'Non-fictions(no-numbering)',
        headFrom: 'h2',
        headDepth: 2,
        classPrefixList: ['chapter', 'section'],
        headerType: 'outside',
        headerTitle: 'chapter'
      },
      type5: {  // フィクション風
        name: 'story book',
        headFrom: 'h2',
        headDepth: 1,
        classPrefixList: ['chapter'],
        headerType: 'top',
        headerTitle: 'chapter'
      },
      type6: {  // 縦書き・フィクション風（試験段階）
        name: 'Japanese story book',
        headFrom: 'h2',
        headDepth: 2,
        classPrefixList: ['chapter', 'section'],
        headerType: 'none',
        pageProgressionDirection: 'rtl'
      },
      typeX: {  // バイパス
        name: 'bypass true',
        isBypass: true
      }
    };

    class Node {
      constructor(type, raw = '') {
        this.type = type;
        this.raw = raw;
        this.modifiedContent = null;
        this.parent = null;
        this.children = [];
      }

      appendChild(node) {
        node.parent = this;
        this.children.push(node);
      }

      toString() {
        let result = this.modifiedContent !== null ? this.modifiedContent : this.raw;
        for (const child of this.children) {
          result += child.toString();
        }
        return result;
      }

      update(newContent) {
        this.modifiedContent = newContent;
      }

      get textContent() {
        if (this.isText()) {
          return this.modifiedContent !== null ? this.modifiedContent : this.raw;
        }
        return this.children
          .filter(child => child.isText())
          .map(child => child.raw !== null ? child.modifiedContent : child.raw)
          .join('');
      }

      set textContent(text) {
        if (this.isText()) {
          this.update(text);
        }
      }

      isElement() {
        return this.type === 'element';
      }

      isText() {
        return this.type === 'text';
      }

      hasTag(tagName) {
        return this.isElement() && this.tagName && tagName && this.tagName.toLowerCase() === tagName.toLowerCase();
      }

      hasId(id) {
        return this.isElement() && this.attributes && id && this.attributes['id'] === id;
      }


      get nextElementSibling() {
        if (!this.parent) return null;
        const siblings = this.parent.children;
        const currentIndex = siblings.indexOf(this);
        for (let i = currentIndex + 1; i < siblings.length; i++) {
          if (siblings[i].isElement()) {
            return siblings[i];
          }
        }
        return null;
      }

      querySelectorAll(selector) {
        const results = [];
        const [tag, id, classes] = this._parseSelector(selector);

        const checkNode = (node) => {
          // 現在のノードがセレクタに一致するかどうかを判定
          if (node.isElement()) {
            const isMatch = (!tag || node.hasTag(tag)) &&
              (!id || node.attributes.id === id) &&
              (!classes || classes.every(cls => node.classList.includes(cls)));

            if (isMatch) {
              results.push(node);
            }
          }

          // 子ノードも再帰的にチェックする
          for (const child of node.children) {
            checkNode(child);
          }
        };

        checkNode(this);
        return results;
      }

      _parseSelector(selector) {
        const parts = selector.match(/([a-zA-Z0-9_-]+)|#([a-zA-Z0-9_-]+)|\.([a-zA-Z0-9_-]+)/g);
        let tag = '';
        let id = '';
        const classes = [];
        if (parts) {
          for (const part of parts) {
            if (part.startsWith('#')) {
              id = part.substring(1);
            } else if (part.startsWith('.')) {
              classes.push(part.substring(1));
            } else {
              tag = part;
            }
          }
        }
        return [tag, id, classes];
      }
    }

    class ElementNode extends Node {
      constructor(raw, rawStart, tagName, attributes = {}, rawEnd = null) {
        super('element', raw);
        this.rawStart = rawStart;
        this.tagName = tagName;
        this.attributes = attributes;
        this.classList = (attributes.class || '').split(' ').filter(c => c);
        this.innerHTML = '';
        this.rawEnd = rawEnd;
      }

      set innerHTML(htmlString) {
        this.children = [];
        const parser = new HtmlParser(htmlString);
        const docFragment = parser.parse();
        for (const child of docFragment.children) {
          this.appendChild(child);
        }
      }

      setAttributes(property, value) {
        this.attributes[property] = value;
        const attributes = Object.entries(this.attributes).map((arrayElem) => arrayElem[0] + '="' + arrayElem[1] + '"');
        this.rawStart = '<' + this.tagName + ' ' + attributes.join(' ') + '>';
      }

      setClassList(className) {
        this.classList.push(className);
        this.setAttributes('class', this.classList.join(' '));
      }

      hasClass(classNamePrefix) {
        return this.classList.map(name => name.startsWith(classNamePrefix) ? name : null);
      }

      setOutline(outline) {
        this.outline = outline;
        this.setAttributes('outline', outline);
      }

      toString(asInnerText = false) {
        let result = '';
        if (asInnerText) {
          for (const child of this.children) {
            result += child.toString(true);
          }
        }
        else {
          result += this.rawStart;
          for (const child of this.children) {
            result += child.toString();
          }
          // rawEndが定義されている場合のみ追加する
          if (this.rawEnd) {
            result += this.rawEnd;
          }
        }
        return result;
      }

      update(text) {
        if (this.children.length == 0) {
          // 子がなければ、子を作ってtextを保持する
          const newNode = new Node('text', text)
          this.appendChild(newNode);
          return;
        }

        const pNodes = this.children.filter(child => child.querySelectorAll('p').length > 0);
        const targetPNode = (pNodes.length > 0) ? pNodes[0] : null;

        if (!targetPNode) {
          const textNodes = this.children.filter(node => node.isText());
          const targetTextNodes = (textNodes.length > 0) ? textNodes[0] : null;

          // pタグがなければテキストノードの状況に応じる
          if (textNodes.length == 0) {
            // テキストノードもなければテキストノードを作って進める
            const newNode = new Node('text', text)
            this.appendChild(newNode);
            targetTextNodes = newNode;
            console.error(`Warning: Some nodes but no text nodes, unexpected structure.`);
          }
          else if (textNodes.length > 1) {
            // テキストノードが複数ある状況
            console.error(`Warning: Unexpected structure with many text nodes.`);
          }

          // 先頭のテキストノードにテキストを設定して返す
          targetTextNodes.update(text);
        }
        else {
          const textNodes = targetPNode.children.filter(node => node.isText());
          const targetTextNodes = (textNodes.length > 0) ? textNodes[0] : null;

          if (pNodes.length > 1) {
            // pノードが複数ある状況
            console.error(`Warning: Unintended structure with multiple p node.`);
          }

          // pタグがあればpタグ内のテキストノードの状況に応じる
          if (textNodes.length == 0) {
            // 対象となる子テキストノードがなければ、作ってtextを保持する
            const newNode = new Node('text', text)
            targetPNode.appendChild(newNode);
            targetTextNodes = newNode;
            console.error(`Warning: Unintended structure where there is no text node as a child of p.`);
          }
          else if (textNodes.length > 1) {
            // テキストノードが複数ある状況
            console.error(`Warning: Unintended structure with multiple text node.`);
          }

          // 先頭のテキストノードにテキストを設定して返す
          targetTextNodes.update(text);
        }

      }

      wrapWithSiblingElements(wrapTag, tagName) {
        const parent = this.parent;
        if (!parent) {
          console.error('Error: Cannot wrap a node without a parent.');
          return;
        }
        if (!tagName) {
          tagName = this.tagName;
        }

        // ラップするノードを収集
        const nodesToWrap = [];
        let currentNode = this;
        while (currentNode) {
          //if (currentNode.isElement() && headerTags.includes(currentNode.tagName.toLowerCase()) && currentNode !== this) {
          if (currentNode.isElement() && currentNode !== this) {
            if (currentNode.hasTag(tagName)) {
              break; // 次のヘッダータグが見つかったら終了
            }
            if (currentNode.hasTag('section') && currentNode.hasId('footnotes')) {
              break; // 脚注のsectionが見つかったら、特別に終了
            }
          }

          nodesToWrap.push(currentNode);
          const currentIndex = parent.children.indexOf(currentNode);
          currentNode = parent.children[currentIndex + 1];
        }

        // 新しいラッパー要素を作成
        const wrapperNode = HtmlParser.createElement(wrapTag);

        // ラップ対象ノードを親から削除し、ラッパーノードの子として追加
        const startIndex = parent.children.indexOf(this);
        parent.children.splice(startIndex, nodesToWrap.length);

        nodesToWrap.forEach(node => {
          wrapperNode.appendChild(node);
        });

        // ラッパーノードを元の位置に挿入
        parent.children.splice(startIndex, 0, wrapperNode);
        wrapperNode.parent = parent;
        return wrapperNode;
      }
    }

    class HtmlParser {
      constructor(htmlString) {
        this.htmlString = htmlString;
        this.pos = 0;
        this.voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
      }

      parse() {
        const root = new Node('root', '');
        this._parseChildren(root);
        return root;
      }

      static createElement(tagName) {
        const rawStart = `<${tagName}>`;
        const rawEnd = `</${tagName}>`;
        return new ElementNode('', rawStart, tagName, {}, rawEnd);
      }

      _parseChildren(parentNode) {
        while (this.pos < this.htmlString.length) {
          const remainingHtml = this.htmlString.substring(this.pos);

          // 終了タグ
          const endTagMatch = remainingHtml.match(/^<\/([a-zA-Z0-9_-]+)>/);
          if (endTagMatch) {
            const tagName = endTagMatch[1];
            // 終了タグが親ノードと一致する場合、パースを終了する
            if (parentNode.hasTag(tagName)) {
              parentNode.rawEnd = endTagMatch[0];
              this.pos += endTagMatch[0].length;
              return;
            }
            // 一致しない場合、親ノードのパースを終了する（自動クローズ）
            return;
          }

          // コメント
          const commentMatch = remainingHtml.match(/^<!--.*?-->/s);
          if (commentMatch) {
            const raw = commentMatch[0];
            parentNode.appendChild(new Node('comment', raw));
            this.pos += raw.length;
            continue;
          }

          // DOCTYPE
          const doctypeMatch = remainingHtml.match(/^<!DOCTYPE.*?>/s);
          if (doctypeMatch) {
            const raw = doctypeMatch[0];
            parentNode.appendChild(new Node('doctype', raw));
            this.pos += raw.length;
            continue;
          }

          // 開始タグ
          const startTagMatch = remainingHtml.match(/^<([a-zA-Z0-9_-]+)([\s\S]*?)>/s);
          if (startTagMatch) {
            const rawStart = startTagMatch[0];
            const tagName = startTagMatch[1];
            const rawAttributes = startTagMatch[2];
            const attributes = this._parseAttributes(rawAttributes);
            const element = new ElementNode('', rawStart, tagName, attributes);
            parentNode.appendChild(element);
            this.pos += rawStart.length;

            // 自己終了タグの場合、子ノードのパースは不要
            if (rawStart.endsWith('/>') || this.voidElements.includes(tagName.toLowerCase())) {
              continue;
            }

            // 子ノードを再帰的にパース
            this._parseChildren(element);
            continue;
          }

          // テキスト（空白、改行含む）
          const textMatch = remainingHtml.match(/^[^<]+/s);
          if (textMatch) {
            const raw = textMatch[0];
            parentNode.appendChild(new Node('text', raw));
            this.pos += raw.length;
            continue;
          }

          // 予期せぬ文字の場合、1文字進める
          this.pos++;
        }
      }

      _parseAttributes(rawAttributes) {
        const attributes = {};
        const regex = /([a-zA-Z0-9_-]+)(?:=("[^"]*"|'[^']*'|[^'"\s>]+))?/g;
        let match;
        while ((match = regex.exec(rawAttributes)) !== null) {
          const name = match[1];
          const value = match[2] ? match[2].slice(1, -1) : '';
          attributes[name] = value;
        }
        return attributes;
      }
    }

    class NumberingManager extends HtmlParser {
      constructor(htmlString, userOptions = null) {
        super(htmlString);

        // デフォルトの動作オプション
        this.options = {
          isBypass: false,                  // true - 処理全体をバイパスする, false - 実行する
          ignoreClass: 'noNumbering',       // ナンバリングしないクラス名

          headFrom: 'h2',                   // 処理する見出しの開始レベル
          headDepth: 1,                     // 見出しの深さ
          classPrefixList: ['chapter', 'section', 'paragraph'], // sectionに付けるクラス名

          headerType: 'center',             // 'none', 'center', 'top', 'outside'
          headerTitle: 'none',              // ページのヘッダ表示 'none' - なし, 'book' - 書籍名, 'chapter' - チャプター名
          totalPages: false,                // true - 総ページ数を表示する, false - しない
          pageProgressionDirection: 'ltr',  // 'ltr' - 横書き（右へ）, 'rtl' - 縦書き（左へ）

          tocClassName: 'pdf-toc',          // @import方式のtocを包んでいるクラス名
          tocLinkWrapperClassName: 'toc-link-wrapper',  // tocの項をラップするクラス名
          tocPagePrefix: 'p.',              // 目次のページ番号を指定する前置詞

          removeSpace: true                 // true - 段落中の「。」に続く半角スペースを除去する, false - しない
        }
        if (userOptions) {
          this.options = Object.assign(this.options, userOptions);
        }

        this.root = this.parse();
        if (!this.root) {
          throw new Error('Could not parse html.');
        }
      }

      get isBypass() {
        return this.options.isBypass;
      }

      bodyCheck() {
        // htmlのheadとbodyの存在をチェックし、ノードを保持する
        const elemHtml = this.root.querySelectorAll('html');
        if (!elemHtml || !elemHtml.length) {
          console.log("Not find the html tag. Required for rendered html.");
        }
        else if (elemHtml.length > 1) {
          throw new Error('too much the html tag.');
        }

        const elemHead = elemHtml.flatMap(elem => elem.querySelectorAll('head'));
        if (!elemHead || !elemHead.length) {
          console.log("Not find the head tag. Required for rendered html.");
        }
        else if (elemHead.length > 1) {
          throw new Error('too much the head tag.');
        }
        else {
          this.elemHead = elemHead;
        }

        const elemBody = elemHtml.flatMap(elem => elem.querySelectorAll('body'));
        if (!elemBody || !elemBody.length) {
          console.log("Not find the body tag. Required for rendered html.");
          console.log("The beginning of the node is considered the body.");
          console.log(`A gaven root node has ${this.root.children.length} child node.`);

          this.elemBody = this.root;
        }
        else if (elemBody.length > 1) {
          throw new Error('too much the body tag.');
        }
        else {
          this.elemBody = elemBody[0];
        }
      }

      removeSpace() {
        if (!this.options.removeSpace) {
          return;
        }

        // 各pタグ中の各子ノードで、テキストの改行と半角スペースを除去する
        const pTags = this.elemBody.querySelectorAll('p');
        for (const pTag of pTags) {
          for (const child of pTag.children) {
            if (child.isText()) {
              let sourceText = child.toString();
              if (/(。)\r?\n\s{2,}?/g.test(sourceText)) {
                // 「。」に続く改行と続く半角スペースを除去する
                const newText = sourceText.replace(/(。)\r?\n\s{2,}/g, '$1');
                child.update(newText);
                sourceText = newText;
              }
              if (/(.+?。)\s(.+?)/g.test(sourceText)) {
                // 「。」に続く半角スペースが残っていたら除去する
                const newText = sourceText.replace(/(.+?。)\s(.+?)/g, '$1$2');
                child.update(newText);
              }
            }
          }
        }
      }

      _digHeads(parent, headList, indexList = [1]) {
        const workingHeadList = [...headList];
        const headTag = workingHeadList.shift();
        const workingIndexList = indexList ? [...indexList] : null;

        const targetHeaders = parent.querySelectorAll(headTag);
        targetHeaders.forEach(header => {
          const tagName = header.tagName;
          let className = this.options.ignoreClass;
          const attributes = JSON.stringify(header.attributes);

          // 目次に列挙するhタグに、クラス名と、アウトラインをtitleに付ける
          const isNoNumbering = header.classList.some(item => item === this.options.ignoreClass);
          if (!isNoNumbering) {
            const currentDepth = workingIndexList.length;
            const i = currentDepth - 1;
            className = `${this.options.classPrefixList[i]}${workingIndexList[i]}`;
          }
          console.log(`${tagName} ${className} ${attributes}`);

          // hタグ以降の要素をsectionでラップする
          const headerTags = ['h1', 'h2', 'h3', 'h4'];
          if (!headerTags.includes(header.tagName.toLowerCase())) {
            console.error(`Error: wrapWithSiblingElements must be called on an h1~h4 tag, but was called on <${header.tagName}>`);
          }
          const wrapper = header.wrapWithSiblingElements('section');

          // 目次に列挙するhタグをラップしたsectionには、hタグの関連情報を埋め込む
          if (!isNoNumbering) {
            wrapper.setClassList(className);
            wrapper.chapter = workingIndexList[0];
            wrapper.headerLevel = workingIndexList.length;
          }

          // ナンバリングする深さの間、子レベルを再帰処理する
          const isLastDepth = !workingHeadList || workingHeadList.length === 0;
          if (!isLastDepth) {
            workingIndexList.push(1);
            this._digHeads(wrapper, workingHeadList, workingIndexList);
            workingIndexList.pop();
          }

          // 目次に列挙するhタグを処理したらアウトラインの値を増やし、同階層の次のノードの処理へ進む
          if (!isNoNumbering) {
            const currentHeaderLevel = workingIndexList.length - 1;
            workingIndexList[currentHeaderLevel]++;
          }
        });
      }

      wrapSections() {
        const headParentSet = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const headFrom = headParentSet.findIndex(h => h === this.options.headFrom);
        const headList = headParentSet.slice(headFrom, headFrom + this.options.headDepth);

        this._digHeads(this.elemBody, headList);
      }

      generatePages() {
        // 最初のh1の見出しを書籍名としてピックアップする
        let bookTitle = '';
        const topHeaders = this.elemBody.querySelectorAll('h1')
          .map(node => {
            const asInnerText = true;
            return node.toString(asInnerText);
          });
        if (topHeaders.length > 0) {
          if (topHeaders.length > 1) {
            console.log('Multiple h1s found. This may behave differently than intended.')
          }
          bookTitle = topHeaders[0];
        }

        // ラップしたsectionタグからチャプターに絞り、見出しのタイトルなどを収集する
        const chapters = this.elemBody.querySelectorAll('section')
          .filter(section => section.headerLevel === 1)
          .filter(section => section.hasClass(this.options.classPrefixList[0]))
          .map(section => {
            if (!section.children.length) {
              throw new Error('Cannot find a node that should exist.');
            }

            const className = section.hasClass(this.options.classPrefixList[0]);
            const asInnerText = true;
            let chapterTitle = section.children[0].toString(asInnerText);
            chapterTitle = chapterTitle.replace(/[\r\n]+/g, ' '); // 見出しの改行を除去する暫定対応
            return { chapterTitle: chapterTitle, class: className };
          });

        // ノンブル用の@pageルールを生成する
        let nombreStylesRight = '';     // 'none' or unknown others
        let nombreStylesLeft = '';      // 'none' or unknown others
        if (this.options.headerType === 'center') {
          const counterString = this.options.totalPages ? "content : counter(page) ' / ' counter(pages);" : 'content : counter(page);';
          nombreStylesRight += `
  @bottom-center {
    ${counterString}
  }
`;
          nombreStylesLeft += `
  @bottom-center {
    ${counterString}
  }
`;
        }
        else if (this.options.headerType === 'top') {
          nombreStylesRight += `
  @top-right {
    content: counter(page);
  }
`;
          nombreStylesLeft += `
  @top-left {
    content: counter(page);
  }
`;
        }
        else if (this.options.headerType === 'outside') {
          nombreStylesRight += `
  @bottom-right {
    content: counter(page);
  }
`;
          nombreStylesLeft += `
  @bottom-left {
    content: counter(page);
  }
`;
        }

        // 印刷用の@pageルールを生成する
        let pageStyles = '';
        chapters.forEach(chapter => {
          let headerTitle = '';         // 'none' or unknown others
          if (this.options.headerTitle === 'book') {
            headerTitle = bookTitle;
          }
          else if (this.options.headerTitle === 'chapter') {
            headerTitle = chapter.chapterTitle;
          }

          pageStyles += `
@page page-${chapter.class}:right {
  @top-center {
    content: "${headerTitle}";
  }
${nombreStylesRight}
}
@page page-${chapter.class}:left {
  @top-center {
    content: "${headerTitle}";
  }
${nombreStylesLeft}
}
section.${chapter.class} {
  page: page-${chapter.class};
}`;
        });

        // 生成した@pageルールをstyleタグでhtmlに追加する
        const styleElement = HtmlParser.createElement("style");
        styleElement.update(pageStyles);
        if (this.elemHead) {
          // 一般的なhtmlを処理している場合はheadに追加
          this.elemHead[0].appendChild(styleElement);
        }
        else {
          // MPEのonDidParseMarkdownでhtmlの全体構造がない場合は全体の頭に追加
          this.elemBody.children.unshift(styleElement);
        }
      }

      updateLogicalProperty() {
        if (this.options.pageProgressionDirection !== 'rtl') {
          // 縦書き（左へ）の場合以外は関与しない
          return;
        }

        // [toc]形式の各見出しを抽出する
        function propertyReplacer(node, fromString, toString) {
          if (node.attributes.style.length > 0 && node.rawStart.length > 0 && fromString.length > 0 && toString.length > 0) {
            const regExp = new RegExp(`(.*)${fromString}(.*)`, 'g');
            const newStyle = node.attributes.style.replace(regExp, `$1${toString}$2`);
            node.attributes.style = newStyle;
            const newRawStart = node.rawStart.replace(regExp, `$1${toString}$2`);
            node.rawStart = newRawStart;
          }
          return node;
        }

        const mdToc = this.elemBody.querySelectorAll('div .md-toc')

        mdToc.map(toc => toc.querySelectorAll('details')
          .map(header => propertyReplacer(header, ';padding-left:', ';padding-inline-start:'))
        );

        mdToc.map(toc => toc.querySelectorAll('div .md-toc-link-wrapper')
          .map(header => propertyReplacer(header, ';margin-left:', ';margin-inline-start:'))
        );

      }

      wrapTocLinks() {
        const tocClassName = this.options.tocClassName;
        const tocLinkWrapperClassName = this.options.tocLinkWrapperClassName;

        // divまたはsectionのTOCクラスを選択して処理する
        const mdToc = this.elemBody.querySelectorAll(`.${tocClassName}`);
        const tocLinks = mdToc.flatMap(toc => toc.querySelectorAll('li'))
          .map(link => {
            if (link.children[0]) {
              const realHeaderTitle = '';
              let foundTocLink = null;
              let foundTocPage = null;
              let pageNumber = null;

              const tocPagePrefix = this.options.tocPagePrefix;
              const regExp = new RegExp(`^${tocPagePrefix}([0-9]+?)$`, '');

              let currentNode = link.children[0];
              while (currentNode) {
                if (currentNode.isElement() && currentNode.hasTag('a')) {
                  if (foundTocLink) {
                    console.warn(`multiple toc link. ${realHeaderTitle}`);
                  }
                  foundTocLink = currentNode;
                }
                else if (foundTocLink && currentNode.isText() && regExp.test(currentNode.toString().trim())) {
                  let result = regExp.exec(currentNode.toString().trim());
                  if (result && result.length == 2) {
                    foundTocPage = currentNode;
                    pageNumber = result[1];
                  }

                }

                const currentIndex = currentNode.parent.children.indexOf(currentNode);
                currentNode = currentNode.parent.children[currentIndex + 1];
              }

              // 元々のページ番号の記述を除去
              if (foundTocPage && pageNumber) {
                const aTagIndex = foundTocLink.parent.children.indexOf(foundTocLink);

                // 見出しリンクの後にリーダー線のspanを追加
                const leaderInsertIndex = aTagIndex + 1;
                const leaderNode = HtmlParser.createElement('span');
                leaderNode.setClassList('toc-leader');
                leaderNode.setAttributes('aria-hidden', 'true')
                foundTocLink.parent.children.splice(leaderInsertIndex, 0, leaderNode);

                // リーダー線の後にページ番号のspanを追加
                const pageNumberInsertIndex = aTagIndex + 2;
                const pageNumberNode = HtmlParser.createElement('span');
                pageNumberNode.setClassList('toc-page');
                pageNumberNode.update(pageNumber);
                foundTocLink.parent.children.splice(pageNumberInsertIndex, 0, pageNumberNode);

                const tocPageIndex = foundTocPage.parent.children.indexOf(foundTocPage);
                foundTocPage.parent.children.splice(tocPageIndex, 1);
              }

              // 子のulタグをdivタグでラップする
              const wrapper = link.children[0].wrapWithSiblingElements('div', 'ul');
              wrapper.setClassList(tocLinkWrapperClassName);

              return wrapper;
            }
            return link;
          });

/*
        const headParentSet = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const headFrom = headParentSet.findIndex(h => h === this.options.headFrom);
        const headList = headParentSet.slice(headFrom, headFrom + this.options.headDepth);

        this._digHeads(this.elemBody, headList); */
      }

    }

    // メインフロー

    const options = defaultsOptions[selectedOptionType];
    const parser = new NumberingManager(html, options);

    if (parser.isBypass) {
      return html;
    }

    /*
      // パース直後に文字列に戻して一致するかをテスト
      if (parser.root.toString() !== html) {
        throw new Error('Parse logic is no equivalence.');
      }
    */

    // 実処理
    parser.bodyCheck();
    parser.removeSpace();
    parser.wrapSections();
    parser.generatePages();
    parser.updateLogicalProperty();
    parser.wrapTocLinks();

    return parser.root.toString();

    // ここまで
  }
})
