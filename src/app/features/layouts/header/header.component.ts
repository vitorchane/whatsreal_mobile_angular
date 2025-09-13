import { Component } from '@angular/core';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logoPath = 'assets/icon/mitel.png';
  brazilLogoPath = 'assets/icon/brazil.png';
  canadaLogoPath = 'assets/icon/canada.png';

  changeLang(lang: string) {
    // redireciona para o build do idioma
    window.location.href = '/' + lang + '/index.html';
  }
}
