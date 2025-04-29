from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Carrito, ItemCarrito
from products.models import Producto
from .serializers import ItemCarritoSerializer
from django.db import transaction

class AgregarAlCarrito(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        user = request.user
        productos = request.data.get('productos', [])

        if not productos:
            return Response({'error': 'No se proporcionaron productos'}, status=status.HTTP_400_BAD_REQUEST)

        carrito, _ = Carrito.objects.select_for_update().get_or_create(user=user)

        # 🔥 Primero borramos los productos viejos
        carrito.items.all().delete()

        items_creados = []

        for item_data in productos:
            producto_id = item_data.get('producto')
            cantidad = item_data.get('cantidad', 1)
            talle = item_data.get('talle')
            color_id = item_data.get('color')

            try:
                producto = Producto.objects.get(id=producto_id)
            except Producto.DoesNotExist:
                continue

            nuevo_item = ItemCarrito.objects.create(
                carrito=carrito,
                producto=producto,
                cantidad=cantidad,
                talle=talle,
                color_id=color_id
            )
            items_creados.append(nuevo_item)

        serializer = ItemCarritoSerializer(items_creados, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class CarritoUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            carrito = Carrito.objects.get(user=request.user)
            items = carrito.items.all()
            serializer = ItemCarritoSerializer(items, many=True)
            return Response(serializer.data)
        except Carrito.DoesNotExist:
            return Response([]) 