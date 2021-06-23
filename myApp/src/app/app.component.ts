import { Component } from '@angular/core';
import { NgxSoapService, ISoapMethod, Client, ISoapMethodResponse } from 'ngx-soap';
import { ServiceClient } from './service-client.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  intA: number | undefined;
  intB: number | undefined;
  loading: boolean =false;
  showDiagnostic: boolean = false;
  message: string | undefined;
  xmlResponse: string | undefined;
  jsonResponse: string | undefined;
  resultLabel: string | undefined;
  client!: Client;

  constructor(private soap: NgxSoapService, private serviceClient:ServiceClient) {
    this.soap.createClient('assets/calculator.wsdl')
      .then(client => {
        console.log('Client', client);
        this.client = client;
      })
      .catch(err => console.log('Error', err));
  }

  sum() {
    this.loading = true;
    const body = {
      intA: this.intA,
      intB: this.intB
    };

    this.serviceClient.getClientForWSDL('assets/calculator.wsdl').then(
      client => {
        console.log('Client', client);
        this.client = client;
        this.client.call('Add', body).subscribe(res => {
          this.xmlResponse = res.responseBody;
          this.message = res.result.AddResult;
          this.loading = false;
        }, err => console.log(err));

      }, err => console.log(err));
    ;

    this.serviceClient.getClientForWSDL('assets/test.wsdl').then(
     client => {
       console.log('Client', client);
        this.client = client;
        this.client.call('FahrenheitToCelsius', {"Fahrenheit":"200"}).subscribe(res => {
         console.log('res', res);
       }, err => console.log(err));

      }, err => console.log(err));
    ;
    //this.client.call('Add', body).subscribe(res => {
     // this.xmlResponse = res.responseBody;
     // this.message = res.result.AddResult;
      //this.loading = false;
    //}, err => console.log(err));

    // OR:
    // (<any>this.client).Add(body).subscribe(
    //   (res: ISoapMethodResponse) => {
    //     console.log('method response', res);
    //     this.xmlResponse = res.xml;
    //     this.message = res.result.AddResult;
    //     this.loading = false;
    //   },
    //   err => console.log(err)
    // );
  }

  subtract() {
    this.loading = true;
    const body = {
      intA: this.intA,
      intB: this.intB
    };
    (<any>this.client).Subtract(body).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        this.xmlResponse = res.xml;
        this.message = res.result.SubtractResult;
        this.loading = false;
      },
        (      err: any) => console.log(err)
    );
  }
}
