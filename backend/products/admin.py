from django.contrib import admin
from .models import (
    Talle, Marca, Color, TipoProducto, Disciplina, Producto, ImagenProducto
)


class ImagenProductoInline(admin.TabularInline):
    model = ImagenProducto
    extra = 1  # Número de formularios vacíos adicionales

class ProductoAdmin(admin.ModelAdmin):
    inlines = [ImagenProductoInline]

admin.site.register(Talle)
admin.site.register(Marca)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Color)
admin.site.register(TipoProducto)
admin.site.register(Disciplina)
admin.site.register(ImagenProducto)