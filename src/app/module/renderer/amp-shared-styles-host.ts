import { ɵSharedStylesHost } from '@angular/platform-browser';

/**
 * This is the class for possibly overriding how styles are output e.g. component-name[ngcontent-c1]
 *
 */
export class AmpSharedStylesHost implements ɵSharedStylesHost {

  constructor(private delegate: ɵSharedStylesHost) {}

  addStyles(styles: string[]): void {
    return this.delegate.addStyles((styles));
  }

  onStylesAdded(additions: Set<string>): void {
    console.log(`AmpSharedStylesHost styles added ${additions}`);
    this.delegate.onStylesAdded(additions);
  }

  getAllStyles(): string[] {
    return this.delegate.getAllStyles();
  }
}