import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { map, Observable, BehaviorSubject, first } from 'rxjs';
import { MyValidators } from 'src/app/shared/utils/validators';

import { Category } from 'src/app/models/category.model';
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

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  form!: FormGroup;
  mostrarBarra = false;
  progressBar = 0;
  status = false;
  progresbarObs = new BehaviorSubject<number>(0);
  progresbarObs$ = this.progresbarObs.asObservable();

  categories: Category[] = [];
  existeCategoria: boolean | null = false;

  categoryId:string ='';

  constructor(
    private formBuilder: FormBuilder,
    // poder hacer rediccion
    private router: Router,
    private categoriesService: CategoriesService,
    private storage: Storage,
    //poder leer los parametros que vienen en la ruta
    private route:ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // nos suscribimos a la ruta y estamos escuchandola cada vez que cambie por eso nos subscribimos
    this.route.params.subscribe((params: Params)=>{
      this.categoryId = params['id'];
      if(this.categoryId){
        this.getCategory();
      }
    })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      //como tenemos 1 sola validacion asincrona no es necesario meterlas en un array y le tengo que mandar el servicio para que lo pueda ejectutar
      name: [
        '',
        [Validators.required, Validators.minLength(4)],
        MyValidators.validateCategory(this.categoriesService),
      ],
      image: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      //console.log(this.form.value);
      if(this.categoryId){
        this.updateCategory();
      } else{
        this.createCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory(){
    const category: Category = this.form.value;
    this.categoriesService.createCategory(category).subscribe((newCategory)=>{
      console.log('newCategory',newCategory);
      this.router.navigate(['./cms/grid']);
    })
  }

  private updateCategory(){
    const category: Category = this.form.value;
    this.categoriesService.updateCategory(this.categoryId,category).subscribe((newCategory)=>{
      console.log('newCategory',newCategory);
      this.router.navigate(['./cms/grid']);
    })
  }

  private getCategory(){
    this.categoriesService.getCategory(this.categoryId).subscribe((category)=>{
      // enviamos toda la informacion de la categoria al formulario, solo tiene que tener los mismos valores que nuestro from group
      this.form.patchValue(category);
      console.log('categoryQSolicite',category);
      //tambien esta la opcion de setear los valores 1x1 o personalizados haciendo lo siguiente
      //this.form.get('name')?.setValue(category.name);
      //this.form.get('image')?.setValue(category.image);
    })
  }

  uploadFile(event: any) {
    const image = event.target.files[0];
    const name = image.name;
    //const ref = this.storage.ref(name);
  }

  uploadFile2(event: any) {
    this.mostrarBarra = true;

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
        this.updateprogress(progreso);
        console.log('Upload is ' + progreso + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            this.progressBar =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        this.status = true;
        this.progressBar = 100;
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.imageField?.setValue(downloadURL);
          // tuve que llamar a este metodo para que me mostrara la imagen justo apenas se subiera porque no se porque la mostraba luego que le daba al boton de enviar formulario
          this.getImage(name);
        });
      }
    );

    // visualizamos si nos dio un error o salio todo bien
    // task
    //   .then((response) => {
    //     console.log(response);
    //     this.getImage(name);
    //   })
    //   .catch((error) => console.log(error));
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
      }
    });
  }

  getAllCategories() {
    this.categoriesService
      .getAll()
      .pipe(first())
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  checkCategory(name: string): boolean {
    this.getAllCategories();
    this.categories.filter((category) => {
      if (category.name == name) {
        return true;
      }
      return false;
      console.log('category', category);
    });
    return false;
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  updateprogress(progreso: number) {
    this.progressBar = progreso;
  }
}
