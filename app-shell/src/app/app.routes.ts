import { loadRemoteModule } from '@angular-architects/module-federation';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'home',
    component: WebComponentWrapper,
    data: {
      type: 'manifest',
      remoteName: 'vue-app',
      exposedModule: './web-components',
      elementName: 'vue-element'
    } as WebComponentWrapperOptions
  },
  {
  path: '',
  loadComponent: () =>
       loadRemoteModule({
           type: 'manifest',
           remoteName: 'angular-app',
           exposedModule: './Component'
       })
      .then((m) =>  m.AppComponent),
  }
];
