import data from "../../env";

export class AlumnosAdminApi {
  url = data.url;

  options(method, body = null) {
    return {
      method: method,
      headers: {
        Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
        "Content-Type": "application/json",
      },
      body: body,
    };
  }

  async crearAlumno(alumnoData) {
    const response = await fetch(`${this.url}admin/alumnos/nuevo`, {
      ...this.options("POST"),
      body: JSON.stringify(alumnoData),
    });
    if (!response.ok) {
      throw new Error("Error al crear el alumno");
    }
    const data = await response.json();
    return data;
  }

  async agregarPregunta(preguntaData) {
    const response = await fetch(`${this.url}formulario/agregar`, {
      ...this.options("POST"),
      body: JSON.stringify(preguntaData),
    });
    if (!response.ok) {
      throw new Error("Error al agregar la pregunta");
    }
    const data = await response.json();
    return data;
  }

  async getFormularioPreguntas() {
    const response = await fetch(`${this.url}formulario`, {
      ...this.options("GET"),
    });
    if (!response.ok) {
      throw new Error("Error al cargar el formulario");
    }
    const data = await response.json();
    //console.log(data);

    return data;
  }

  async getAlumnos() {
    const response = await fetch(
      `${this.url}admin/alumnos`,
      this.options("GET")
    );
    const data = await response.json();
    return data;
  }

  async getAlumno(id) {
    const response = await fetch(
      `${this.url}admin/alumnos/${id}`,
      this.options("GET")
    );
    if (!response.ok) {
      throw new Error("Error al cargar los datos del usuario");
    }
    const data = await response.json();
    return data;
  }

  async deleteAlumno(id) {
    const response = await fetch(
      `${this.url}admin/alumnos/${id}`,
      this.options("DELETE")
    );
    if (!response.ok) {
      throw new Error("Error al eliminar el alumno");
    }
    const data = await response.json();
    return data;
  }

  async updateAlumno(id, alumnoData) {
    const response = await fetch(`${this.url}admin/alumnos/${id}/actualizar`, {
      ...this.options("PATCH"),
      body: JSON.stringify(alumnoData),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el alumno");
    }
    const data = await response.json();
    return data;
  }

  async verRespuestasFormulario(id) {
    const response = await fetch(
      `${this.url}usuario/${id}/formulario/respuestas`,
      this.options("GET")
    );
    if (!response.ok) {
      throw new Error("Error al cargar las respuestas del formulario");
    }
    const data = await response.json();
    return data;
  }

  async crearRutinaNueva(id, rutinaData) {
    const response = await fetch(
      `${this.url}admin/alumnos/${id}/agregar-rutina`,
      {
        ...this.options("POST"),
        body: JSON.stringify(rutinaData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear la rutina");
    }

    const data = await response.json();
    return data;
  }

  async getRutinasAlumno(id) {
    const response = await fetch(
      `${this.url}usuario/${id}/rutinas/asignadas`,
      this.options("GET")
    );
    if (!response.ok) {
      throw new Error("Error al cargar las rutinas del alumno");
    }
    const data = await response.json();
    return data;
  }

  async getRutinasAlumnosMixto(id) {
    const response = await fetch(
      `${this.url}usuario/${id}/rutinas/mixtas`,
      this.options("GET")
    );
    if (!response.ok) {
      throw new Error("Error al cargar las rutinas del alumno");
    }
    const data = await response.json();
    return data;
  }

  async convertirAPDF(id, idRutina, modelo) {
    const response = await fetch(
      `${this.url}admin/alumnos/${id}/rutina/${idRutina}/generar-pdf?modelo=${modelo}`,
      this.options("POST")
    );
    if (!response.ok) {
      throw new Error("Error al convertir a PDF");
    }
    const data = await response.blob();
    return data;
  }
}
