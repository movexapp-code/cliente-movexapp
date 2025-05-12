import data from "../../env";

export class VideoApi {
  url = data.url;

  async getVideos() {
    const response = await fetch(`${this.url}videos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener videos");
    }
    const data = await response.json();
    return data;
  }

  async crearVideo(videoData) {
    const response = await fetch(`${this.url}videos/nuevo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    });
    if (!response.ok) {
      throw new Error("Error al crear el video");
    }
    const data = await response.json();
    return data;
  }

  async editarVideo(id, videoData) {
    const response = await fetch(`${this.url}videos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    });
    if (!response.ok) {
      throw new Error("Error al editar el video");
    }
    const data = await response.json();
    return data;
  }

  async eliminarVideo(id) {
    const response = await fetch(`${this.url}videos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el video");
    }
    const data = await response.json();
    return data;
  }
}
