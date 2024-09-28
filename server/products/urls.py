from django.urls import path, include
from .views import getProducts, createProducts, createCategory, getCategory
urlpatterns = [
    path("products/", getProducts, name="getProducts"),
    path("products/create", createProducts, name="createProducts"),
    path("category/create", createCategory, name="createCategory"),
    path("category/", getCategory, name="getCategory")
]
