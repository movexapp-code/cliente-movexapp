import data from "../../env";

export class archivosAdminApi {
  url = data.url;

  options(method, body = null, isFormData = false) {
    // Si es FormData, no se setea Content-Type

    return {
      method: method,
      headers: {
        Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: body ? JSON.stringify(body) : null,
    };
  }

  async getArchivosAdmin(id) {
    const res = await fetch(
      `${this.url}admin/${id}/archivos`,
      this.options("GET")
    );
    if (!res.ok) {
      throw new Error("Error al cargar los archivos");
    }
    const data = await res.json();
    return data;
  }

  async subirArchivoNuevo(formData, id) {
    try {
      const response = await fetch(`${this.url}admin/${id}/subir-archivo`, {
        method: "POST",
        headers: {
          Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4", // 🔐 En header
        },
        body: formData,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al subir archivo en la API", error);
      throw error;
    }
  }

  async getArchivos() {
    const res = await fetch(`${this.url}archivos/listar`, this.options("GET"));
    if (!res.ok) {
      throw new Error("Error al cargar los archivos");
    }
    const data = await res.json();
    return data;
  }

  async asignarArchivos(alumnoId, archivos) {
    const res = await fetch(
      `${this.url}archivos/asignar/${alumnoId}`,
      this.options("POST", { archivosIds: archivos })
    );
    if (!res.ok) {
      throw new Error("Error al asignar los archivos");
    }
    const data = await res.json();
    return data;
  }

  async subirArchivo(file, nombre, descripcion) {
    const formData = new FormData();
    // Agregar el archivo al FormData
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("file", file);

    const res = await fetch(`${this.url}archivos/subir`, {
      method: "POST",
      headers: {
        Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Error al subir el archivo");
    }
    const data = await res.json();
    return data;
  }



  async eliminarArchivo(id) {
    const res = await fetch(
      `${this.url}archivos/eliminar/${id}`,
      this.options("DELETE")
    );
    if (!res.ok) {
      throw new Error("Error al eliminar el archivo");
    }
    const data = await res.json();
    return data;
  }
}
