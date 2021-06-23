import { Injectable } from '@angular/core';
import { NgxSoapService, ISoapMethod, Client, ISoapMethodResponse } from 'ngx-soap';
@Injectable({
  providedIn: 'root'
})
export class ServiceClient {

  client!: Client;
  constructor(private soap: NgxSoapService) {
  }

  getClientForWSDL(wsdlPath: string) : Promise<any> {
    //this.soap.createClient('assets/calculator.wsdl)

    return this.soap.createClient(wsdlPath);
      
  }
}
