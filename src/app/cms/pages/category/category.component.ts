import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { map } from 'rxjs';
//firebase
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  StorageReference,
} from '@angular/fire/storage';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  form!: FormGroup;
  progressBar=0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoriesService: CategoriesService,
    private storage: Storage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      //console.log(this.form.value);
      this.categoriesService
        .createCategory(this.form.value)
        .subscribe((category) => {
          console.log(category, 'Marcel');
          // Segun el profe es para que luego de creada la category redireccione a la lista de categoria q aun no tenemos desarrollada
          //this.router.navigate(['./cms/category']);
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadFile(event: any) {
    const image = event.target.files[0];
    const name = image.name;
    //const ref = this.storage.ref(name);
    
  }

  uploadFile2(event: any) {
    const image = event.target.files[0];
    const name = image.name;

    //ubicacion de a deonde vamos a subir esa imagen, (Primer parametro es la conexion de db, 2do parametro a donde vamos a subir la imagen, si no hay un carpeta images, el la crea)
    const imgRef = ref(this.storage, `imagenes/${name}`);
    // en donde se va subir, y cual es la imagen a subir y listo
    const task = uploadBytes(imgRef, image);

    // visualizamos si nos dio un error o salio todo bien
    task
      .then((response) => {
        console.log(response);
        this.getImage(name);
      })
      .catch((error) => console.log(error));
  }

  getImage(nameImage: string) {
    // aqui le decimos que nos busque en la url que queremos es decir en el nombre de la carpeta
    const imgRef = ref(this.storage, 'imagenes');
    // con el listAll nos devuelve un array de objetos
    listAll(imgRef).then(async rta => {
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

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }
}
