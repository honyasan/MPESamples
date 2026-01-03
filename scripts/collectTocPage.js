// npm install --save-dev cheerio@1.1.2 pdfjs-dist@2.16.105
const fs = require('fs').promises;
const path = require('path');

const cheerio = require('cheerio');
const pdfjsLib = require('pdfjs-dist/build/pdf.js');
pdfjsLib.GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/build/pdf.worker.js'); // pdf.js のワーカー設定

const scriptVersion = 'v1.00.000';

const pageBefore = ' <span>';
const pageAfter = '</span>';

function parseToc(foundItems, $, elem) {
  const href = $(elem).attr('href');
  const text = $(elem).find('p').text().trim() || $(elem).text().trim();
  if (href && text) {
    foundItems.push({ text: text, href: href, page: null });
    //console.log("TOC Item " + i + ":", href, text);
  }
}

async function collectTocPage() {
  const { htmlPath, pdfPath } = parseArgs();

  // HTMLファイルを読み込む
  console.log("Loading HTML file: " + htmlPath);
  const htmlContent = await fs.readFile(htmlPath, 'utf-8');
  const $ = cheerio.load(htmlContent, { decodeEntities: false });
  console.log("Loaded.");

  // 2種類のTOCの記法から見出しを抽出
  const tocItems = [];
  console.log("Checking syntax of [TOC].");
  $('.md-toc .md-toc-link-wrapper a[href^="#"].md-toc-link').each(function (i, elem) {
    parseToc(tocItems, $, elem);
  });
  if (!tocItems.length){
    console.log('Checking syntax of @import "[TOC]".');
    const test = $('#目次 ul').first().find('li > a');
    $('#目次 ul').first().find('li > a').each(function (i, elem) {
      parseToc(tocItems, $, elem);
    });
    if (!tocItems.length) {
      throw new Error("Please check how to output TOC in markdown.");
    }
  }
  console.log("TOC Items are found: ", tocItems.length);

  try {
    console.log("Loading PDF file: " + pdfPath);
    const data = await fs.readFile(pdfPath);
    const pdf = await pdfjsLib.getDocument({ data, verbosity: 0 }).promise;
    const destinations = await pdf.getDestinations();    // Named Destinations からページ番号を取得

    // pdf.jsでページ番号を取得
    console.log(`=== Identified Table of Contents ===`);
    for (const item of tocItems) {
      const destName = item.href.slice(1); // 例: midashi_level_2-1
      const destNameUri = encodeURI(destName);

      const dest = destinations[destNameUri];
      if (!(dest && dest[0])) {
        throw new Error('Could not find index name from destinations.');
      }

      const pageIndex = await pdf.getPageIndex(dest[0]);
      if (!pageIndex) {
        console.log(`Page number not found for ${item.text} (${item.href})`);
        continue;
      }

      console.log(`- [${item.text}](#${destNameUri})${pageBefore}${pageIndex + 1}${pageAfter}`) ;  // 0ページ始まりなので1加える
    }
  }
  catch (error) {
    throw error;
  }
  console.log(`======`);
  console.log('Completed.');
}

// コマンドライン引数の解析
function parseArgs() {
  const args = process.argv.slice(2); // node test.js 以降の引数
  const parsed = {
    htmlPath: null,
    pdfPath: null,
    tocOnly: true,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-h' || args[i] === '--help') {
      const thisFileName = path.basename(__filename);
      console.log('Usage: node ' + thisFileName +' <html file path> [arguments]');
      console.log('  <html file path>  specify the HTML file path.');
      console.log('  -p <pdf file path>     specify the PDF file path.');
      console.log('  -v, --version      print ' + thisFileName  + ' version.');
      console.log('  -h, --help         print command line options.');
      process.exit(0);
    }
    else if (args[i] === '-v' || args[i] === '--version') {
      console.log(scriptVersion);
      process.exit(0);
    }
    else if (args[i] === '-p' && i + 1 < args.length) {
      parsed.pdfPath = args[i + 1];
      i++;
    }
    else if (args[i].startsWith('-p ')) {
      parsed.pdfPath = args[i].slice('-p '.length);
    }
    else if (!parsed.htmlPath) {
      parsed.htmlPath = args[i];
    }
  }

  if (!parsed.htmlPath) {
    console.error('Error: Input HTML file path is required.');
    process.exit(1);
  }

  // 出力パスが未指定の場合、入力パスの拡張子を .pdf に変更
  if (!parsed.pdfPath) {
    parsed.pdfPath = path.join(
      path.dirname(parsed.htmlPath),
      path.basename(parsed.htmlPath, path.extname(parsed.htmlPath)) + '.pdf'
    );
  }

  return parsed;
}

collectTocPage().catch(function (error) {
  console.error(error);
  process.exit(1);
});