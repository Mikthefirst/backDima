# Базовый образ
FROM node:20-alpine

# Создание директории приложения
WORKDIR /usr/src/app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка приложения (если используется TypeScript)
RUN npm run start:dev

# Порт, который будет использовать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]