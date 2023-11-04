// DatosUbicacion.jsx
import React from 'react';

const DatosUbicacion = ({ selectedUbicacion, setSelectedUbicacion, datosUbicacion }) => {
  return (
    <div>
      <label htmlFor="ubicacion">Selecciona su ubicación</label>
      <select
        id="ubicacion"
        value={selectedUbicacion}
        onChange={(e) => setSelectedUbicacion(e.target.value)}
      >
        <option value="" disabled>
          Seleccione la ubicación
        </option>
        {datosUbicacion.map((ubicacion) => (
          <option key={ubicacion.tipo} value={ubicacion.tipo}>
            {ubicacion.tipo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatosUbica
/*  */