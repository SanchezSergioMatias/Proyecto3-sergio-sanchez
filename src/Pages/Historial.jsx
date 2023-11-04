import React, { useState } from "react";

// Resto del código del componente Index...

export default function Historial() {
  const [historial, setHistorial] = useState(JSON.parse(localStorage.getItem("historial")) || []);

  const borrarHistorial = () => {
    localStorage.removeItem("historial");
    setHistorial([]); // Actualiza el estado del historial
  };

  return (
    <div>
      <h1 className="center separador">Ver Historial 📋</h1>
      <div className="center div-cotizador">
        <button onClick={borrarHistorial} className="button button-outline">
          Borrar Historial
        </button>
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((cotizacion, index) => (
              <tr key={index}>
                <td>{cotizacion.fecha}</td>
                <td>{cotizacion.propiedad}</td>
                <td>{cotizacion.ubicacion}</td>
                <td>{cotizacion.metrosCuadrados}</td>
                <td>{cotizacion.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="center separador">
          <a href="/">
            <button className="button button-outline">VOLVER</button>
          </a>
        </div>
      </div>
    </div>
  );
}


