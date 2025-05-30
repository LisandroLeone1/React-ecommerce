# Generated by Django 5.1.7 on 2025-05-06 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='ciudad',
            field=models.CharField(default='Desconocido', max_length=100),
        ),
        migrations.AddField(
            model_name='pedido',
            name='codigo_postal',
            field=models.CharField(default='Desconocido', max_length=10),
        ),
        migrations.AddField(
            model_name='pedido',
            name='email',
            field=models.EmailField(default='Desconocido', max_length=254),
        ),
        migrations.AddField(
            model_name='pedido',
            name='nombre_completo',
            field=models.CharField(default='Desconocido', max_length=100),
        ),
        migrations.AddField(
            model_name='pedido',
            name='provincia',
            field=models.CharField(default='Desconocido', max_length=100),
        ),
        migrations.AddField(
            model_name='pedido',
            name='telefono',
            field=models.CharField(default='Desconocido', max_length=20),
        ),
        migrations.AddField(
            model_name='pedido',
            name='tipo_envio',
            field=models.CharField(choices=[('domicilio', 'Envío a domicilio'), ('retiro', 'Retiro por local')], default='domicilio', max_length=10),
        ),
        migrations.AlterField(
            model_name='pedido',
            name='direccion',
            field=models.CharField(default='Desconocido', max_length=200),
        ),
    ]
