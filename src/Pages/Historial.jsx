import { useState } from "react";
import Swal from 'sweetalert2';

export default function Historial() {
  const [historial, setHistorial] = useState(JSON.parse(localStorage.getItem("historial")) || []);

  const borrarHistorial = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar historial',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem("historial");
        setHistorial([]);
        Swal.fire(
          'Borrado',
          'Tu historial ha sido eliminado.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire(
          'Cancelado',
          'Tu historial está a salvo :)',
          'error'
        );
      }
    });
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


