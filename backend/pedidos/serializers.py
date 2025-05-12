from rest_framework import serializers
from .models import Pedido, ItemPedido
from products.models import Producto, Color, Talle
from rest_framework.response import Response
from rest_framework import status

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'nombre']

class TalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talle
        fields = ['id', 'nombre']

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre']

class ItemPedidoSerializer(serializers.ModelSerializer):
    color = ColorSerializer(read_only=True)
    talle = TalleSerializer(read_only=True)
    producto = ProductoSerializer(read_only=True)

    class Meta: 
        model = ItemPedido
        fields = ['pedido', 'cantidad', 'producto','talle', 'color']


class PedidoSerializer(serializers.ModelSerializer):    
    items = ItemPedidoSerializer(many=True)

    class Meta:
        model = Pedido
        fields = [
            'id',
            'user',
            'direccion',
            'ciudad',
            'provincia',
            'codigo_postal',
            'telefono',
            'nombre_completo',
            'email',
            'tipo_envio',
            'total',
            'fecha',
            'items',
        ]

        
        def create(self, validated_data):
            items_data = validated_data.pop('items')
            pedido = Pedido.objects.create(**validated_data)

            for item_data in items_data:
                ItemPedido.objects.create(pedido=pedido, **item_data)

            return pedido
    
    def validate(self, data):
        required_fields = [
            'direccion', 'ciudad', 'provincia', 'codigo_postal', 'telefono',
            'nombre_completo', 'email', 'tipo_envio', 'metodo_pago', 'items'
        ]

        errors = {}

        for field in required_fields:
            value = data.get(field)
        if not value or (isinstance(value, str) and not value.strip()):
            errors[field] = f"El campo '{field}' es obligatorio."

        if data.get('tipo_envio') not in ['domicilio', 'retiro']:
            errors['tipo_envio'] = "El tipo de envío debe ser 'domicilio' o 'retiro'."

        if data.get('metodo_pago') not in ['tarjeta', 'efectivo']:
            errors['metodo_pago'] = "El método de pago debe ser 'tarjeta' o 'efectivo'."

        if 'items' in data and not data['items']:
            errors['items'] = "Debés agregar al menos un producto al pedido."

        if errors:
            raise serializers.ValidationError(errors)

        return data

