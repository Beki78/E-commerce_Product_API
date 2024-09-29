from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer



@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializedProduct = ProductSerializer(products, many = True).data
    return Response(serializedProduct)

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
    serializedProduct = ProductSerializer(data = data)
    if serializedProduct.is_valid():
        serializedProduct.save()
        return Response(serializedProduct.data, status = status.HTTP_201_CREATED)
    return Response(serializedProduct.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getCategory(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        serializedCategory = CategorySerializer(category).data  
        return Response(serializedCategory, status=status.HTTP_200_OK)
    except Category.DoesNotExist:
        return Response({"error": "Category not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def createCategory(request):
    data = request.data
    serializedCategory = CategorySerializer(data = data)
    if serializedCategory.is_valid():
        serializedCategory.save()
        return Response(serializedCategory.data, status = status.HTTP_201_CREATED)
    return Response(serializedCategory.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getCategories(request):
    category = Category.objects.all()
    serializedCategory = CategorySerializer(category, many = True).data
    return Response(serializedCategory)


@api_view(['PUT', "DELETE"])
def productDetails(request, pk):
    try:
        product = Product.objects.get(pk = pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."},status = status.HTTP_400_NOT_FOUND)
    
    if request.method == "DELETE":
        product.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT":
        data = request.data
        serializedProduct = ProductSerializer(product, data= data)
        if serializedProduct.is_valid():
            serializedProduct.save()
            return Response(serializedProduct.data)
        return Response(serializedProduct.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', "DELETE"])
def categoryDetails(request, pk):
    try:
        category = Category.objects.get(pk = pk)
    except Category.DoesNotExist:
        return Response({"error": "Category not found."},status = status.HTTP_400_NOT_FOUND)
    
    if request.method == "DELETE":
        category.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT":
        data = request.data
        serializedCategory = CategorySerializer(category, data= data)
        if serializedCategory.is_valid():
            serializedCategory.save()
            return Response(serializedCategory.data)
        return Response(serializedCategory.errors, status = status.HTTP_400_BAD_REQUEST)