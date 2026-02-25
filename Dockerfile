# Этап 1: Сборка (Builder)
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы манифестов для кеширования слоев с зависимостями
COPY package*.json ./

# Используем npm ci для чистой установки (быстрее и надежнее в CI)
RUN npm ci

# Копируем все файлы проекта (включая src, tsconfig.json, vite.config.ts)
COPY . .

# Собираем проект. Vite создаст папку /app/dist
RUN npm run build

# Этап 2: Запуск (Production)
FROM node:20-alpine

WORKDIR /app

# Копируем только собранные статические файлы из первого этапа
COPY --from=builder /app/dist ./dist

# Устанавливаем легкий сервер для раздачи статики
RUN npm install -g serve

# Настройка порта (Google Cloud Run обычно использует 8080 по умолчанию)
EXPOSE 8080

# Запускаем сервер. 
# Флаг -s (single-page application) важен для React, чтобы роутинг работал корректно.
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT:-8080}"]