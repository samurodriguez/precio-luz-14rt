const getBestAndWorstHours = (lightPrice) => {
  // Con Object.values() obtengo un array con todos los valores del objeto "lightPrice"
  const lightPriceArray = Object.values(lightPrice);

  // Ordeno el array de la hora más barata a la más cara
  lightPriceArray.sort((a, b) => a.price - b.price);

  const bestHour = lightPriceArray[0];
  const worstHour = lightPriceArray[lightPriceArray.length - 1];

  return { bestHour, worstHour };
};

export default getBestAndWorstHours;
