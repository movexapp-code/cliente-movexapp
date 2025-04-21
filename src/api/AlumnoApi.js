import data from "../env.js";

export default class AlumnoAPi {
  url = data.url;

  options(method, body = null) {
    const isFormData = body instanceof FormData;

    const headers = {
      Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
      // solo se setea Content-Type si no es FormData
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };

    return {
      method: method,
      headers: headers,
      body: isFormData ? body : JSON.stringify(body),
    };
  }


  async subirArchivo(id, data) {
    const response = await fetch(
      `${this.url}usuario/${id}/subir/archivo`,
      this.options("POST", data)
    );
    if (!response.ok) {
      throw new Error("Error al subir el archivo");
    }
    const res = await response.json();
    return res;

  }

  async getAlumnos() {
    const response = await fetch(`${this.url}admin/alumnos`, this.options);
    const data = await response.json();
    return data;
  }
  async getAlumno(id) {
    const response = await fetch(`${this.url}admin/alumnos/${id}`, {
      method: "GET",
      headers: {
        Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al cargar los datos del usuario");
    }
    const data = await response.json();
    return data;
  }

  async loginAlumno(email, password) {
    try {
      const response = await fetch(`${this.url}usuario/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  async responderPreguntas(userId, respuestas) {
    try {
      const response = await fetch(
        `${this.url}usuario/${userId}/formulario/responder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
          },
          body: JSON.stringify({
            formularioId: "67f19ef7e64b44a9786930b5",
            respuestas: respuestas,
          }),
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
    }
  }
}
