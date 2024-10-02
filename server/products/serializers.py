from .models import Product, Category
from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, Review, User
from django.contrib.auth import get_user_model
User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class ProductSerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField to allow category to be set by ID
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all())

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category',
                  'stock_quantity', 'image_url', 'created_at']

    def create(self, validated_data):
        # Create a new Product instance
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Update the instance with the provided data
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.stock_quantity = validated_data.get(
            'stock_quantity', instance.stock_quantity)
        instance.image_url = validated_data.get(
            'image_url', instance.image_url)

        # Update category
        instance.category = validated_data.get('category', instance.category)
        instance.save()
        return instance

    def to_representation(self, instance):
        # Customize the representation of the Product to include category details
        representation = super().to_representation(instance)
        # Add full category details using the CategorySerializer
        representation['category'] = CategorySerializer(instance.category).data
        return representation



class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # or use UserSerializer if you want more details

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
        fields = ['id', 'user', 'status', 'total_price', 'created_at', 'updated_at', 'order_items']


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