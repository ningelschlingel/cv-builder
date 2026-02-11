import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CvBuilder } from "./cv-builder/cv-builder";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CvBuilder],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cv-builder');
}
