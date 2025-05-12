from rest_framework import serializers
from .models import (
    Talle, Marca, Color, TipoProducto, Disciplina, Producto, ImagenProducto
)

class TalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talle
        fields = '__all__'

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = '__all__'

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class ImagenProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProducto
        fields = ['id', 'imagen', 'orden']

class ProductoSerializer(serializers.ModelSerializer):
    marca = MarcaSerializer()
    colores = ColorSerializer(many=True)
    tipo_producto = TipoProductoSerializer()
    disciplina = DisciplinaSerializer()
    talles = TalleSerializer(many=True)
    imagenes = ImagenProductoSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = '__all__'