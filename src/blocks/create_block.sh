#!/bin/sh
#наполняем переменную пробелом, но похоже это не работает, если после TAB нет слов
TAB='  '
lcb='${'
rcb='}'
dollar='$'
#запоминаем имя блока, элемента или модификатора /p - означает pause аверное
read -p "What would you create : " fileName
mkdir -p ${fileName}
styleSCSS=${fileName}.scss
PUG=${fileName}.pug
# Создаём новый файл.scss и тут же наполняем его нужным содержимым
cd ${fileName}
cat > ${styleSCSS} << end 
.${fileName} {
${TAB}padding: 0;  
}
end
# создаём pug
cat > ${PUG} << end 
mixin ${fileName}(modifier)
${TAB}.${fileName}&attributes(attributes)
end
# Ну и создаём js файлик
cat >${fileName}.js << end
end
#
#
# Создаём новый bat файл для элементов или модификаторов
cat > create_elemeficator.sh << end
#!/bin/sh
parentName=${fileName}
read -p "What would you create : " fileName
mkdir ${lcb}fileName${rcb}
isThereNeedPugFile=1
zero=0
TAB='  '
# если нужен pug file то условный оператор всё обработает
read -p "Do you need pug file? (1/0) : " isThereNeedPugFile
if [ "${dollar}isThereNeedPugFile" -gt "${dollar}zero" ]; then 
# подключаем инклуды в начало pug файла у нашего блока, для этого создаём новый файл в него записываем инклуд, затем добавляем содержимое нашего PUG файла и затем копируем содержимое нового файла в PUG с замещением а новый файл удаляем к чертям собачьим
cat > newFile.pug << end1
include ${lcb}fileName${rcb}/${dollar}{parentName}${lcb}fileName${rcb}.pug
end1
cat ${PUG} >> newFile.pug
mv -f newFile.pug  ${PUG}
cat > ${lcb}fileName${rcb}/${lcb}parentName${rcb}${lcb}fileName${rcb}.pug << end2
mixin ${lcb}parentName${rcb}${lcb}fileName${rcb}(modifier)
${dollar}{TAB}.${lcb}parentName${rcb}${lcb}fileName${rcb}&attributes(attributes)
end2
fi
# модернизируем scss файл родителя и создаём scss файл для элемента/модификатора
cat >> ${styleSCSS} << end3
@import '${dollar}{fileName}/${dollar}{parentName}${dollar}{fileName}';
end3
cd ${dollar}{fileName}
cat >> ${dollar}{parentName}${dollar}{fileName}.scss << end4
.${dollar}{parentName}${dollar}{fileName} {padding: 0}
end4
end
# Создаём новый bat файл для элементов или модификаторов
cat > create_elemeficator.bat << endbat
set parentName=${fileName}
set /p fileName=What would you create?
mkdir %fileName%
rem Создаём пятёрку балванок, первая будет указывать был ли в цепи блок элемент модификатор создан элемент, а вторая будет содержать символ с которым будут сравнивать,
rem ну а третья будет содержать интерисующий нас символ в имени елементофикатора из fileName ,будет скопированная строка начиная со второго символа, т.к. счёт симоволов начинается с 0, а у тебя указанно 1 и длинной в 1 символ
rem и ещё для сравнения создадим переменную True которая будет содержать строку true, дело в том, что cmd повзваляет сравнивать только пременные, и у него нет булевых, поэтому приходится извращяться
set isThereElement=false
set ans=_
set zero=0
set secondSymbol=%fileName:~1,1%
set True=true
rem /I означает что не будет сравниваться по регистру
rem если второй символ fileName является нижним подчёркиванием, значит создаётся элеменет
rem Похоже если я создаю условие внутри условия то оно начинает работать некорректно, точнее незапуститься, поэтому приходиться разбивать условия
set isThereNeedPugFile=0
if /I %secondSymbol% == %ans% (
  set isThereElement=true
  set /p isThereNeedPugFile=Do you need a pug file one or zero
)
rem если нужен pug file то условный оператор всё обработает
rem NEQ - значит неравное, просто тут нет оператора != поэтому приходится использовать это
if /I %isThereNeedPugFile% NEQ %zero% (
  rem подключаем инклуды в начало pug файла у нашего блока, для этого создаём новый файл в него записываем инклуд, затем добавляем содержимое нашего PUG файла и затем копируем содержимое нового файла в PUG с замещением а новый файл удаляем к чертям собачьим
  (
  echo include %filename%/${fileName}%filename%.pug
  )> newFile.pug
  type ${PUG} >> newFile.pug
  move /Y newFile.pug  ${PUG}
  (
  echo mixin %parentName%%fileName%^(modifier^)
  echo ${TAB}.%parentName%%fileName%^&attributes^(attributes^)
  )>%fileName%/%parentName%%fileName%.pug
)
(
echo @import '%fileName%/${fileName}%fileName%';
)>>${styleSCSS}
cd %fileName
(
echo .%parentName%%fileName% {}
)>%parentName%%fileName%.scss
if  /I %isThereElement% == %True% (
  (
  echo @echo off
  echo set grandParentName=${fileName}
  echo set parentName=%fileName%
  echo set /p fileName=What would you create?
  echo set newStyleSCSS=${fileName}%fileName%.scss
  echo mkdir %%fileName%%
  echo ^(
  echo echo @import '%%fileName%%/${fileName}%fileName%%%fileName%%';
  echo ^)^>^>%%newStyleSCSS%%
  echo cd %%fileName%%
  echo ^(
  echo echo .%%grandParentName%%%%parentName%%%%fileName%% {}
  echo ^)^>%%grandParentName%%%%parentName%%%%fileName%%.scss
  )>>create_modificator.bat
)
endbat
# Записываем только что созданный scss файл блока в список всех стилей 
cd ../../styles
cat >>allBlocksStyles.scss << end
@import '../blocks/${fileName}/${fileName}';
end