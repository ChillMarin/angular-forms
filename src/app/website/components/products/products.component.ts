import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/app/models/product.model';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
// install swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  //array con los productos del carrito
  myShoppingCart: Product[] = [];
  total = 0;
  //array con todos los productos
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input() set productId(productId: string | null) {
    if (productId) {
      this.onShowDetail(productId);
    }
  }
  @Output() loadMoreProducts: EventEmitter<string> = new EventEmitter<string>();

  showProductDetail = false;
  //variables del producto escogido en en el boton de "ver detalle"
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    },
  };
  //para definir status de las peticiones
  statusDetail: 'loading' | 'sucess' | 'error' | 'init' = 'init';

  //aqui se declaran los servicios que se usan en el componente
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    //console.log('onAddToCart',product);
    // this.myShoppingCart.push(product);
    //reduce() es un metodo de los arreglos que recibe una funcion para sumar los valores de un arreglo
    //this.total = this.myShoppingCart.reduce((acc, product) => acc + product.price, 0);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    //en caso de que den dos veces al botón solo ocultara los detalles(para no ir a darle al botón de cerrar)
    if (
      this.productChosen.id != '' &&
      this.productChosen.id == id &&
      this.showProductDetail == true
    ) {
      this.showProductDetail = true;
      return;
    }

    //en caso de que seleccionen el mismo producto ya no hay necesidad de hacer la petición de nuevo y solo vuelve a mostrar el panel
    if (
      this.productChosen.id != '' &&
      this.productChosen.id == id &&
      this.showProductDetail == false
    ) {
      this.showProductDetail = true;
      return;
    }
    //en caso que le den al botón de ver detalles mientras ya están abiertos los de un producto diferente cierra el panel de detalles
    if (
      this.productChosen.id != '' &&
      this.productChosen.id != id &&
      this.showProductDetail == true
    ) {
      this.showProductDetail = false;
    }
    // manera vieja de manipular errores pero en es la que usan en el curso de platzi
    // this.productsService.getProduct(id)
    // .subscribe(data => {
    //   console.log('product',data);
    //   //guardamos el producto en la varible
    //   this.productChosen = data;
    //   this.toggleProductDetail();
    //   this.statusDetail = 'sucess';
    //   //ahora maneramos los errores si es que hay
    // }, error => {
    //   console.log('error', error);
    //   this.statusDetail = 'error';
    // });
    //La manera correcta actual de manejar errores con rxjs

    this.productsService.getProduct(id).subscribe({
      next: (resp) => {
        console.log('product', resp);
        //guardamos el producto en la varible
        this.productChosen = resp;
        this.showProductDetail = true;
        this.statusDetail = 'sucess';
      },
      error: (error) => {
        console.log('error', error);
        this.statusDetail = 'error';
      },
    });
  }

  // readAndUpdate(id:string){
  //   this.productsService.getProduct(id)
  //   .pipe(
  //     // Asi quedaria cuando seria 1 sola peticion pero para el ejemplo que queremos hacer varias peticiones evitando un call back hell quedaria con varios switchMap
  //     // switchMap((product)=>{return this.productsService.update(product.id,{title:'change'})})
  //     switchMap((product)=>this.productsService.update(product.id,{title:'change'})),
  //     // Todos estos reciben una respuesta la cual podria seguir concatenando pero aqui lo dejo asi como para ver como quedaria
  //     switchMap((product)=>this.productsService.update(product.id,{description:'change'})),
  //     switchMap((product)=>this.productsService.update(product.id,{price:25})),)
  //     .subscribe(data => {
  //       console.log('update', data);
  //     });
  //     //ahora el zip lo que nos define es tener 2 peticiones comprimidas en una sola y nos devuelve un arreglo con los resultados de las 2 peticiones en el orden que se hicieron las peticiones y no en el orden que llegan las respuestas de las peticiones es recomendable colocar toda esta logica en un servicio y no en el componente
  //     zip(
  //       this.productsService.getProduct('id'),
  //       this.productsService.update('id',{title:'change'})
  //     )
  //     .subscribe(response=>{
  //       const read = response[0];
  //       const update = response[1];
  //     })
  // }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      images: ['https://picsum.photos/200/300'],
      price: 100,
      description: 'Nuevo producto',
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      console.log('new product created', data);
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'change title',
      price: 1000,
      description: 'change description',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  // updateProduct() {
  //   const changes = {
  //     title: 'Nuevo Producto',
  //   }

  //   const id = this.product.id;
  //   this.productsService.update(id, changes).subscribe(
  //     (product: Product) => {
  //       const productId = this.products.findIndex(p => p.id === id);
  //       this.products[productId] = product;
  //       this.product = product;
  //      console.log(product);
  //   });

  // }

  deleteProduct() {
    const id = this.productChosen.id;
    // aqui no se usa data porque no nos devuelve nada asi que solo ejecutamos en el preview de la peticion se recibe es un booleano
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.productChosen = {
        id: '',
        title: '',
        images: [],
        price: 0,
        description: '',
        category: {
          id: '',
          name: '',
        },
      };
      this.toggleProductDetail();
    });
  }

  // loadMore(){
  //   this.productsService.getAllProducts(this.limit,this.offset)
  //   .subscribe(data => {
  //     //Aqui como estamos es cargando mas usamos concat para concatener los nuevos productos con los que ya teniamos pero genera un nuevo array y no modifica el array original
  //     this.products = this.products.concat(data);
  //     this.offset +=this.limit;
  //   })
  // }a

  loadMore() {
    this.loadMoreProducts.emit();
  }
}
