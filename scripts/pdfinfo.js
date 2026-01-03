const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { imageSizeFromFile } = require('image-size/fromFile')

async function pdfInfo(){
  const { pdfPath, popplerPath, warningDpi, onlyTopPage } = parseArgs();

  // ---- pdfinfoでページ物理サイズ（pt）取得 ----
  console.log(`executing pdfinfo for getting document information...`);
  console.log(``);
  const pdfinfoPath = path.resolve(popplerPath, 'pdfinfo');
  try{
    if (!fs.existsSync(pdfinfoPath + '.exe')){
      throw new Error('pdfinfo not found. Use the -p option to specify the location of Poppler.');
    }
    const infoOutput = execSync(`"${pdfinfoPath}" "${pdfPath}"`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString();

    const pagesLine = infoOutput.split('\n').find(line => line.startsWith('Pages:'));
    const pageRotLine = infoOutput.split('\n').find(line => line.startsWith('Page rot:'));
    const pageSizeLine = infoOutput.split('\n').find(line => line.startsWith('Page size:'));
    if (!pagesLine || !pageSizeLine) {
      throw new Error('Pages or Page size not found in pdfinfo output.')
    }

    const pagesMatch = pagesLine.match(/Pages:\s*(\d+)/);
    const pages = parseInt(pagesMatch[1]);
    if (!pages || pages < 1) {
      throw new Error('Bad Pages.')
    }

    const paseSizeMatch = pageSizeLine.match(/Page size:\s+([\d.]+)\s+x\s+([\d.]+)\s+pts/);
    const widthPt = parseFloat(paseSizeMatch[1]);
    const heightPt = parseFloat(paseSizeMatch[2]);
    if (!widthPt || !heightPt || widthPt < 1 || heightPt < 1) {
      throw new Error('Bad Page size.')
    }

    let rotation = 0;
    if (pageRotLine) {
      const rm = pageRotLine.match(/Page rot:\s*(\d+)/);
      if (rm) {
        rotation = parseInt(rm[1], 10);
      }
    }

    const widthIn = widthPt / 72;
    const heightIn = heightPt / 72;
    const mmPerInch = 25.4;
    const widthMm = widthIn * mmPerInch;
    const heightMm = heightIn * mmPerInch;

    console.log(`PDF Document Information`);
    console.log(`internal size: ${widthPt} x ${heightPt} pt (1 pdf pt = 1/72in)`);
    console.log(`page rotation: ${rotation} deg.`);

    if (rotation === 90 || rotation === 270) {
      [widthPt, heightPt] = [heightPt, widthPt];
      console.log(`Adjusted internal size for rotation: ${widthPt}x${heightPt} pt`);
    }

    console.log(`PDF size: ${widthMm.toFixed(4)} x ${heightMm.toFixed(4)} mm  (${widthIn.toFixed(4)} x ${heightIn.toFixed(4)} in)`);
    console.log(``);

    // ---- pdftoppmでページを最大解像度レンダリング ----
    // -r オプションを指定しない場合、PopplerはPDF内部の最大解像度でレンダリングする
    console.log(`executing pdftoppm for rendering PDF...`);
    console.log(``);

    console.log(`Page Information`);
    const pdftoppmPath = path.resolve(popplerPath, 'pdftoppm');
    if (!fs.existsSync(pdftoppmPath + '.exe')) {
      throw new Error("pdftoppm not found. Use the -p option to specify the location of Poppler.");
    }
    const tmpPng = path.resolve(__dirname, 'tmp_page');
    const tmpPngPath = `${tmpPng}.png`;
    for(let pageCount = 1; pageCount <= pages; pageCount++) {
      execSync(`"${pdftoppmPath}" -l ${pageCount} -singlefile -png "${pdfPath}" "${tmpPng}"`);

      const { width: pxWidth, height: pxHeight } = await imageSizeFromFile(tmpPngPath);
      const dpiX = pxWidth / widthIn;
      const dpiY = pxHeight / heightIn;
      if(!dpiX || !dpiY) {
        console.log(`Page ${pageCount} skipped`);
        continue;
      }
      
      const low = (dpiX < warningDpi || dpiY < warningDpi) ? "(Low dpi)" : "";
      console.log(`Page ${pageCount}, ${pxWidth} x ${pxHeight} px @ ${dpiX.toFixed(2)} x ${dpiY.toFixed(2)} dpi  ${low}`);

      if(onlyTopPage){
        break;
      }
    }
    console.log(``);

    fs.unlinkSync(tmpPngPath);

    console.log(`executing pdfimages for getting ppi...`);
    console.log(``);

    console.log(`Image Information`);
    // ---- pdftimagesで画像情報を取得 ----
    const pdfimagesPath = path.resolve(popplerPath, 'pdfimages');
    if (!fs.existsSync(pdfimagesPath + '.exe')) {
      throw new Error("pdfimages not found. Use the -p option to specify the location of Poppler.");
    }
    const imagesOutput = execSync(`${pdfimagesPath} -list "${pdfPath}"`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString();
    const splitted = imagesOutput.split('\n');
    if (!splitted) {
      throw new Error('Could not read outpupt of pdfimage.')
    }

    const headerColumns = splitted[0].trim().split(/\s+/);
    const xDpiColumns = headerColumns.indexOf('x-ppi');
    const yDpiColumns = headerColumns.indexOf('y-ppi');
    if (!headerColumns || !xDpiColumns || !yDpiColumns) {
      throw new Error('Could not read header line of pdfimage.')
    }

    const lines = splitted.slice(2).filter(Boolean); // ヘッダ2行を除外

    lines.forEach(line => {
      const cols = line.trim().split(/\s+/);
      if (cols.length >= 11) {
        const [page, num, type, width, height, color, comp, bpc, enc, interp, object] = cols;
        const xPpi = parseInt(cols[xDpiColumns], 10); // pdfimagesの出力列順により異なる場合あり
        const yPpi = parseInt(cols[yDpiColumns], 10);
        const low = (xPpi < warningDpi || yPpi < warningDpi) ? "(Low ppi)" : "";
        if (!xPpi || !yPpi) {
          throw new Error('Could not read columns of pdfimage.')
        }
        console.log(`Page ${page}, Img ${num}: ${width} x ${height} px @ ${xPpi} x ${yPpi} ppi ${low}`);
      }
    });
    console.log(``);

    console.log(`Completed.`);
    console.log(``);
  }
  catch(err){
    throw err;
  }
}

// コマンドライン引数の解析
function parseArgs() {
  const args = process.argv.slice(2); // node test.js 以降の引数
  const parsed = {
    pdfPath: null,
    popplerPath: "",
    warningDpi: 300,
    onlyTopPage: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-h' || args[i] === '--help') {
      const thisFileName = path.basename(__filename);
      console.log('Usage: node ' + thisFileName +' <pdf file path> [arguments]');
      console.log('  <pdf file path>    specify the pdf file path.');
      console.log('  -p <poppler path>     specify the poppler folder.');
      console.log('  -w <number>     specify dpi for warning.');
      console.log('  -t              top page information only.');
      console.log('  -v, --version      print ' + thisFileName  + ' version.');
      console.log('  -h, --help         print command line options.');
      process.exit(0);
    }
    else if (args[i] === '-v' || args[i] === '--version') {
      console.log(scriptVersion);
      process.exit(0);
    }
    else if (args[i] === '-p' && i + 1 < args.length) {
      parsed.popplerPath = args[i + 1];
      i++;
    }
    else if (args[i].startsWith('-p ')) {
      parsed.popplerPath = args[i].slice('-p '.length);
    }
    else if (args[i] === '-w' && i + 1 < args.length) {
      parsed.warningDpi = parseInt(args[i + 1], 1);
      i++;
    }
    else if (args[i].startsWith('-w ')) {
      parsed.warningDpi = parseInt(args[i].slice('-w '.length), 10);
    }
    else if (args[i] === '-t') {
      parsed.onlyTopPage = true;
    }
    else if (!parsed.pdfPath) {
      parsed.pdfPath = args[i];
    }
  }

  if (!parsed.pdfPath) {
    console.error('Error: Input PDF file path is required.');
    process.exit(1);
  }

  if (!parsed.pdfPath) {
    parsed.pdfPath = path.join(
      path.dirname(parsed.htmlPath),
      path.basename(parsed.htmlPath, path.extname(parsed.htmlPath)) + '.pdf'
    );
  }

  parsed.pdfPath = path.resolve(parsed.pdfPath);
  console.log(`pdf file: ${parsed.pdfPath}`);
  console.log(`Poppler path: ${parsed.popplerPath}`);

  return parsed;
}

pdfInfo().catch(function (error) {
  console.error(error);
  process.exit(1);
});
