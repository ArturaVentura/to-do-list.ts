Readme Backend

нужно написать в терминале и установить зависимости командой npm i

// инструкция если с начинаем с 0
зайти в BD psql командой psql -U postgres

указать пароль

//CREATE DATABASE <Название базы> OWNER <Кто создатель PS: postgres или другой пользователь> ОБЯЗАТЕЛЬНО СТАВИМ ;
CREATE DATABASE ARTURDATABASE OWNER ARTUR;

\l список баз
// \c <название базы>
\c todo

в проекте backend пишем

1. npm init -y
2. создаем файл gitignore
3. создаем файл app.js
4. создаем файл .env и .env.example
5. создаем файл .sequelizerc и добавление туда настройки

const path = require("path");

module.exports = {
config: path.resolve("db", "config.js"),
"models-path": path.resolve("db", "models"),
"seeders-path": path.resolve("db", "seeders"),
"migrations-path": path.resolve("db", "migrations"),
};

6. устанавливаем замисимости
   npm i axios cors dotenv express pg pg-hstore sequelize
   и только для разработки устнавливаем через npm i -D sequelize-cli

7. устанавливаем папку db с её функцилналом через команду
   npx sequelize-cli init

8. затем переходим в файл ./db/config.json изменяем его и в других местах на config.js в этом файле описываем примерно такую структуру

require("dotenv").config();

module.exports = {
development: {
username: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME,
host: "127.0.0.1",
dialect: "postgres",
//не обязательные парамтеры
seederStorage: "sequelize",
seederStorageTableName: "SequelizeData",
},
};

9. добавлем командой в базу данных таблицу

//npx sequelize-cli model:generate --name <Название Таблицы (с большой буквы)> --attributes <название колонки: её тип строка или другое, название колонки: её тип строка или другое>;
npx sequelize-cli model:generate --name User --attributes username:string,hashpass:text;

10*****. если у нас есть связи других таблиц тогда используем команду чтобы накатить миграцию при этом кейс со связями мы не обработали поэтому будет сложно установить связи
npx sequelize-cli db:migrate

для отката миграции npx sequelize-cli  db:migrate:undo:all

---------------------------------------------------------
НИЖЕ ПРИЛОЖЕНА МОЯ ИНСТРУКЦИЯ КОТОРАЯ МОЖЕТ ПОНАДОБИТЬСЯ


                                           
SELECT * FROM "Users"; 
Миграция моделей

  
npx sequelize-cli  db:migrate:undo:all

миграция сидов
npx sequelize-cli db:seed:undo:all      
npx sequelize-cli db:seed:all
                                               ВХОД В POSTGRES
1. sudo -i -u postgres
1.1 psql
___________________________________________________________________________
npx sequelize-cli model:generate --name User --attributes username:strin
g,hashpass:text 
___________________________________________________________________________

npx sequelize-cli model:generate --name Post --attributes title:text,body:text,img:text,user_id:integer 
___________________________________________________________________________

npm i express sequelize pg pg-hstore hbs dotenv
                                                НАЧАЛО РАБОТЫ
1. npm init -y | инициализируем проект node
___________________________________________________________________________
2. npx create-gitignore node установка gitignore
 ___________________________________________________________________________
3.npx eslint --init   |--> 3 | 2 | 3 | No | Node | Use+Enter | ArnbNb | JS | YES | NPM
___________________________________________________________________________4.touch .sequelizerc | создание файла sequelizerc
___________________________________________________________________________

4.1 Ниже необходимо добавить в ---> .sequelizerc 

const path = require('path');
 module.exports = {
 'config': path.resolve('db', 'config.json'),
 'models-path': path.resolve('db', 'models'),
 'seeders-path': path.resolve('db', 'seeders'),
 'migrations-path': path.resolve('db', 'migrations')
 };
___________________________________________________________________________
5.npm i sequelize pg pg-hstore | устанавливаем зависимости postgres
___________________________________________________________________________
6.npm i -D sequelize-cli | устанавливаем sequelize cli
___________________________________________________________________________
7.npx sequelize-cli init | создаём структуру для работы с sequelize
___________________________________________________________________________
7.1 В файле config.json измените данные для db (username, password в '', database, dialect --> "postgres") на свои. Обратите внимание, что мы ввели разные данные для development и test
___________________________________________________________________________
7.2 Добавить в db\seeders\config.json 

"development": {
    "username": "yaroslav",
    "password": "123",
    "database": "commit_base",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize",
    "seederStorageTableName": "SequelizeData"
___________________________________________________________________________

                                             СОЗДАНИЕ БАЗЫ ДАННЫХ
2. CREATE DATABASE commit_base OWNER superuser; | 
___________________________________________________________________________
3. \c commit_base yaroslav; | вход в базу
___________________________________________________________________________
не должно быть пробелов после attributes
                                                    СОЗДАНИЕ ТАБЛИЦЫ

4.1 npx sequelize-cli model:generate --name User --attributes nickname:string

___________________________________________________________________________

4.5 Добавлять в каждый файл в db\migration\path 

1.Находим
      id_post: {
        type: Sequelize.INTEGER,
        },
2.Добавляем данные
     id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        onDelite: 'cascade',
      },
___________________________________________________________________________
                                           СВЯЗЬ ВСЕХ ТАБЛИЦ
5. npx sequelize-cli db:migrate | --> Накатить миграцию
___________________________________________________________________________
                                              СОЗДАНИЕ  SEEDERS
npx sequelize-cli seed:generate --name Album
npx sequelize-cli db:seed:undo:all   откат сидоров
npx sequelize-cli db:seed:all   накат сидоров
___________________________________________________________________________l
Добавить в SEEDERS Приме
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('lables', [{
      id_lable: 1,
      name: 'John1',
      createdAT: new Date(),
      updatedAt: new Date(),
    },
    {
      id_lable: 2,
      name: 'Alex2',
      createdAT: new Date(),
      updatedAt: new Date(),
    },
    {
      id_lable: 3,
      name: 'Evgenii3',
      createdAT: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lables', null, {});
  },
};
___________________________________________________________________________
                                                   Очистка таблицы
6. DELETE FROM "название_таблицы"