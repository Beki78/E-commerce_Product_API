
# E-Commerce API

This project is an eCommerce application designed to provide users with a seamless shopping experience. It features a user-friendly interface, product browsing, and secure checkout processes. Built using modern technologies, the application aims to deliver high performance and scalability while ensuring an intuitive user experience.


## Features

- CRUD operation
- Authentication
- Pagination
- Image upload





## Run Locally

Clone the project

```bash
  git clone -b optimized https://github.com/Beki78/E-commerce_Product_API.git
```

Go to the project directory

```bash
  cd cd E-commerce_Product_API
```

Install dependencies

```bash
  cd client
  npm install
  npm run dev
```

Start the server

```bash
  cd server
  python -m venv venv
  venv\Scripts\activate # Activate the virtual environment on Windows
  source venv/bin/activate  # Activate the virtual environment on Linux or macOS
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py runserver
```


## Tech Stack

**Client:** React Typescript, Tailwind CSS, Redux-Toolkit, Redux-Saga

**Server:** Sqlite, Django

**Deployment:** FrontEnd - Netlify, BackEnd - PythonAnywhere



