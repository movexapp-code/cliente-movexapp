import data from "../../env";
export class AdminApi {
  url = data.url;

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

  async obtenerRutinasGeneralesCompletas() {
    const response = await fetch(
      `${this.url}admin/rutinas/generales/completas`,
      {
        method: "GET",
        headers: {
          Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al cargar los datos del usuario");
    }
    const data = await response.json();
    return data;
  }
}
