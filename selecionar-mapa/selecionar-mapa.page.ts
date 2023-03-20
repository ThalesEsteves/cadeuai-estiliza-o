import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-selecionar-mapa',
  templateUrl: './selecionar-mapa.page.html',
  styleUrls: ['./selecionar-mapa.page.scss'],
})
export class SelecionarMapaPage {

  constructor() { }

  async checkPermission() {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }

    return false;
  };

  async startScan() {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const ionContent = document.querySelector('ion-content');
    if (ionContent) {
      ionContent.classList.remove('scanner-active');
    }

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  };

  async stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    const ionContent = document.querySelector('ion-content');
    if (ionContent) {
      ionContent.classList.remove('scanner-active');
    }
  };

  ionViewWillLeave(){
    this.stopScan()
  }

}
