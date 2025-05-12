from django.db import models
from django.utils.text import slugify
from decimal import Decimal

class Marca(models.Model):
    nombre = models.CharField(max_length=50)
    imagen = models.ImageField(upload_to='marcas/', null=True, blank=True)  # Agregado

    def __str__(self):
        return self.nombre

class Color(models.Model):
    nombre = models.CharField(max_length=50)
    color_style = models.CharField(max_length=12, blank=True, null=True)  # Agregado

    def __str__(self):
        return self.nombre

class Talle(models.Model):
    nombre = models.CharField(max_length=10)

    def __str__(self):
        return self.nombre

class TipoProducto(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Disciplina(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    ESTADO_CHOICES = [
        ('novedades', 'Novedades'),
        ('destacados', 'Destacados'),
        ('sale', 'Sale'),
    ]

    CATEGORIA_CHOICES = [
        ('indumentaria', 'Indumentaria'),
        ('calzado', 'Calzado'),
        ('accesorios', 'Accesorios'),
    ]

    nombre = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descuento = models.PositiveIntegerField(default=0)  
    stock = models.PositiveIntegerField(default=0)

    marca = models.ForeignKey(Marca, on_delete=models.SET_NULL, null=True)
    colores = models.ManyToManyField(Color, blank=True)
    talles = models.ManyToManyField(Talle, blank=True)
    tipo_producto = models.ForeignKey(TipoProducto, on_delete=models.SET_NULL, null=True, blank=True)
    disciplina = models.ForeignKey(Disciplina, on_delete=models.SET_NULL, null=True, blank=True)

    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, blank=True, null=True)
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES, blank=True, null=True)
    genero = models.CharField(max_length=20, choices=[('hombre', 'Hombre'), ('mujer', 'Mujer'), ('unisex', 'Unisex')])

    creado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-creado']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    @property
    def precio_con_descuento(self):
        if self.estado == 'sale' and self.descuento > 0:
            descuento_decimal = Decimal(self.descuento) / Decimal(100)
            return round(self.precio * (1 - descuento_decimal), 2)
        return self.precio

    def restar_stock(self, cantidad):
        if self.stock >= cantidad:
            self.stock -= cantidad
            self.save()
        else:
            raise ValueError("No hay suficiente stock disponible")

    def sumar_stock(self, cantidad):
        self.stock += cantidad
        self.save()

    def __str__(self):
        return self.nombre
    

class ImagenProducto(models.Model):
    producto = models.ForeignKey('Producto', on_delete=models.CASCADE, related_name='imagenes')
    imagen = models.ImageField(upload_to='productos/')
    orden = models.PositiveIntegerField(default=0)  # opcional, para ordenarlas

    class Meta:
        ordering = ['orden']

    def __str__(self):
        return f"Imagen de {self.producto.nombre}"
