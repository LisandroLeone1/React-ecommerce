from django.db import models
from django.contrib.auth.models import User
from products.models import Producto, Color, Talle  

class Pedido(models.Model):
    TIPO_ENVIO_CHOICES = [
        ("domicilio", "Envío a domicilio"),
        ("retiro", "Retiro por local")
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tipo_envio = models.CharField(max_length=10, choices=TIPO_ENVIO_CHOICES, default="domicilio")
    nombre_completo = models.CharField(max_length=100, default='Desconocido')
    email = models.EmailField(default='Desconocido')
    telefono = models.CharField(max_length=20, default='Desconocido')
    direccion = models.CharField(max_length=200, default='Desconocido')
    ciudad = models.CharField(max_length=100, default='Desconocido')
    provincia = models.CharField(max_length=100, default='Desconocido')
    codigo_postal = models.CharField(max_length=10, default='Desconocido')
    fecha = models.DateTimeField(auto_now_add=True)
    metodo_pago = models.CharField(max_length=60)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Pedido #{self.id} - {self.nombre_completo} - {self.tipo_envio}"
    

class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='items', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    talle = models.ForeignKey(Talle, on_delete=models.SET_NULL, null=True, blank=True) 
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.pedido.nombre_completo}: {self.producto} - x{self.cantidad}"