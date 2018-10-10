import {
  Inject,
  Injectable,
  NgZone,
  Renderer2,
  RendererFactory2,
  RendererType2,
  ViewEncapsulation
} from '@angular/core';
import { AmpRenderer } from './amp.renderer';
import { EventManager, ɵflattenStyles, ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { ɵAnimationRendererFactory as AnimationRendererFactory } from '@angular/platform-browser/animations';
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
import { RenderContext } from '../core/service/render-context/render-context.service';
import { AmpEmulatedEncapsulationRenderer } from './amp-emulated-encapsulation-renderer';

/**
 * RendererFactory2 implementation
 *
 * This mimics the
 */
@Injectable()
export class AmpRendererFactory implements RendererFactory2 {

  private rendererByCompId = new Map<string, Renderer2>();

  private defaultAmpRenderer: Renderer2;

  constructor(private delegate: RendererFactory2,
              private eventManager: EventManager,
              private ngZone: NgZone,
              @Inject(DOCUMENT) private document: any,
              private sharedStylesHost: SharedStylesHost) {

  }

  createRenderer(hostElement: any, type: RendererType2 | null): Renderer2 {
    if (!this.defaultAmpRenderer) {
      const rendererDelegate = this.delegate.createRenderer(hostElement, type);
      this.defaultAmpRenderer = new AmpRenderer(rendererDelegate, this.eventManager, this.ngZone, this.document, this.sharedStylesHost);
    }
    if (!hostElement || !type) {
      return this.defaultAmpRenderer;
    }

    switch (type.encapsulation) {
      case ViewEncapsulation.Native:
      case ViewEncapsulation.Emulated: {
        let renderer = this.rendererByCompId.get(type.id);
        if (!renderer) {
          const emulatedRendererDelegate = this.delegate.createRenderer(hostElement, type);
          renderer = new AmpEmulatedEncapsulationRenderer(
            emulatedRendererDelegate,
            this.eventManager,
            this.ngZone,
            this.document,
            this.sharedStylesHost,
            type
          );
          this.rendererByCompId.set(type.id, renderer);
        }
        (<AmpEmulatedEncapsulationRenderer>renderer).removeHost(hostElement);
        return renderer;
      }
      default: {
        if (!this.rendererByCompId.has(type.id)) {
          // const styles = ɵflattenStyles(type.id, type.styles, []);
          // this.sharedStylesHost.addStyles(styles);
          this.rendererByCompId.set(type.id, this.defaultAmpRenderer);
        }
        return this.defaultAmpRenderer;
      }
    }
  }

  begin() {
    return this.delegate.begin();
  }

  end() {
    return this.delegate.end();
  }

  whenRenderingDone?(): Promise<any> {
    return this.delegate.whenRenderingDone();
  };
}