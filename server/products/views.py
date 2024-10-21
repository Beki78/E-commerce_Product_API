from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product, Order, OrderItem
from .serializers import UserSerializer, ProductSerializer, OrderSerializer, OrderItemSerializer
from rest_framework.pagination import PageNumberPagination


#* Pagination
class ProductPagination(PageNumberPagination):
    page_size = 6  
    page_size_query_param = 'page_size'  
    max_page_size = 100  
    
   
#*  All CRUD operation for product & auth is required
class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]  
    pagination_class = ProductPagination 

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(author = user)  

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors) 
            return serializer.error



#*  Read operation for product & auth is not required
class ProductListCreateAllView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination 

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)

        if category is not None:
            queryset = queryset.filter(category=category)

        return queryset




#*  Search and filter products by name and category & auth is not required
class ProductSearchView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]  

    def get_queryset(self):
        queryset = Product.objects.all()
        name = self.request.query_params.get('name', None)
        category = self.request.query_params.get('category', None)

        if name:
            queryset = queryset.filter(name__icontains=name)  
        if category:
            queryset = queryset.filter(category=category)  
        return queryset




#*  Read operation for a single product & auth is required
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]




#*  Read and Create operation for a order & auth is required
class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(author=self.request.user)  

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  



#*  Read, Create and Delete operation for a order & auth is required
class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]




#*  Read, Create operation for a order item & auth is required
class OrderItemListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(order__author=self.request.user)  
    def perform_create(self, serializer):
        serializer.save(author=self.request.user) 



#*  Read, Create and Delete operation for a order item & auth is required
class OrderItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]



#*   Create operation for a user & auth is not required
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    