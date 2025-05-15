from rest_framework import serializers
from .models import Pedido, ItemPedido
from products.models import Producto, Color, Talle

# serializers de lectura (para mostrar info completa) 

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

class ItemPedidoReadSerializer(serializers.ModelSerializer):
    color = ColorSerializer(read_only=True)
    talle = TalleSerializer(read_only=True)
    producto = ProductoSerializer(read_only=True)

    class Meta:
        model = ItemPedido
        fields = ['cantidad', 'producto', 'talle', 'color']


# serializer de escritura (para crear pedidos) 

class ItemPedidoWriteSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())
    color = serializers.PrimaryKeyRelatedField(queryset=Color.objects.all())
    talle = serializers.PrimaryKeyRelatedField(queryset=Talle.objects.all())

    class Meta:
        model = ItemPedido
        fields = ['cantidad', 'producto', 'talle', 'color']


# serializer del pedido 

class PedidoSerializer(serializers.ModelSerializer):
    direccion = serializers.CharField(
        required=False, allow_blank=True,
        error_messages={
            "blank": "El campo 'direccion' es obligatorio.",
            "required": "El campo 'direccion' es obligatorio."
        }
    )
    ciudad = serializers.CharField(
        required=False, allow_blank=True,
        error_messages={
            "blank": "El campo 'ciudad' es obligatorio.",
            "required": "El campo 'ciudad' es obligatorio."
        }
    )
    provincia = serializers.CharField(
        required=False, allow_blank=True,
        error_messages={
            "blank": "El campo 'provincia' es obligatorio.",
            "required": "El campo 'provincia' es obligatorio."
        }
    )
    codigo_postal = serializers.CharField(
        required=False, allow_blank=True,
        error_messages={
            "blank": "El campo 'código postal' es obligatorio.",
            "required": "El campo 'código postal' es obligatorio."
        }
    )
    telefono = serializers.CharField(
        required=False, allow_blank=True,
        error_messages={
            "blank": "El campo 'teléfono' es obligatorio.",
            "required": "El campo 'teléfono' es obligatorio."
        }
    )
    nombre_completo = serializers.CharField(
        required=False, allow_blank=True,
        error_messages={
            "blank": "El campo 'nombre completo' es obligatorio.",
            "required": "El campo 'nombre completo' es obligatorio."
        }
    )
    email = serializers.EmailField(
        required=False,
        error_messages={
            "invalid": "El email ingresado no es válido.",
            "required": "El campo 'email' es obligatorio."
        }
    )
    tipo_envio = serializers.CharField(
        required=True, allow_blank=False,
        error_messages={
            "blank": "El campo 'tipo de envío' es obligatorio.",
            "required": "El campo 'tipo de envío' es obligatorio."
        }
    )
    metodo_pago = serializers.CharField(
        required=True, allow_blank=False,
        error_messages={
            "blank": "El campo 'método de pago' es obligatorio.",
            "required": "El campo 'método de pago' es obligatorio."
        }
    )

    items = ItemPedidoWriteSerializer(many=True)

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
            'metodo_pago',
            'total',
            'fecha',
            'items',
        ]
        read_only_fields = ['total']

    def validate(self, data):
        errors = {}

        tipo_envio = data.get('tipo_envio')
        metodo_pago = data.get('metodo_pago')

        if tipo_envio not in ['domicilio', 'retiro']:
            errors['tipo_envio'] = "El tipo de envío debe ser 'domicilio' o 'retiro'."

        if metodo_pago not in ['tarjeta', 'efectivo']:
            errors['metodo_pago'] = "El método de pago debe ser 'tarjeta' o 'efectivo'."

        if not data.get('items'):
            errors['items'] = "Debés agregar al menos un producto al pedido."

        campos_domicilio = [
            ('direccion', "El campo 'direccion' es obligatorio."),
            ('ciudad', "El campo 'ciudad' es obligatorio."),
            ('provincia', "El campo 'provincia' es obligatorio."),
            ('codigo_postal', "El campo 'código postal' es obligatorio."),
        ]

        campos_generales = [
            ('telefono', "El campo 'teléfono' es obligatorio."),
            ('nombre_completo', "El campo 'nombre completo' es obligatorio."),
            ('email', "El campo 'email' es obligatorio."),
        ]

        if tipo_envio == 'domicilio':
            for campo, mensaje in campos_domicilio + campos_generales:
                if not data.get(campo) or str(data.get(campo)).strip() == "":
                    errors[campo] = mensaje

        elif tipo_envio == 'retiro':
            for campo, mensaje in campos_generales:
                if not data.get(campo) or str(data.get(campo)).strip() == "":
                    errors[campo] = mensaje

        if errors:
            raise serializers.ValidationError(errors)

        return data

    def create(self, validated_data):
        items_data = validated_data.pop('items')

        total = 0
        for item in items_data:
            total += item['producto'].precio_con_descuento * item['cantidad']

        pedido = Pedido.objects.create(**validated_data, total=total)

        for item in items_data:
            producto = item['producto']
            cantidad = item['cantidad']

            ItemPedido.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=cantidad,
                talle=item['talle'],
                color=item['color'],
                precio_unitario=item['producto'].precio_con_descuento
            )

            if producto.stock < cantidad:
                raise serializers.ValidationError(
                    f"Stock insuficiente para el producto '{producto.nombre}'."
            )
        
            producto.stock -= cantidad
            producto.save()

        return pedido


#  serializer de lectura del pedido completo 

class PedidoReadSerializer(serializers.ModelSerializer):
    items = ItemPedidoReadSerializer(many=True)

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
            'metodo_pago',
            'total',
            'fecha',
            'items',
        ]
