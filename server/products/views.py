from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer, OrderItemSerializer
from rest_framework.pagination import PageNumberPagination
from django.core.exceptions import ValidationError



#* Product Views
class ProductPagination(PageNumberPagination):
    page_size = 6  
    page_size_query_param = 'page_size'  
    max_page_size = 100  

@api_view(['GET'])
def getProducts(request):
    search = request.query_params.get('search', None)
    category = request.query_params.get('category', None)
    products = Product.objects.all()

    #* Product filtering 
    if search:
        products = products.filter(name__icontains=search)

    if category:
        products = products.filter(category=category)

    paginator = ProductPagination()
    paginated_products = paginator.paginate_queryset(products, request)
    serializedProducts = ProductSerializer(paginated_products, many=True).data
    return paginator.get_paginated_response(serializedProducts)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        serializedProduct = ProductSerializer(product).data
        return Response(serializedProduct, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def createProducts(request):
    data = request.data
    files = request.FILES
    data.update(files)
    if 'image' in files:
        data['image_url'] = files['image']
    serializedProduct = ProductSerializer(data=data)
    if serializedProduct.is_valid():
        serializedProduct.save()
        return Response(serializedProduct.data, status=status.HTTP_201_CREATED)
    return Response(serializedProduct.errors, status=status.HTTP_400_BAD_REQUEST)


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
        data = request.data.copy()
        if 'image' in request.FILES:
            data['image_url'] = request.FILES['image']

        serializedProduct = ProductSerializer(product, data=data)
        if serializedProduct.is_valid():
            serializedProduct.save()
            return Response(serializedProduct.data)
        return Response(serializedProduct.errors, status=status.HTTP_400_BAD_REQUEST)



#* Order Views
class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            # Handle stock adjustment based on order item creation
            order_id = response.data['id']
            order_items = request.data.get('order_items', [])
            for item in order_items:
                try:
                    product = Product.objects.get(pk=item['product'])
                    product.stock_quantity -= item['quantity']
                    product.save()
                except Product.DoesNotExist:
                    return Response({"error": f"Product with ID {item['product']} does not exist."}, status=status.HTTP_400_BAD_REQUEST)
                except ValidationError as e:
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return response

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.status == 'cancelled':
            # If status is cancelled, revert stock quantities for order items
            for item in instance.order_items.all():
                item.product.stock_quantity += item.quantity
                item.product.save()

class OrderItemListCreateView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            #* Reduce stock quantity when an order item is created
            order_item = self.get_object()
            product = order_item.product
            product.stock_quantity -= order_item.quantity
            product.save()
        return response

class OrderItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def perform_destroy(self, instance):
        #* Revert stock quantity when an order item is deleted
        product = instance.product
        product.stock_quantity += instance.quantity
        product.save()
        super().perform_destroy(instance)