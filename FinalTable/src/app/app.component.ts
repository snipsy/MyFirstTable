import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Deklaracija varijabli komponente

  dataSource: TableDataSource;
  tableData: AgentsData[]; // uglate zagrade označavaju listu

  // Prvo definiram stupce i za svaki data koji sadrži - Angular Material
 displayedColumns: string[] = ['name', 'surname', 'regularWorkingDays', 'workingSundays','totalHours', 'sundayHours', 'payment'];

 // Definiram podatke u tablici ELEMENT_DATA - mogu i ne moraju biti hardcodani u ovom slučaju jedan objekt iz klase je hardcodan
 ELEMENT_DATA: AgentsData[] = // Naziv ELEMENT_DATA je lista objekata iz klase AgentsData (u ovom slučaju zbog uglatih zagrada)
 [{surname: 'Balaž', name: 'Ivan', regularWorkingDays: 120, workingSundays: 20, totalHours:20, sundayHours:20, payment:20}];   

// Navedene varijable koje ce drzati podatke iz forme
name: string;
surname: string;
regularWorkingDays: number;
workingSundays: number;
totalHours: number;
sundayHours: number;
payment: number;
nameCreation: string;

// Metoda (click) - event binding iz HTML koda - ispisuje/izračunava unesene/spremljene varijable te ih pusha u listu
onButtonClick(){
  // Definirani-općeniti "objekt" (u ovom slučaju agent) iz klase AgentsData
  let agent: AgentsData = 
  { name: this.name, 
    surname: this.surname, 
    regularWorkingDays: this.regularWorkingDays,
    workingSundays: this.workingSundays,
    totalHours: (this.regularWorkingDays * 8) + (this.workingSundays * 8),
    sundayHours: this.workingSundays * 8,
    payment: this.calculatePayment(this.workingSundays, this.regularWorkingDays) // Payment se izračunava pomoću zadane metode calculatePayment(unutar zagrade moraju biti navedene varijable koje će metoda koristiti)
    // payment: (this.workingSundays * 8 * 30) + (this.regularWorkingDays * 8 * 20 ) - još jedan od mogućih načina izračuna 
  };
 
  // Push metoda dodaje "objekt/agenta" sa unesenim vrijednostima/varijablama u tablicu
  this.ELEMENT_DATA.push(agent); 

  // ovo je opcenito bitno za tablicu (kao i ondaj dio ispod TableDataSource, kao i ono što si definirao pod datasource pod table tagom u htmlu)
  this.tableData = this.ELEMENT_DATA;
  this.dataSource = new TableDataSource(this.tableData);
 }

 // primjer sa dodavanjem svoje metode za izračun payment-a
 calculatePayment(workingSundays: number, regularWorkingDays: number): number{
   let sundayHoursPayment: number = workingSundays * 8 * 30;
   let regularWorkingHoursPayment: number = regularWorkingDays * 8 * 20;
   let payment = sundayHoursPayment + regularWorkingHoursPayment;
   return payment;   
 }

  getRandomInt(max): number {  // kako na random vraća samo 0 i 1  moramo ga postaviti na maxsimalnu duljinu stringa koji se unosi - na ovaj način
    return Math.floor(Math.random() * Math.floor(max));
  }

  // funkcija koja vraca random slovo iz stringa koji se upisuje u polje name
  oneLetter(name: string): string {
    let lettersOfName = [];
    let i = 0; // brojač u for petlji
    let randomNumber: number = 0;
    for (i = 0; i < name.length; i++) {  // brojač počinje od nule od duljine stringa(name.lenght) unesenog pod "name" i povećava ga za jedan svaki puta kada prođe petlju do mogućeg MAX
      lettersOfName.push(name[i]);
      console.log("Unutar for petlje", i, lettersOfName); // ovaj console log je ustvari test da vidimo hoće li primiti ispravnu varijablu?!
    }
  
    randomNumber = this.getRandomInt(name.length);
  
    console.log("Nasumican broj je ", randomNumber)
    console.log("Slovo na nasumicnom mjestu je ", lettersOfName[randomNumber]);

    this.nameCreation = lettersOfName[randomNumber];

    return lettersOfName[randomNumber];
  }
 
}

// Stupci u tablici
export class AgentsData {
  name: string;
  surname: string;
  regularWorkingDays: number;
  workingSundays: number;
  totalHours: number;
  sundayHours: number;
  payment: number;
}

 

export interface Data { }
export class TableDataSource extends DataSource<any> {

  constructor(public _data: any) {
    super();
  }

  connect(): Observable<Data[]> {
    return Observable.of(this._data);
  }

  disconnect(): void {    // No-op
  }

}
