import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MachineComponent} from './components/machine/machine.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/machine',
    pathMatch: 'full'
  }, {
    path: 'machine',
    component: MachineComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
