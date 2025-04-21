import data from "../../env";
export class AdminApi {
  url = data.url;

  async crearRutinaGeneral(id, rutinaData) {
    const response = await fetch(`${this.url}admin/${id}/crear/rutina/general`, {
      method: "POST",
      headers: {
        Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rutinaData),
    });
    if (!response.ok) {
      throw new Error("Error al crear la rutina");
    }
    const data = await response.json();
    return data;
  }

  async getAdmin(id) {
    const response = await fetch(`${this.url}admin/admin/${id}`, {
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

  async obtenerRutinasGenerales(id) {
    const response = await fetch(`${this.url}admin/${id}/rutinas/generales`, {
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
}
