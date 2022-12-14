const getLightPrice = async () => {
  try {
    // Me traigo el precio de la luz previamente cacheado en el localStorage (si es que existe, si no, va a ser null). Para entender mejor esto, podéis mirar a partir de la línea 17, que es cuando hago el fetch a la API y guardo los datos en el localStorage
    const cache = JSON.parse(localStorage.getItem("lightPrice"));

    // Compruebo si ya han pasado más de 5 minutos desde que hice el cacheado. Date.now() es la fecha de ahora mismo, y cache.time es la fecha de cuando guardé el precio de la luz en el localStorage. Si diferencia entre ahora mismo y cuando guardé el caché, es mayor de 5 minutos, entonces quiere decir que el caché expiró
    const FIVE_MINS_IN_MS = 5 * 60 * 1000;
    const didCacheExpire = Date.now() - cache?.time > FIVE_MINS_IN_MS;

    // Si el caché existe y no ha expirado, retorno los datos guardados en él
    if (cache && !didCacheExpire) {
      return cache.data;
    }

    // Si no exite el cache o ha expirado, procedo a hacer fetch para obtener los datos de la API

    const url = `https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Hubo un error haciendo la petición");
    }

    const lightPrice = JSON.parse(data.contents);

    // Una vez obtenidos los datos de la API, guardo en el localStorage un objeto que tiene la propiedad data con los datos, y la propiedad time con la fecha exacta en la que guardé los datos
    localStorage.setItem(
      "lightPrice",
      JSON.stringify({ data: lightPrice, time: Date.now() })
    );

    return lightPrice;
  } catch (error) {
    //si falla el catch sacamos por consola un mensaje de error
    console.error(error.message);
  }
};

export default getLightPrice;
