from rest_framework import serializers
from .models import Product, Order, OrderItem, Review, User
from django.contrib.auth import get_user_model

User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category',
                  'stock_quantity', 'image_url', 'created_at']

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.stock_quantity = validated_data.get(
            'stock_quantity', instance.stock_quantity)
        instance.image_url = validated_data.get(
            'image_url', instance.image_url)
        instance.category = validated_data.get('category', instance.category)
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # If you want to include category name as string representation, do so here
        representation['category'] = instance.category
        return representation


class ReviewSerializer(serializers.ModelSerializer):
    # or use UserSerializer if you want more details
    user = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = ['id', 'user', 'product', 'rating', 'comment', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'quantity', 'unit_price']


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'total_price',
                  'created_at', 'updated_at', 'order_items']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
