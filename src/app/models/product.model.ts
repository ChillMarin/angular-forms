export interface Category{
  id: string;
  name: string;
}


export interface Product{
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

// Omit es un tipo de dato que se usa para omitir propiedades de un objeto y crear un nuevo tipo de dato con las propiedades que se quieren omitir y que se quieren usar en el nuevo tipo de dato que se crea con Omit y se usa en el DTO (Data Transfer Object)como convencion para crear un nuevo producto y no tener que crear un nuevo objeto con todas las propiedades de Product y solo usar las que se necesitan
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

//Asi quedan las interfaces opciones pero no usamos esta para no repetir codigo
// export interface UpdateProductDTO{
//   title?: string;
//   price?: number;
//   images?: string[];
//   description?: string;
//   categoryId?: Category;
// }

// El partial lo que define es que todo lo extendemos es opcional es decir le incluye el ? a cada propiedad
export interface UpdateProductDTO extends Partial<CreateProductDTO>{ }
