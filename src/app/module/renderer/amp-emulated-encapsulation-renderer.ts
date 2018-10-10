import { NgZone, Renderer2, RendererType2 } from '@angular/core';
import {
  EventManager,
  ɵSharedStylesHost as SharedStylesHost,
  ɵshimContentAttribute,
  ɵshimHostAttribute
} from '@angular/platform-browser';
import { AmpRenderer } from './amp.renderer';

/**
 * For rendering components with ViewEncapsulation.Native/Emulated
 *
 * This implementation attempts to 'undo' the appending of nghost attributes from the base implementation
 */
export class AmpEmulatedEncapsulationRenderer extends AmpRenderer {

  private contentAttr: string;

  private hostAttr: string;

  constructor(
    delegate: Renderer2,
    eventManager: EventManager,
    zone: NgZone,
    document: any,
    sharedStylesHost: SharedStylesHost,
    private component: RendererType2
  ) {
    super(delegate, eventManager, zone, document, sharedStylesHost);
    const componentId = 's' + component.id;
    this.contentAttr = ɵshimContentAttribute(componentId);
    this.hostAttr = ɵshimHostAttribute(componentId);
  }

  /**
   * Attempt to undo EmulatedEncapsulationServerRenderer2.applyToHost
   */
  removeHost(element: any) {
    super.removeAttribute(element, this.hostAttr, '');
  }
}