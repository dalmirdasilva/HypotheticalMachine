import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CpuComponent} from './components/cpu/cpu.component';
import {MemoryComponent} from './components/memory/memory.component';
import {OscillatorComponent} from './components/oscillator/oscillator.component';
import {StackComponent} from './components/stack/stack.component';
import {SettingsComponent} from './components/settings/settings.component';
import {STACK_SIZE_TOKEN} from './machine/stack';
import {MEMORY_SIZE_TOKEN} from './machine/memory';
import {MachineComponent} from './components/machine/machine.component';
import {OSCILLATOR_FREQUENCY_TOKEN} from './machine/oscillator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule, MatIconModule, MatSelectModule, MatSliderModule, MatTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {BasePipe} from './pipes/base.pipe';
import {DEFAULT_BASE_TOKEN} from './services/config.service';
import {PadPipe} from './pipes/pad.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {StandOutDirective} from './directives/stand-out.directive';
import {NATIVE_STORAGE_TOKEN} from './services/storage.service';
import {DragPositionMemoryDirective} from './directives/drag-position-memory.directive';

@NgModule({
  declarations: [
    AppComponent,
    CpuComponent,
    MemoryComponent,
    OscillatorComponent,
    StackComponent,
    SettingsComponent,
    MachineComponent,
    BasePipe,
    PadPipe,
    StandOutDirective,
    DragPositionMemoryDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    CdkTableModule,
    MatSelectModule,
    MatButtonToggleModule,
    DragDropModule,
    MatIconModule
  ],
  providers: [
    {provide: STACK_SIZE_TOKEN, useValue: 16},
    {provide: MEMORY_SIZE_TOKEN, useValue: 256},
    {provide: OSCILLATOR_FREQUENCY_TOKEN, useValue: 1},
    {provide: DEFAULT_BASE_TOKEN, useValue: 16},
    {provide: NATIVE_STORAGE_TOKEN, useValue: localStorage},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
