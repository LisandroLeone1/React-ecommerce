from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from decimal import Decimal
from .models import Pedido, ItemPedido
from .serializers import PedidoSerializer, PedidoReadSerializer
from products.models import Producto, Talle, Color

class AgregarPedido(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id  # asignar el usuario autenticado

        serializer = PedidoSerializer(data=data)
        if serializer.is_valid():
            pedido = serializer.save()
            read_serializer = PedidoReadSerializer(pedido)
            return Response({'pedido': read_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PedidoUsuario(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        pedido = get_object_or_404(Pedido, id=id, user=request.user)
        serializer = PedidoReadSerializer(pedido)
        return Response(serializer.data)