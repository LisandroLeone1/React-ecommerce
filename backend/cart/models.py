from django.db import models
from django.contrib.auth.models import User
from products.models import Producto, Color

class Carrito(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)

class ItemCarrito(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    talle = models.CharField(max_length=10, blank=True, null=True) 
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        unique_together = ('carrito', 'producto', 'talle', 'color')