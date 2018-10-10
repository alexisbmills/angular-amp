import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @ViewChild('ampInput') inputRef: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setAttribute(this.inputRef.nativeElement, 'data-amp-bind-value', 'something', '');
  }
}
