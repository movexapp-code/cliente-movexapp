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

  async getListRutinasGenerales() {
    const response = await fetch(
      `${this.url}admin/rutinas/generales`,
      this.options("GET")
    );
    const data = await response.json();
    return data;
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

  async asignarRutinaTemporal(rutinasID, idAlumno) {
    const response = await fetch(
      `${this.url}admin/asignar/rutina/general/${idAlumno}`,
      {
        ...this.options("POST"),
        body: JSON.stringify(rutinasID),
      }
    );
    const data = await response.json();
    return data;
  }

  async editarRutinaTemporal(id, rutina){
    const response = await fetch(
      `${this.url}admin/editar/rutina/general/${id}`,
      {
        ...this.options("PATCH"),
        body: JSON.stringify(rutina),
      }
    );
    const data = await response.json();
    return data;
  }

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

  async actualizarRutina(id, idRutina, rutinaData) {
    const response = await fetch(
      `${this.url}admin/alumnos/${id}/rutina/${idRutina}/actualizar`,
      {
        ...this.options("PATCH"),
        body: JSON.stringify(rutinaData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la rutina");
    }

    const data = await response.json();
    return data;
  }

  async eliminarRutina(id, idRutina) {
    const response = await fetch(
      `${this.url}admin/${id}/rutina/eliminar/${idRutina}`,
      {
        ...this.options("DELETE"),
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar la rutina");
    }

    const data = await response.json();
    return data;
  }
}
