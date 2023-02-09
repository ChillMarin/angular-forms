import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { MyValidators } from 'src/app/shared/utils/validators';
import { CategoriesService } from 'src/app/services/categories.service';
//firebase
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  StorageReference,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Category } from 'src/app/models/category.model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  form!: FormGroup;
  urlImagen ="";
  //listado de categorias
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    //private storage: AngularFireStorage
    private storage: Storage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      console.log(product);
      // product.images = [
      //   this.urlImagen,
      // ]
      // this.productsService.create(product)
      // .subscribe((newProduct) => {
      //   console.log(newProduct);
      //   this.router.navigate(['/cms/product']);
      // });
    }
  }

  uploadFile(event: any) {
    const image = event.target.files[0];
    const name = image.name;

    //ubicacion de a deonde vamos a subir esa imagen, (Primer parametro es la conexion de db, 2do parametro a donde vamos a subir la imagen, si no hay un carpeta images, el la crea)
    const imgRef = ref(this.storage, `imagenes/${name}`);
    // en donde se va subir, y cual es la imagen a subir y listo
    const task = uploadBytesResumable(imgRef, image);
    //pruebas
    // para ver el progreso de la subida
    task.on(
      'state_changed',
      (snapshot) => {
        // en el snapshot podemos ver el progreso de la subida
        const progreso =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progreso + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.imageField?.setValue(downloadURL);
          // tuve que llamar a este metodo para que me mostrara la imagen justo apenas se subiera porque no se porque la mostraba luego que le daba al boton de enviar formulario
          this.getImage(name);
        });
      }
    );
  }

  getImage(nameImage: string) {
    // aqui le decimos que nos busque en la url que queremos es decir en el nombre de la carpeta
    const imgRef = ref(this.storage, 'imagenes');
    // con el listAll nos devuelve un array de objetos
    listAll(imgRef).then(async (rta) => {
      //console.log(rta);
      //obtenemos el array y buscamos el item que estamos necesitamos
      const itemActual: StorageReference | undefined = rta.items.find(
        (item) => item.name == nameImage
      );
      // si existe el item dame la url del item
      if (itemActual) {
        // obtengo el link de descarga de esa imagen
        const url = await getDownloadURL(itemActual);
        this.imageField?.setValue(url);
        console.log(url);
        this.urlImagen=url;
      }
    });
  }

  private getCategories() {
    this.categoriesService.getAll()
    .subscribe((data) => {
      this.categories = data;
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  get nameField() {
    return this.form.get('title');
  }

  get imageField() {
    return this.form.get('images');
  }

}
