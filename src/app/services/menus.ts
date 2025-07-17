import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Menus {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  // Obtener todos los menús
  getAllMenus() {
    return this.httpClient.get(`${this.apiUrl}/menu`);
  }

  // Obtener un menú por ID
  getMenuById(id: string) {
    return this.httpClient.get(`${this.apiUrl}/menu/${id}`);
  }

  // Crear un nuevo menú
  createMenu(menuData: any) {
    return this.httpClient.post(`${this.apiUrl}/menu`, menuData);
  }

  // Actualizar un menú existente
  updateMenu(id: string, menuData: any) {
    return this.httpClient.put(`${this.apiUrl}/menu/${id}`, menuData);
  }

  // Eliminar un menú
  deleteMenu(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/menu/${id}`);
  }
  
}
