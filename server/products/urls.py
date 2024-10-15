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
   
)

urlpatterns = [ 
    path("products/", ProductListCreateView.as_view(), name="product-list-view"),
    path("products/all", ProductListCreateAllView.as_view(), name="product-list-all-view"),
    path("product/create", ProductListCreateView.as_view(), name="product-create"),
    path("product/<int:pk>", ProductDetailView.as_view(), name="get-product"),
    # path("product_details/<int:pk>", ProductDetailView, name="productDetailxs"),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    # path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('order/create', OrderItemListCreateView.as_view(), name='order-item-list-create'),
    # path('order-items/<int:pk>/', OrderItemDetailView.as_view(), name='order-item-detail'), 
]
