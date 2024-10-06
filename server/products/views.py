from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics
from django.contrib.auth import authenticate
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer, OrderItemSerializer
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 6  # Number of items per page
    page_size_query_param = 'page_size'  # Allow clients to set page size
    max_page_size = 100  # Limit the maximum page size

@api_view(['GET'])
def getProducts(request):
    search = request.query_params.get('search', None)
    category = request.query_params.get('category', None)  # Get category query parameter
    products = Product.objects.all()

    if search:
        products = products.filter(name__icontains=search)

    if category:
        products = products.filter(category=category)  # Filter by category

    paginator = ProductPagination()
    paginated_products = paginator.paginate_queryset(products, request)
    serializedProducts = ProductSerializer(paginated_products, many=True).data
    return paginator.get_paginated_response(serializedProducts)
# Get a single product by ID


@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        serializedProduct = ProductSerializer(product).data
        return Response(serializedProduct, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

# Create a new product


@api_view(['POST'])
def createProducts(request):
    data = request.data
    files = request.FILES
    data.update(files)
    print(files)
    if 'image' in files:
        data['image_url'] = files['image']
    serializedProduct = ProductSerializer(data=data)
    if serializedProduct.is_valid():
        serializedProduct.save()
        return Response(serializedProduct.data, status=status.HTTP_201_CREATED)
    return Response(serializedProduct.errors, status=status.HTTP_400_BAD_REQUEST)

# Filter products by category


from rest_framework import status

@api_view(['GET'])
def getProductsByCategory(request, category):
    products = Product.objects.filter(category=category)

    # Check if products exist
    if not products.exists():
        return Response({"error": "No products found for this category."}, status=status.HTTP_200_OK)

    serializedProduct = ProductSerializer(products, many=True)
    return Response(serializedProduct.data, status=status.HTTP_200_OK)



@api_view(['PUT', 'DELETE'])
def productDetails(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == "PUT":
        # Use request.FILES for file uploads
        data = request.data.copy()  # Make a copy of the data

        # Check if there is an image file to update
        if 'image' in request.FILES:
            # Assign the image to the data dict
            data['image_url'] = request.FILES['image']

        serializedProduct = ProductSerializer(product, data=data)
        if serializedProduct.is_valid():
            serializedProduct.save()
            return Response(serializedProduct.data)
        return Response(serializedProduct.errors, status=status.HTTP_400_BAD_REQUEST)





class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        # Custom creation logic if needed
        return super().create(request, *args, **kwargs)

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# OrderItem Views
class OrderItemListCreateView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        # Optionally filter order items by order ID
        order_id = self.request.query_params.get('order_id', None)
        if order_id:
            return self.queryset.filter(order_id=order_id)
        return self.queryset

class OrderItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer