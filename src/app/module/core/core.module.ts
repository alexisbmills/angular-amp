import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderContextService } from './service/render-context/render-context.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: []
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        RenderContextService,
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
