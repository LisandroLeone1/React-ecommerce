from rest_framework import serializers
from .models import ItemCarrito
from products.models import Producto, Color

# Serializer del Producto
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'imagen_principal', 'descuento', 'stock', 'talles']

# Serializer del Color
class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'nombre']

# Serializer del Item del carrito
class ItemCarritoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    color = ColorSerializer(read_only=True)

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto', 'cantidad', 'talle', 'color']