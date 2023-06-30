## Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)

## About <a name = "about"></a>

All-Tasks is a full stack web app used for managing tasks. It allows users to perform database CRUD operations on tasks.

## Getting Started <a name = "getting_started"></a>

### Prerequisites

Make sure you have php and composer on your machine for the backend and npm and node.js for the frontend.

```
php -v
```

```
composer --version
```

```
node --version
```

```
npm --version
```

### Installing

#### Clone the app

```
git clone https://github.com/rawda-yasser/All-tasks
cd All-tasks
```

#### Install dependencies

1. Backend

```
composer install
```

---

2. Frontend

```
cd fronend
npm i
```

#### Run the app

1. Backend

```
php artisan serve
```

Please visit `http://localhost:8000/`

---

2. Frontend

```
cd frontend
npm run dev
```

Please visit `http://localhost:5173/`
