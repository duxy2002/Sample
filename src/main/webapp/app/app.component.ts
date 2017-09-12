import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private _iconRegistry: MdIconRegistry,
                private _domSanitizer: DomSanitizer) {
        this._iconRegistry.addSvgIconInNamespace('assets', 'jd-logo-landscape',
            this._domSanitizer.bypassSecurityTrustResourceUrl('content/icons/jd-logo-landscape.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'jd-logo-portrait',
            this._domSanitizer.bypassSecurityTrustResourceUrl('content/icons/jd-logo-landscape.svg'));
        // this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
        //     this._domSanitizer.bypassSecurityTrustResourceUrl('content/icons/covalent.svg'));
        // this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
        //     this._domSanitizer.bypassSecurityTrustResourceUrl('content/icons/covalent-mark.svg'));
        // this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
        //     this._domSanitizer.bypassSecurityTrustResourceUrl('content/icons/teradata-ux.svg'));
        // this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
        //     this._domSanitizer.bypassSecurityTrustResourceUrl('content/icons/appcenter.svg'));
        // this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
        //     this._domSanitizer.bypassSecurityTrustResourceUrl('content/icons/listener.svg'));
        // this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
        //     this._domSanitizer.bypassSecurityTrustResourceUrl('content/icons/querygrid.svg'));
    }
}
