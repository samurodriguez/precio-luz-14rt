"use strict";

import devices from "./devices.js";
import getLightPrice from "./getLightPrice.js";
import getBestAndWorstHours from "./getBestAndWorstHours.js";

const select = document.querySelector("select");

select.addEventListener("change", async (e) => {
  // Me traigo los precios de la luz
  const lightPrice = await getLightPrice();

  // Busco la mejor y peor hora
  const { bestHour, worstHour } = getBestAndWorstHours(lightPrice);

  const bwHoursParragraph = document.querySelector(".bwHours");

  bwHoursParragraph.innerHTML = `
    <p>Mejor hora: ${bestHour.hour}. Precio: ${bestHour.price}€</p>
    <p>Peor hora: ${worstHour.hour}. Precio: ${worstHour.price}€</p>
  `;

  // Busco la información del electrodoméstico seleccionado en el select
  const selectedDevice = devices.find(
    (device) => device.name === e.target.value
  );

  const { name, img, consumption, unit } = selectedDevice;

  let devicePhoto = document.querySelector(".devicePhoto");
  let details = document.querySelector(".deviceDetails");

  const currentHour = new Date().getHours();

  // Obtengo la franja horaria actual (14-15, 15-16, etc)
  const currentTimeZone = `${currentHour}-${
    currentHour < 24 ? currentHour + 1 : "00"
  }`;

  // Obtengo el precio del Mwh para la franja horaria actual
  const currentMwhPrice = lightPrice[currentTimeZone].price;

  // Calculo el coste de usar el electrodoméstico seleccionado en la franja horaria actual
  const deviceUsageCost = currentMwhPrice * consumption;

  devicePhoto.src = img;
  details.innerHTML = `
    <h2>${name}</h2>
    <p>Consumo por hora: ${consumption} ${unit}</p>
    <p>Precio a las ${currentHour}h: ${deviceUsageCost.toFixed(2)}€</p>
  `;
});
