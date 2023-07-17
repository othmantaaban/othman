import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {
  @Input() link: any;
  @Input() name: any;
  @ViewChild("ctn") content : IonContent
  constructor() { }

  ngOnInit() {
    document.querySelector("#ctn").innerHTML = `<iframe scrolling="no" src="${this.link}" width="100%" height="100%"></iframe>`
  }

}
