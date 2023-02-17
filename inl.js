const readFromFile = require('./toInlineUtils/readFromFile.js')
const writeToFile  = require('./toInlineUtils/writeToFile.js')
const deleteFile   = require('./toInlineUtils/deleteFile.js')
const pages        = require('./webpack/pages.js')

pages.forEach(page=>{
  cssContent  = readFromFile(`./dist/${page}.css`);
  htmlContent = readFromFile(`./dist/${page}.html`);
  const beginingIndex = htmlContent.indexOf('<script defer="defer"');
  const endingIndex = htmlContent.indexOf('</head>');
  const newHtmlContent = htmlContent.slice(0, beginingIndex) 
                         + '<style>' 
                         + cssContent 
                         + '</style>' 
                         + htmlContent.slice(endingIndex);
  deleteFile(`./dist/${page}.css`)
  deleteFile(`./dist/${page}.js`)
  deleteFile(`./dist/${page}.html`)
  writeToFile(`./dist/${page}.html`,newHtmlContent)
})

console.log(`инлайнирование завершено мазафака`);