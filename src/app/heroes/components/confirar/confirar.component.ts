
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirar',
  templateUrl: './confirar.component.html',
  styles: [`
  `]
})
export class ConfirarComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<ConfirarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Heroe) { }

  ngOnInit(): void {

    console.log(this.data)
  }

  borrar(){
    this.dialogRef.close(true);
  }

    
  close(){
    this.dialogRef.close();
  }
}
