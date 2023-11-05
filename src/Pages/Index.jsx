import { useState } from 'react';
import datosUbicacion from './DatosUbicacion';
import datosPropiedad from './DatosPropiedad';
import Swal from 'sweetalert2';

const costoM2 = 35.86;

export default function Index() {
  const [selectedPropiedad, setSelectedPropiedad] = useState('');
  const [selectedUbicacion, setSelectedUbicacion] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState(20);
  const [cotizado, setCotizado] = useState(false);
  const [cotizacion, setCotizacion] = useState(0);

  const cotizar = () => {
    if (!selectedPropiedad || !selectedUbicacion || !metrosCuadrados) {

      Swal.fire('', 'Debes completar todos los datos en pantalla.', 'warning');
      return;
    }

    const factorPropiedad = datosPropiedad.find(
      (propiedad) => propiedad.tipo === selectedPropiedad
    )?.factor || 1;
    const factorUbicacion = datosUbicacion.find(
      (ubicacion) => ubicacion.tipo === selectedUbicacion
    )?.factor || 1;
    const precioEstimado =
      costoM2 * metrosCuadrados * factorPropiedad * factorUbicacion;

    setCotizacion(precioEstimado.toFixed(2));
    setCotizado(true);

    Swal.fire('', 'Cotización realizada con éxito.', 'success');
  };

  const guardarEnHistorial = () => {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const nuevaCotizacion = {
      fecha: new Date().toLocaleString(),
      propiedad: selectedPropiedad,
      ubicacion: selectedUbicacion,
      metrosCuadrados,
      precio: cotizacion,
    };
    historial.push(nuevaCotizacion);
    localStorage.setItem('historial', JSON.stringify(historial));


    toast();
  };

  const toast = () => {
    Swal.fire('Cotización guardada.', '', 'success');
  };

  return (
    <div>
      <div className="historial">
        <a href="/historial">
          <span title="Ver Historial">📋</span>
        </a>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className="center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select
          id="propiedad"
          value={selectedPropiedad}
          onChange={(e) => setSelectedPropiedad(e.target.value)}
        >
          <option value="" disabled>
            Seleccione el tipo de propiedad
          </option>
          {datosPropiedad.map((propiedad) => (
            <option key={propiedad.tipo} value={propiedad.tipo}>
              {propiedad.tipo}
            </option>
          ))}
        </select>
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
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          type="number"
          id="metros2"
          value={metrosCuadrados}
          onChange={(e) => setMetrosCuadrados(e.target.value)}
          min="20"
          max="500"
          required
        />

        <div className="center separador">
          <button onClick={cotizar} className="button button-outline">
            Cotizar
          </button>
          {cotizado && (
            <span
              className="guardar"
              title="Guardar en historial"
              onClick={guardarEnHistorial}
            >
              💾
            </span>
          )}
        </div>
        <div className="center separador">
          <p className="importe">
            Precio estimado: $ <span id="valorPoliza">{cotizacion}</span>
            <span className="guardar ocultar" title="Guardar en historial">
              💾
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}








