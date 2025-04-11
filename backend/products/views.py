from .models import Producto, Marca, Color, TalleCalzado, TalleIndumentaria, Categoria, TalleAccesorio
from rest_framework import viewsets
from .serializers import (
    TalleIndumentariaSerializer, TalleCalzadoSerializer, TalleAccesorioSerializer,
    MarcaSerializer, CategoriaSerializer, ColorSerializer, ProductoSerializer
)


# Create your views here.
class TalleIndumentariaViewSet(viewsets.ModelViewSet):
    queryset = TalleIndumentaria.objects.all()
    serializer_class = TalleIndumentariaSerializer

class TalleCalzadoViewSet(viewsets.ModelViewSet):
    queryset = TalleCalzado.objects.all()
    serializer_class = TalleCalzadoSerializer

class TalleAccesorioViewSet(viewsets.ModelViewSet):
    queryset = TalleAccesorio.objects.all()
    serializer_class = TalleAccesorioSerializer

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'id' 