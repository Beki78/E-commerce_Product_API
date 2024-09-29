from django.urls import path, include
from .views import getProducts, createProducts, createCategory, getCategory, categoryDetails, productDetails, getProduct, getCategories
urlpatterns = [
    path("products/", getProducts, name="getProducts"),
    path("products/create", createProducts, name="createProducts"),
    path("category/create", createCategory, name="createCategory"),
    path("categories/", getCategories, name="getCategories"),
    path("category_details/<int:pk>", categoryDetails, name="categoryDetails"),
    path("product_details/<int:pk>", productDetails, name="productDetails"),
    path("product/<int:pk>", getProduct, name="getProduct"),
    path("category/<int:pk>", getCategory, name="getCategory")
]
