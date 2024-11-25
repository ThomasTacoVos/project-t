// app-routing.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ThreeSceneComponent } from './three-scene/three-scene.component';

// Define the routes for the app
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'animationTest', component: ThreeSceneComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }  // Default redirect
];
