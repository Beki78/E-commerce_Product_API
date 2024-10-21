from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Order, OrderItem



#*  User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password']) 
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        
        instance.save()
        return instance



#*  Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock_quantity', 'image_url', 'author', 'category', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']

    def validate_stock_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Stock quantity cannot be negative.")
        return value




# * OrderSerializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'  

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items', [])
        order = Order.objects.create(**validated_data)
        for item_data in order_items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    def update(self, instance, validated_data):
        order_items_data = validated_data.pop('order_items', None)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        if order_items_data is not None:
            for item_data in order_items_data:
                item_id = item_data.get('id', None)
                if item_id:  
                    order_item = OrderItem.objects.get(id=item_id, order=instance)
                    order_item.quantity = item_data.get('quantity', order_item.quantity)
                    order_item.unit_price = item_data.get('unit_price', order_item.unit_price)
                    order_item.save()
                else:  
                    OrderItem.objects.create(order=instance, **item_data)
        
        return instance




# * OrderItemSerializer
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__' 

    def create(self, validated_data):
        product = validated_data['product']
        quantity = validated_data['quantity']
        
        if product.stock_quantity < quantity:
            raise serializers.ValidationError("Not enough stock available for this product.")
        
        product.stock_quantity -= quantity
        product.save()
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        product = instance.product
        previous_quantity = instance.quantity
        new_quantity = validated_data.get('quantity', previous_quantity)
        
        if new_quantity != previous_quantity:
            if new_quantity > previous_quantity: 
                if product.stock_quantity < (new_quantity - previous_quantity):
                    raise serializers.ValidationError("Not enough stock available.")
                product.stock_quantity -= (new_quantity - previous_quantity)
            else:  
                product.stock_quantity += (previous_quantity - new_quantity)

            product.save()
        
        return super().update(instance, validated_data)