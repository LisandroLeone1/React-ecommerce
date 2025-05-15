export function formatearPrecio(valor) {
  const numero = Number(valor);

  if (isNaN(numero)) {
    return '';
  }

  return numero.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}