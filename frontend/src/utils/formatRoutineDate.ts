export const formatRoutineDate = (dateString: string) => {
  const date = new Date(dateString);

  // Obtendo as partes da data
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};