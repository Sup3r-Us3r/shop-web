export function handleFormatPrice(priceValue: number) {
  const intlOptions = {
    style: 'currency',
    currency: 'BRL',
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
  } as Intl.NumberFormatOptions;

  return Intl.NumberFormat('pt-BR', intlOptions).format(priceValue);
}
