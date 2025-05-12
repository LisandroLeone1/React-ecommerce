from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Carrito, ItemCarrito
from products.models import Producto, Talle, Color
from .serializers import ItemCarritoSerializer
from django.db import transaction

class AgregarAlCarrito(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        productos = request.data.get('productos', [])

        if not productos:
            return Response({'error': 'No se proporcionaron productos'}, status=status.HTTP_400_BAD_REQUEST)

        carrito, _ = Carrito.objects.get_or_create(user=user) #Busca o crea un carrito relacionado con ese usuario

        carrito.items.all().delete() #Elimino los productos de ese carrito(se resetea el carro para volver a llenarlos con los datos del front)

        items_creados = []

        for item_data in productos:
            producto_id = item_data.get('producto')
            cantidad = item_data.get('cantidad', 1)
            talle_id = item_data.get('talle')
            color_id = item_data.get('color')

            try:
                producto = Producto.objects.get(id=producto_id)
            except Producto.DoesNotExist:
                continue

            talle = Talle.objects.get(id=talle_id) if talle_id else None
            color = Color.objects.get(id=color_id) if color_id else None

            nuevo_item = ItemCarrito.objects.create(
                carrito=carrito,
                producto=producto,
                cantidad=cantidad,
                talle=talle,
                color=color
            )
            items_creados.append(nuevo_item)

        serializer = ItemCarritoSerializer(items_creados, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class CarritoUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            carrito = Carrito.objects.get(user=user)
            items = carrito.items.all()
            serializer = ItemCarritoSerializer(items, many=True)
            return Response(serializer.data)
        except Carrito.DoesNotExist:
            return Response([]) 
        

class VaciarCarritoView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        try:
            carrito = Carrito.objects.get(user=user)
            carrito.items.all().delete()  
            return Response({'mensaje': 'Carrito vaciado correctamente'}, status=status.HTTP_204_NO_CONTENT)
        except Carrito.DoesNotExist:
            return Response({'mensaje': 'El carrito ya está vacío o no existe'}, status=status.HTTP_200_OK)