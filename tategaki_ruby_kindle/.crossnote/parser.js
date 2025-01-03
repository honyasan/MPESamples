({
  // Please visit the URL below for more information:
  // https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser

  onWillParseMarkdown: async function(markdown) {
    // ルビ　形式「{吾輩|わがはい}」 コメントアウトで無効化
    // markdown = markdown.replaceAll(/{([^{|]+)\|([^|}]+)}/g, '<ruby>$1<rt>$2</rt></ruby>');

    // ルビ　形式「|吾輩《わがはい》」
    markdown = markdown.replaceAll(/｜([^｜《]+)《([^》｜]+)》/g, '<ruby>$1<rt>$2</rt></ruby>');

    // 傍点　形式「《《吾輩》》」
    markdown = markdown.replaceAll(/《《([^《》]+)》》/g, "<span style='text-emphasis:filled'>$1</span>");

    return markdown;
  },

  onDidParseMarkdown: async function(html) {
    return html;
  },
})