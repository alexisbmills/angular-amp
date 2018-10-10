import { NgZone, Renderer2, RendererStyleFlags2, RendererType2 } from '@angular/core';
import {
  EventManager,
  ɵSharedStylesHost as SharedStylesHost,
} from '@angular/platform-browser';

/**
 * The renderer, where can implement our own custom logic around DOM construction, or
 * delegate to default implementation.
 *
 */
export class AmpRenderer implements Renderer2 {

  readonly data: { [p: string]: any } = Object.create(null);

  destroyNode: null;

  constructor(
    private delegate: Renderer2,
    private eventManager: EventManager,
    private zone: NgZone,
    private document: any,
    private sharedStylesHost: SharedStylesHost,
  ) {
  }

  createElement(name: string, namespace?: string) {
    console.log(`creating ${name}`);
    return this.delegate.createElement(name, namespace);
  }

  addClass(el: any, name: string): void {
    console.log(`adding class ${name} to ${typeof el}`);
    return this.delegate.addClass(el, name);
  }

  appendChild(parent: any, newChild: any): void {
    return this.delegate.appendChild(parent, newChild);
  }

  createComment(value: string): any {
    return this.delegate.createComment(value);
  }

  createText(value: string): any {
    return this.delegate.createText(value);
  }

  destroy(): void {
    return this.delegate.destroy();
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {
    return this.delegate.insertBefore(parent, newChild, refChild);
  }

  listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => (boolean | void)): () => void {
    return this.delegate.listen(target, eventName, callback);
  }

  nextSibling(node: any): any {
    return this.delegate.nextSibling(node);
  }

  parentNode(node: any): any {
    return this.delegate.parentNode(node);
  }

  removeAttribute(el: any, name: string, namespace?: string | null): void {
    return this.delegate.removeAttribute(el, name, namespace);
  }

  removeChild(parent: any, oldChild: any): void {
    return this.delegate.removeChild(parent, oldChild);
  }

  removeClass(el: any, name: string): void {
    return this.delegate.removeClass(el, name);
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
    return this.delegate.removeStyle(el, style, flags);
  }

  selectRootElement(selectorOrNode: string | any): any {
    console.log(`Selecting root element ${selectorOrNode}`);
    return this.delegate.selectRootElement(selectorOrNode);
  }

  setAttribute(el: any, name: string, value: string, namespace?: string | null): void {
    console.log(`Setting attr ${name} value ${value} element ${el}`);
    return this.delegate.setAttribute(el, name, value, namespace);
  }

  setProperty(el: any, name: string, value: any): void {
    console.log(`Setting prop ${name} value ${value} element ${el}`);
    return this.delegate.setProperty(el, name, value);
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
    return this.delegate.setStyle(el, style, value, flags);
  }

  setValue(node: any, value: string): void {
    return this.delegate.setValue(node, value);
  }
}