from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)  # creamos una instacia del serializer con los datos que le damos del front
        # con data convertimos los datos Json que vienen del front, en un diccionario de python
        if serializer.is_valid(): # Activa las funciones validate del serializers para chequear si los datos pasados desde el formulario son correctos
            serializer.save() # Si son correctos, save llama a la funcion create y crea un nuevo usuario
            return Response({"mensaje": "Usuario creado con éxito"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # request.user es una instacia del modelo User(objeto de python)
        serializer = UserSerializer(request.user)  # le pasamos ese objeto al serializer para que lo tranforme en Json y mostrarlo en el front
        # y llama a la funcion to_representation en serializers.py
        return Response(serializer.data)