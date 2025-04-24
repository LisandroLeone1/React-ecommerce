from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['address', 'phone_number', 'birth_date']

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[],  # Remueve los validadores por defecto, como UniqueValidator
        min_length=4,
        max_length=30,
        error_messages={
            'min_length': 'El nombre de usuario debe tener al menos 4 caracteres.',
            'max_length': 'El nombre de usuario no puede superar los 30 caracteres.',
            'blank': 'El nombre de usuario no puede estar vacío.',
            'required': 'Tenés que ingresar un nombre de usuario.',
    }
    )

    password = serializers.CharField(write_only=True, required=True, error_messages={
        'blank': 'La contraseña no puede estar vacía.',
        'required': 'Tenés que ingresar una contraseña.',
    })

    password2 = serializers.CharField(write_only=True, required=True, label='Repetir contraseña', error_messages={
        'blank': 'Tenés que repetir la contraseña.',
        'required': 'Tenés que repetir la contraseña.',
    })

    first_name = serializers.CharField(required=True, error_messages={
        'blank': 'Tenés que ingresar tu nombre.',
        'required': 'El nombre es obligatorio.',
    })

    last_name = serializers.CharField(required=True, error_messages={
        'blank': 'Tenés que ingresar tu apellido.',
        'required': 'El apellido es obligatorio.',
    })

    email = serializers.EmailField(required=True, error_messages={
        'invalid': 'Ingresá un email válido.',
        'blank': 'El correo electrónico es obligatorio.',
        'required': 'Tenés que ingresar un correo electrónico.',
    })


    usuario = UsuarioSerializer(required=False)

    class Meta:
        model = User
        fields = ['username', 
                'first_name',
                'last_name',
                'email',
                'password',
                'password2',
                'usuario']


    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con ese nombre.")
        return value

    def validate_email(self, value):
        value = value.lower().strip()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con ese correo.")
        return value
    
    def validate_first_name(self, value):
        return value.title()

    def validate_last_name(self, value):
        return value.title()

    def validate(self, data):
        if data.get("password") != data.get("password2"):
            raise serializers.ValidationError({"password2": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario', {}) # guardo los datos del campo 'usuario' en usuario_data 
        # y tambien los elimino de validated_data
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data) # validated_data es un diccionario, por eso uso ** para convertirlos en clave-valor
        Usuario.objects.create(user=user, **usuario_data) # creo el usuario pasandole los datos de User y 'usuario'

        return user
    
    def to_representation(self, instance):
        """Para que en GET devuelva también los datos extendidos"""
        representation = super().to_representation(instance)
        usuario = Usuario.objects.filter(user=instance).first()
        if usuario:
            representation['usuario'] = UsuarioSerializer(usuario).data
        return representation