import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// install swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    images:[],
    price: 0,
    description: '',
    category: {
      id: '',
      name: ''
    }
  };

   //aqui se declaran los servicios que se usan en el componente
  constructor(private storeService: StoreService, private productsService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    //Como la solicitud es asincrona, se usa el metodo subscribe para recibir la respuesta
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    })
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
    //en caso de que den dos veces al botón solo ocultara los detalles(para no ir a darle al botón de cerrar)
    if(this.productChosen.id != '' && this.productChosen.id == id && this.showProductDetail==true){
      this.showProductDetail = false;
      return;
    }

    //en caso de que seleccionen el mismo producto ya no hay necesidad de hacer la petición de nuevo y solo vuelve a mostrar el panel
    if(this.productChosen.id != '' && this.productChosen.id == id && this.showProductDetail==false){
      this.showProductDetail = true;
      return;
    }
    //en caso que le den al botón de ver detalles mientras ya están abiertos los de un producto diferente cierra el panel de detalles
    if(this.productChosen.id != '' && this.productChosen.id != id && this.showProductDetail==true){
      this.showProductDetail = false;
    }

    this.productsService.getProduct(id)
    .subscribe(data => {
      console.log('product',data);
      //guardamos el producto en la varible
      this.productChosen = data;
      this.toggleProductDetail();
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      images: ['https://picsum.photos/200/300'],
      price: 100,
      description: 'Nuevo producto',
      categoryId: 2
    }
    this.productsService.create(product).subscribe(data => {
      console.log('new product created', data);
      this.products.unshift(data);
    })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'change title',
      price: 1000,
      description: 'change description'

    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
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



}
