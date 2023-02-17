const fs = require('fs');
const writeToFile = function(file, msg){
  if(file && msg){//Если указан путь к файлу и сообщение, которое нужно записать в этот файл
    fs.writeFileSync(`${file}`, msg , function(err) {
      if(err) {
        console.log('\n\n-----------Error in writeToFile function-----------\n');
        console.log(err);
      }
    }); 
  }else{
    console.log(`>>>Error in writeToFile.js
      Не указан путь к файлу или записываемое в него значение.`);
  }
}

module.exports = writeToFile;