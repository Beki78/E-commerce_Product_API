from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


# Create your views here.
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializedProduct = ProductSerializer(products, many = True).data
    return Response(serializedProduct)

@api_view(['POST'])
def createProducts(request):
    data = request.data
    serializedProduct = ProductSerializer(data = data)
    if serializedProduct.is_valid():
        serializedProduct.save()
        return Response(serializedProduct.data, status = status.HTTP_201_CREATED)
    return Response(serializedProduct.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def createCategory(request):
    data = request.data
    serializedCategory = CategorySerializer(data = data)
    if serializedCategory.is_valid():
        serializedCategory.save()
        return Response(serializedCategory.data, status = status.HTTP_201_CREATED)
    return Response(serializedCategory.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getCategory(request):
    category = Category.objects.all()
    serializedCategory = CategorySerializer(category, many = True).data
    return Response(serializedCategory)
