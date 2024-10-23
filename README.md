
# E-Commerce API

This project is an eCommerce application designed to provide users with a seamless shopping experience. It features a user-friendly interface, product browsing, and secure checkout processes. Built using modern technologies, the application aims to deliver high performance and scalability while ensuring an intuitive user experience.


## Features

- CRUD operation
- Authentication
- Pagination
- Image upload




## API Endpoints

This API provides various endpoints for user registration, token management, product management, and order handling. Below is a list of available endpoints:

### User Management

- **Register User**
  - **Endpoint**: `POST /api/user/register/`
  - **Description**: Create a new user.

- **Obtain Token**
  - **Endpoint**: `POST /api/token/`
  - **Description**: Obtain a JWT token for a user.

- **Refresh Token**
  - **Endpoint**: `POST /api/token/refresh/`
  - **Description**: Refresh a JWT token.

### Product Management

- **Product List & Create**
  - **Endpoint**: `GET /products/` (List), `POST /product/create`
  - **Description**: Retrieve a list of products or create a new product.

- **Get All Products**
  - **Endpoint**: `GET /products/all`
  - **Description**: Retrieve a list of all products.

- **Get Product by ID**
  - **Endpoint**: `GET /product/<int:pk>/`
  - **Description**: Retrieve details of a specific product by its ID.

- **Search Products**
  - **Endpoint**: `GET /products/search/`
  - **Description**: Search for products based on query parameters.

### Order Management

- **Order List & Create**
  - **Endpoint**: `GET /orders/` (List), `POST /order/create`
  - **Description**: Retrieve a list of orders or create a new order.

- **Order Item List & Create**
  - **Endpoint**: `POST /order/create`
  - **Description**: Create a new order item.

### Authentication

- **API Authentication**
  - **Endpoint**: `GET /api-auth/`
  - **Description**: Obtain authentication for the API.

### Admin

- **Admin Panel**
  - **Endpoint**: `GET /admin/`
  - **Description**: Access the Django admin panel.





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



