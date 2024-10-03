from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics
from django.contrib.auth import authenticate
from .models import Product, User
from .serializers import ProductSerializer, UserRegistrationSerializer, UserLoginSerializer
from rest_framework.permissions import AllowAny

# Get all products


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializedProduct = ProductSerializer(products, many=True).data
    return Response(serializedProduct)

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


# @api_view(['GET'])
# def getProductsByCategory(request, category):
#     # Check if the category is one of "VH", "FD", or "CL"
#     if category in ["VH", "FD", "CL", "EL", "FN", "HM", "HA"]:
#         products = Product.objects.filter(category=category)

#         # If no products exist, return a success response with a message
#         if not products.exists():
#             return Response({"message": "No products found for this category."}, status=status.HTTP_200_OK)

#         # If products are found, serialize and return them
#         serializedProduct = ProductSerializer(products, many=True)
#         return Response(serializedProduct.data, status=status.HTTP_200_OK)

#     # If the category is not one of "VH", "FD", or "CL", return a 404 error
#     return Response({"error": "Invalid category."}, status=status.HTTP_404_NOT_FOUND)



# Update or delete a product by ID


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


# User registration view


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

# User login view


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(request, email=email, password=password)

        if user is not None:
            return Response({'message': 'Login successful', 'user_id': user.id}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
