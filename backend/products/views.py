from rest_framework import viewsets
from .models import (
    Talle, Marca, Color, TipoProducto, Disciplina, Producto
)
from .serializers import (
    TalleSerializer, MarcaSerializer, ColorSerializer,
    TipoProductoSerializer, DisciplinaSerializer, ProductoSerializer
)

class TalleViewSet(viewsets.ModelViewSet):
    queryset = Talle.objects.all()
    serializer_class = TalleSerializer

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class TipoProductoViewSet(viewsets.ModelViewSet):
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer

class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'id' 