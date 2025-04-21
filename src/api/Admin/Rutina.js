import data from "../../env";

export class RutinaApi {
  url = data.url;
  options(method) {
    return {
      method: method,
      headers: {
        Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
        "Content-Type": "application/json",
      },
    };
  }

  async getRutinas(idCliente) {
    const response = await fetch(
      `${this.url}usuario/${idCliente}/rutinas/asignadas`
    );
    const data = await response.json();
    return data;
  }

  /*     async getRutina(idCliente, idRutina) {
        const response = await fetch(
            `${this.url}/usuario/${idCliente}/rutinas/asignadas`
        );
        const data = await response.json();
        return data;
    } */

  async agregarEjercicioRutina(idAlumno, idRutina, ejercicioData) {
    const response = await fetch(
      `${this.url}admin/alumnos/${idAlumno}/rutina/${idRutina}/agregar-ejercicio`,
        {
            ...this.options("POST"),
            body: JSON.stringify(ejercicioData),
        }

    );
    const data = await response.json();
    return data;
  }

  async agregarNuevaRutina(idAlumno, rutinaData) {
    const response = await fetch(
      `${this.url}admin/alumnos/${idAlumno}/agregar-rutina`,
      {
        ...this.options("POST"),
        body: JSON.stringify(rutinaData),
      }
    );
    const data = await response.json();
    return data;
  }
}
