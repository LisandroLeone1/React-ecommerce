from django.db import models
from django.contrib.auth.models import User
from products.models import Producto, Color, Talle

class Carrito(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Carro de {self.user.username}"

class ItemCarrito(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    talle = models.ForeignKey(Talle, on_delete=models.SET_NULL, null=True, blank=True) 
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        unique_together = ('carrito', 'producto', 'talle', 'color')

    def __str__(self):
        return f"{self.carrito.user.username}: {self.producto.nombre} - x{self.cantidad}"
