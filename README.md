
<center>
  <h1>Сервер для работы с API <a href="https://skinport.com/">Skinport</a></h1>
</center>

<h2>Начало работы</h2>

1. Сперва надо обявить переменные окуржения `(файл .env)`
```shell
# Сервер
SERVER_PORT='PORT' # Порт на котором будет запушен сервер

# Подключение к Redis
REDIS_PASSWORD='PASSWORD' # Пароль от бд 
REDIS_USER='USERNAME' # Имя пользователья
REDIS_USER_PASSWORD='USERPASSWORD' # Пароль пользователья
REDIS_HOST='HOST' # Хост (localhost)
REDIS_PORT='PORT' # Порт

# Подключение к PostgreSQL
POSTGRES_DB='DB NAME' # Называние бд
POSTGRES_PORT='PORT' # Порт
POSTGRES_HOST='HOST' # Хост (localhost)
POSTGRES_USER='USER NAME' # Имя пользователья
POSTGRES_PASSWORD='PASSWORD' # Пароль

# Skinport. Client id и Secret можно получить здесь: https://skinport.com/account
SKINPORT_CLIENT_ID='CLIENT ID' # Client id 
SKINPORT_CLIENT_SECRET='CLIENT SECRET' # secret
```


2. Запустить redis: `docker compose up -d`
3. Установить все npm пакеты и настроить зависимости: `npm install`
4. Собрать build: `npm run build`
5. Поднять сервер: `npm run start:prod`

** *Авторизация максимально простая и сделана для примера*

После поднятия сервера по адресу <a href="http://localhost:{port}/api/docs">http://localhost:{port}/api/docs</a> будет доступна описание api методов приложения

