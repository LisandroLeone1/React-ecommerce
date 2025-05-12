from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from decimal import Decimal
from .models import Pedido, ItemPedido
from .serializers import PedidoSerializer, ItemPedidoSerializer
from products.models import Producto, Talle, Color

class AgregarPedido(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        items = request.data.get('items', [])
        nombre = request.data.get('nombre_completo')
        email = request.data.get('email')
        telefono = request.data.get('telefono')
        direccion = request.data.get('direccion')
        ciudad = request.data.get('ciudad')
        provincia = request.data.get('provincia')
        codigo_postal = request.data.get('codigo_postal')
        metodo_pago = request.data.get('metodo_pago')
        tipo_envio = request.data.get('tipo_envio')

        if not items:
            return Response({'error': 'No hay productos en el pedido.'}, status=status.HTTP_400_BAD_REQUEST)

        # creo el pedido sin total 
        pedido = Pedido.objects.create(
            user=user,
            tipo_envio=tipo_envio,
            direccion=direccion,
            nombre_completo=nombre,
            email=email,
            telefono=telefono,
            ciudad=ciudad,
            provincia=provincia,
            codigo_postal=codigo_postal,
            metodo_pago=metodo_pago,
            total=0  # lo calculo despues
        )

        total = Decimal("0.00")

        try:
            for item in items:
                producto_id = item.get('producto')
                cantidad = int(item.get('cantidad', 1))
                talle_id = item.get('talle')
                color_id = item.get('color')

                producto = Producto.objects.get(id=producto_id)

                if producto.stock < cantidad:
                    pedido.delete()
                    return Response({'error': f'Stock insuficiente para el producto {producto.nombre}'}, status=400)

                try:
                    talle = Talle.objects.get(id=talle_id)
                    color = Color.objects.get(id=color_id)
                except Talle.DoesNotExist:
                    return Response({'error': 'El talle seleccionado no existe.'}, status=status.HTTP_400_BAD_REQUEST)
                except Color.DoesNotExist:
                        return Response({'error': 'El color seleccionado no existe.'}, status=status.HTTP_400_BAD_REQUEST)
                
                precio = producto.precio_con_descuento

                # descuento stock
                producto.stock -= cantidad
                producto.save()

                subtotal = precio * Decimal(cantidad)
                total += subtotal

                ItemPedido.objects.create(
                    pedido=pedido,
                    producto=producto,
                    talle=talle,
                    color=color,
                    cantidad=cantidad,
                    precio_unitario=precio
                )

            # Asignar total calculado
            pedido.total = total
            pedido.save()

            serializer = PedidoSerializer(pedido)
            return Response({'message': 'Pedido creado con éxito', 'pedido': serializer.data}, status=201)

        except Exception as e:
            pedido.delete()  # eliminar pedido si algo falla
            return Response({'error': str(e)}, status=500)

class PedidoUsuario(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        pedido = get_object_or_404(Pedido, id=id, user=request.user)
        serializer = PedidoSerializer(pedido)
        return Response(serializer.data)