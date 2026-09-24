# 🚀 Product Developer Portfolio

> Персональный сайт-портфолио Product Developer'а с демонстрацией production-проектов, интерактивным переключением языков (RU / EN), SEO-пререндерингом и трекингом посещений.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESNext-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?style=flat-square&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](#)

---

## 🌟 Ключевые возможности

- 🌐 **Двуязычный интерфейс (RU / EN)** — быстрое переключение без перезагрузки страницы с сохранением выбранного языка.
- 📱 **Адаптивный дизайн (Mobile-First)** — оптимизирован для любых устройств: смартфоны, планшеты и десктоп.
- ⚡ **Высокая скорость (Vite 6)** — мгновенный HMR при разработке и оптимизированный бандл для production.
- 🔍 **SEO & Prerender** — генерация статического HTML через Puppeteer (`scripts/prerender.mjs`) для идеальной индексации поисковыми системами и соцсетями (OpenGraph, Schema.org).
- 📊 **Встроенная аналитика и трекинг** — фиксация переходов, кликов по проектам и просмотров.
- 🔒 **Админ-интерфейс** — просмотр статистики визитов и активности.

---

## 🛠️ Стек технологий

- **Frontend:** React 18, Vite 6, CSS Modules, Vanilla JS i18n
- **SSG / SEO:** Node.js, Puppeteer (Pre-rendering)
- **Backend / Analytics:** Node.js / Express API, MySQL / PostgreSQL
- **Deploy & Hosting:** Linux (Debian/Ubuntu), Nginx (SSL / Let's Encrypt), Systemd

---

## 📂 Структура проекта

```text
portfolio/
├── admin/               # Шаблон админ-панели и фавикон
├── public/              # Статические ассеты, скриншоты проектов, robots.txt, sitemap.xml
│   └── screenshots/     # Мокапы и превью проектов (десктоп / мобайл)
├── scripts/
│   └── prerender.mjs    # Puppeteer-скрипт пререндеринга для SEO
├── src/
│   ├── assets/          # Иконки, графика и ассеты
│   ├── components/      # React-компоненты (Hero, About, Projects, Skills, Contact, Navbar, Footer)
│   ├── i18n.js          # Тексты и локализации (RU / EN)
│   ├── tracker.js       # Клиентский сборщик метрик и событий
│   ├── App.jsx          # Главный компонент приложения
│   └── main.jsx         # Точка входа React
├── index.html           # Базовый HTML шаблон
├── vite.config.js       # Конфигурация Vite
└── package.json         # Зависимости и скрипты сборки
```

---

## 🚀 Установка и запуск

### 1. Клонирование репозитория:
```bash
git clone git@github.com:alv1k/portfolio.git
cd portfolio
```

### 2. Установка зависимостей:
```bash
npm install
```

### 3. Режим разработки (Dev):
```bash
npm run dev
```
Сайт откроется по адресу `http://localhost:5173`.

### 4. Production-сборка:
```bash
npm run build
```
Команда собирает оптимизированный бандл в папку `dist/` и запускает Puppeteer пререндеринг страниц.

### 5. Предпросмотр production-сборки:
```bash
npm run preview
```

---

## 💼 Проекты в портфолио

1. **TIIN VPN Service** — полнофункциональный VPN-сервис следующего поколения (VLESS Reality, Hysteria 2, AmneziaWG, MTProto, сплит-туннелинг, реферальная программа, биллинг ЮKassa).
2. **Finance API** — персональный мультипользовательский финансовый трекер (Node.js, PostgreSQL, OCR чеков через Gemini AI, графики и аналитика).
3. **Якутскэнерго Бот** — Telegram-бот уведомлений об отключениях электроэнергии по адресам с панелью управления на Streamlit.
4. **Toplivo Yakutsk** — мониторинг цен и наличия топлива на АЗС Якутии (парсинг 5 сетей, интерактивная Leaflet-карта, краудсорсинг).
5. **Hermes AI Assistant** — персональный мультимодальный AI-ассистент с долговременной памятью, интеграцией с 20+ сервисами и кастомными навыками.

---

## 👤 Автор

**Алена Алексеева**
- **Роль:** Product Developer
- **Сайт:** [portfolio.tiinservice.online](https://portfolio.tiinservice.online)
