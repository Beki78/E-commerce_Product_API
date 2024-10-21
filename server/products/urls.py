from django.urls import path
from .views import (
   ProductListCreateView,
   ProductListCreateAllView,
   ProductDetailView,
   OrderListCreateView,
   OrderDetailView,
   OrderItemListCreateView,
   OrderItemDetailView,
   CreateUserView,
   ProductSearchView
)

urlpatterns = [ 
    path("products/", ProductListCreateView.as_view(), name="product-list-view"),
    path("products/all", ProductListCreateAllView.as_view(), name="product-list-all-view"),
    path("product/create", ProductListCreateView.as_view(), name="product-create"),
    path("product/<int:pk>", ProductDetailView.as_view(), name="get-product"),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('order/create', OrderItemListCreateView.as_view(), name='order-item-list-create'),
    path('products/search/', ProductSearchView.as_view(), name='product-search'),
]
