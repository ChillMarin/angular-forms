import { Component } from '@angular/core';

import { OnExit } from './../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit{

    onExit(){
    const rta = confirm('Estas seguro de salir? desde el componente');
    return rta
    }
}
