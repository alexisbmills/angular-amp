import {
  Inject,
  ModuleWithProviders,
  NgModule,
  NgZone,
  Optional,
  Provider,
  RendererFactory2,
  SkipSelf
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { BrowserModule, EventManager, ɵSharedStylesHost } from '@angular/platform-browser';
import { AmpRendererFactory } from './amp-renderer-factory';
import { ɵServerRendererFactory2 } from '@angular/platform-server';
import { AmpSharedStylesHost } from './amp-shared-styles-host';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function ampRendererFactory(
  isAmpVersion: boolean,
  serverRendererFactory: RendererFactory2,
  eventManager: EventManager,
  ngZone: NgZone,
  document: any,
  defaultSharedHostStyles: ɵSharedStylesHost) {
  if (isAmpVersion) {
    const ampSharedStylesHost = new AmpSharedStylesHost(defaultSharedHostStyles);
    return new AmpRendererFactory(serverRendererFactory, eventManager, ngZone, document, ampSharedStylesHost);
  }
  return serverRendererFactory;
}

const providers: Provider[] = [
  AmpRendererFactory,
  {
    provide: RendererFactory2,
    useFactory: ampRendererFactory,
    deps: [
      [new Inject('AMP_CONFIG')],
      ɵServerRendererFactory2,
      EventManager,
      NgZone,
      [new Inject(DOCUMENT)],
      ɵSharedStylesHost
    ]
  }
];

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  providers
})
export class AmpServerModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmpServerModule,
      providers
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
      parentModule: AmpServerModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
