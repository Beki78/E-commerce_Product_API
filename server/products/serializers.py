from rest_framework import serializers
from .models import Product, Order, OrderItem

# * ProductSerializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category',
                  'stock_quantity', 'image_url', 'created_at']

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.stock_quantity = validated_data.get('stock_quantity', instance.stock_quantity)
        instance.image_url = validated_data.get('image_url', instance.image_url)
        instance.category = validated_data.get('category', instance.category)
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category'] = instance.category
        return representation


# * OrderSerializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'  # Specify the fields you want to include

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
            # Update or create order items
            for item_data in order_items_data:
                item_id = item_data.get('id', None)
                if item_id:  # Update existing item
                    order_item = OrderItem.objects.get(id=item_id, order=instance)
                    order_item.quantity = item_data.get('quantity', order_item.quantity)
                    order_item.unit_price = item_data.get('unit_price', order_item.unit_price)
                    order_item.save()
                else:  # Create new item
                    OrderItem.objects.create(order=instance, **item_data)
        
        return instance


# * OrderItemSerializer
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'  # Specify the fields you want to include

    def create(self, validated_data):
        product = validated_data['product']
        quantity = validated_data['quantity']
        
        # Check if enough stock is available
        if product.stock_quantity < quantity:
            raise serializers.ValidationError("Not enough stock available for this product.")
        
        # Reduce stock quantity
        product.stock_quantity -= quantity
        product.save()
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        product = instance.product
        previous_quantity = instance.quantity
        new_quantity = validated_data.get('quantity', previous_quantity)
        
        # Adjust stock quantity based on the change
        if new_quantity != previous_quantity:
            if new_quantity > previous_quantity:  # Increasing quantity
                if product.stock_quantity < (new_quantity - previous_quantity):
                    raise serializers.ValidationError("Not enough stock available.")
                product.stock_quantity -= (new_quantity - previous_quantity)
            else:  # Decreasing quantity
                product.stock_quantity += (previous_quantity - new_quantity)

            product.save()
        
        return super().update(instance, validated_data)