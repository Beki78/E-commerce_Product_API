from django.urls import path
from .views import (
    getProducts,
    createProducts,
    productDetails,
    getProduct,
    getProductsByCategory, 
    OrderListCreateView,
    OrderDetailView,
    OrderItemListCreateView,
    OrderItemDetailView
)

urlpatterns = [ 
    path("products/", getProducts, name="getProducts"),
    path("products/create", createProducts, name="createProducts"),
    path("product_details/<int:pk>", productDetails, name="productDetails"),
    path("product/<int:pk>", getProduct, name="getProduct"),
    path("products/category/<str:category>/", getProductsByCategory, name="getProductsByCategory"),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('order-items/', OrderItemListCreateView.as_view(), name='order-item-list-create'),
    path('order-items/<int:pk>/', OrderItemDetailView.as_view(), name='order-item-detail'),
    
]
