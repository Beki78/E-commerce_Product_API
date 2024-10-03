from django.urls import path
from .views import (
    getProducts,
    createProducts,
    productDetails,
    getProduct,
    UserRegistrationView,
    UserLoginView
)

urlpatterns = [
    path("products/", getProducts, name="getProducts"),
    path("products/create", createProducts, name="createProducts"),
    path("product_details/<int:pk>", productDetails, name="productDetails"),
    path("product/<int:pk>", getProduct, name="getProduct"),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
]
