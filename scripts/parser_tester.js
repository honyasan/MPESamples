const fs = require('fs');
const path = require('path');
const console = require('console');

const mpeParser = require('./parser_debug.js');

fileSet = [
  {
    inputFilePath: 'mpe_willParse.md',
    outputFilePath: 'output.md',
    testFilePath: 'mpe_willParse_true.md',
    callFunc: mpeParser.mpee_onWillParseMarkdown
  },
  {
    inputFilePath: 'mpe_didParse.html',
    outputFilePath: 'output.html',
    testFilePath: 'mpe_didParse_true.html',
    callFunc: mpeParser.mpee_onDidParseMarkdown
  }
]

async function testProcess(){
  const dataDirectory = './test';
  const fileSetIndex = 1;
  const inputFile = path.resolve(dataDirectory, fileSet[fileSetIndex].inputFilePath);
  const outputFile = path.resolve(dataDirectory, fileSet[fileSetIndex].outputFilePath);
  const testFile = path.resolve(dataDirectory, fileSet[fileSetIndex].testFilePath);
  const callFunc = fileSet[fileSetIndex].callFunc;

  const source = fs.readFileSync(inputFile, 'utf8');
  let startTime = new Date();
  const result = await callFunc(source);
  let endTime = new Date();
  var diffTime = endTime.getTime() - startTime.getTime();
  console.log(`経過時間 ${diffTime} msec`);
  fs.writeFileSync(outputFile, result);

  if (source === result) {
    throw new Error('Bad Processing - result is same as input html.');
  }
  if (!result) {
    throw new Error('Bad Processing. - returned null.')
  }

  const testSource = fs.readFileSync(testFile, 'utf8');
  if (result !== testSource) {
    throw new Error('There was a difference with the correct answer. What is the new correct answer?');
  }
}

testProcess().catch(function(error){
  console.error(error);
  process.exit(1);
});
