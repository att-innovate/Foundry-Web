import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TextBlockComponent } from './text-block/text-block.component';
import { FIconComponent } from './f-icon/f-icon.component';
import { TestComponent } from './test/test.component';
import { BffModule } from './bff/bff.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ToolbarComponent,
    TextBlockComponent,
    FIconComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BffModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
