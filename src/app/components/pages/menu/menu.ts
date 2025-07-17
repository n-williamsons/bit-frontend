import { Component, inject } from '@angular/core';
import { Menus } from '../../../services/menus';
import {JwtHelperService} from "@auth0/angular-jwt"
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private menusService = inject(Menus);
  private formBuilder = inject(FormBuilder);

  menus!: any[];
  user: string = ''; 
  showMenus: boolean = false;
  showCreateForm: boolean = false;
  isSubmitting: boolean = false;
  createMenuForm!: FormGroup; 

  ngOnInit(): void{
    // Inicializar el formulario
    this.initializeCreateForm();
    
    const token : any = localStorage.getItem('token');
    console.log("token:", token);

    if (token) {
      const tokenDecoded = jwtHelperService.decodeToken(token);
      console.log("tokenDecoded", tokenDecoded);

      this.user = tokenDecoded.name.toUpperCase() || tokenDecoded.name || tokenDecoded.email || 'Usuario';
    } else {
      this.user = 'Usuario';
    }

    this.menusService.getAllMenus().subscribe({
      next: (res: any) => {
        this.menus = res.data || res;
        console.log("menus: ", this.menus);
      },
      error: (error) => {
        console.error("Error al cargar menús:", error);
        this.menus = [];
      }
    });
  }

  // Inicializar formulario de creación
  initializeCreateForm(): void {
    this.createMenuForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      image: [''],
      available: [true]
    });
  }

  // Método para mostrar/ocultar la lista de menús
  toggleMenusList(): void {
    this.showMenus = !this.showMenus;
    
    // Si se está mostrando y no hay datos, volver a cargar
    if (this.showMenus && (!this.menus || this.menus.length === 0)) {
      this.loadMenus();
    }
  }

  // Método para mostrar/ocultar el formulario de creación
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    
    // Si se cierra el formulario, resetearlo
    if (!this.showCreateForm) {
      this.resetCreateForm();
    }
  }

  // Método para enviar el formulario de creación
  onSubmitCreateMenu(): void {
    if (this.createMenuForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.createMenuForm.controls).forEach(key => {
        const control = this.createMenuForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    const formData = this.createMenuForm.value;
    
    // Asegurar que el precio sea un número
    const menuData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price), // Convertir a número
      category: formData.category.trim(),
      image: formData.image ? formData.image.trim() : '',
      available: formData.available || true
    };

    console.log("Datos del menú a crear:", menuData);
    console.log("Tipo de precio:", typeof menuData.price);

    this.menusService.createMenu(menuData).subscribe({
      next: (res: any) => {
        console.log("Menú creado exitosamente:", res);
        alert('¡Menú creado exitosamente! 🎉');
        
        // Resetear formulario y cerrar
        this.resetCreateForm();
        this.showCreateForm = false;
        
        // Recargar la lista de menús
        this.loadMenus();
        
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error completo al crear menú:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        
        if (error.status === 400) {
          alert('Error: Verifica que todos los datos sean correctos.');
        } else if (error.status === 500) {
          alert('Error del servidor: ' + (error.error?.message || 'Inténtalo más tarde.'));
        } else {
          alert('Error al crear el menú. Inténtalo de nuevo.');
        }
        
        this.isSubmitting = false;
      }
    });
  }

  // Método para resetear el formulario
  resetCreateForm(): void {
    this.createMenuForm.reset();
    this.createMenuForm.patchValue({
      available: true // Valor por defecto
    });
  }

  // Método para recargar menús
  loadMenus(): void {
    this.menusService.getAllMenus().subscribe({
      next: (res: any) => {
        this.menus = res.data || res;
        console.log("Menús cargados: ", this.menus);
      },
      error: (error) => {
        console.error("Error al cargar menús:", error);
        this.menus = [];
      }
    });
  }

  // Método para editar menú
  editMenu(menu: any): void {
    console.log("Editando menú:", menu);
    
    // Opción 1: Edición inline con prompt (simple y rápido)
    const newName = prompt('Nuevo nombre del menú:', menu.name);
    const newDescription = prompt('Nueva descripción:', menu.description);
    const newPrice = prompt('Nuevo precio:', menu.price.toString());
    const newCategory = prompt('Nueva categoría:', menu.category);
    
    if (newName !== null && newDescription !== null && newPrice !== null && newCategory !== null) {
      const updatedMenuData = {
        name: newName.trim(),
        description: newDescription.trim(),
        price: parseFloat(newPrice),
        category: newCategory.trim(),
        image: menu.image, // Mantener imagen existente
        available: menu.available // Mantener disponibilidad existente
      };

      this.menusService.updateMenu(menu._id, updatedMenuData).subscribe({
        next: (res: any) => {
          console.log("Menú actualizado:", res);
          alert('Menú actualizado correctamente');
          this.loadMenus(); // Recargar la lista para ver los cambios
        },
        error: (error) => {
          console.error('Error al actualizar menú:', error);
          alert('Error al actualizar el menú. Verifica los datos.');
        }
      });
    }
    
    // Opción 2: Para implementar después - navegar a página de edición
    // this.router.navigate(['/menu/edit', menu._id]);
  }

  // Método para eliminar menú
  deleteMenu(menuId: string): void {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este menú? Esta acción no se puede deshacer.');
    
    if (confirmDelete) {
      console.log("Eliminando menú con ID:", menuId);
      
      this.menusService.deleteMenu(menuId).subscribe({
        next: (res: any) => {
          console.log("Menú eliminado:", res);
          alert('Menú eliminado correctamente');
          this.loadMenus(); // Recargar la lista para ver los cambios
        },
        error: (error) => {
          console.error('Error al eliminar menú:', error);
          if (error.status === 404) {
            alert('El menú no fue encontrado. Puede que ya haya sido eliminado.');
          } else {
            alert('Error al eliminar el menú. Inténtalo de nuevo.');
          }
          // Recargar la lista en caso de error 404 para actualizar la vista
          if (error.status === 404) {
            this.loadMenus();
          }
        }
      });
    }
  }
  

}
