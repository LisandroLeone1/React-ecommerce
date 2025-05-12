from rest_framework import serializers
from .models import ItemCarrito
from products.models import Producto, Color, Talle, ImagenProducto


class ImagenProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProducto
        fields = ['imagen'] 

class TalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talle
        fields = ['id', 'nombre']

# Serializer del Producto
class ProductoSerializer(serializers.ModelSerializer):
    imagenes = ImagenProductoSerializer(many=True, read_only=True)
    talles = TalleSerializer(many=True, read_only=True)
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'descuento', 'stock', 'talles', 'imagenes']

# Serializer del Color
class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'nombre']

# Serializer del Item del carrito
class ItemCarritoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    color = ColorSerializer(read_only=True)
    talle = TalleSerializer(read_only=True)

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto', 'cantidad', 'talle', 'color']