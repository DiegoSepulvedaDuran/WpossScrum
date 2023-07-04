import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public nameE:String  | null ;
  public charge:String  | null ;
  searchTerm: any;


  constructor(private router: Router) {
    this.nameE=localStorage.getItem('name');
    this.charge=localStorage.getItem('charge');

  }
  onSearch() {
    // Redirigir a la ruta del sidebar y pasar el término de búsqueda como parámetro
    this.router.navigate(['/sidebar', { searchTerm: this.searchTerm }]);
  }
  ngOnInit(): void {

    let body = document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/js/main.js';
    script.async = true;
    script.type = 'text/javascript';
    body.appendChild(script);

  }
  logout():void{
    localStorage.clear();
  //  this.router.navigate([''])
  }




}
