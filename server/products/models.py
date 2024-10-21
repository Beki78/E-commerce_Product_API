from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError




# * Product Schema
class Product(models.Model):
    class CategoryChoices(models.TextChoices):
        FOOD = 'FD', 'Food'
        ELECTRONICS = 'EL', 'Electronics'
        CLOTHING = 'CL', 'Clothing'
        FURNITURE = 'FN', 'Furniture'
        HOME = 'HM', 'Home'
        VEHICLE = 'VH', 'Vehicle'
        HOME_ACCESSORIES = 'HA', 'Home Accessories'

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    image_url = models.ImageField(upload_to='images/', blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    category = models.CharField(
        max_length=2,
        choices=CategoryChoices.choices,
        default=CategoryChoices.FOOD
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



# * Order Schema
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled')
    ]
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Order {self.id} - {self.status}'




# * Order Items Schema
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="order_items")

    def __str__(self):
        return f'{self.quantity} of {self.product.name} in Order {self.order.id}'

    def save(self, *args, **kwargs):
        if self.order.status == 'pending':
            self.product.stock_quantity -= self.quantity
            if self.product.stock_quantity < 0:
                raise ValidationError("Not enough stock available.")
        elif self.order.status == 'cancelled':
            self.product.stock_quantity += self.quantity
            
        self.product.save()
        super().save(*args, **kwargs)