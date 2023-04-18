import { Component } from '@angular/core';
import { Client } from './models/Client';
import { RequestsControllerService } from './services/RequestsController.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NewProtoFrontend';

  constructor(
    private HTTPClient: RequestsControllerService<Client>
  ){}

  ngOnInit(){
    
    let client: Client = {
      name: "David",
      surname: "Cruz",
      phone: "34324324",
      type: "dfdf",
      email: "fdfd@gmail.com",
      address: "dfsdfsdf"
    }
    // this.setClient(client);
    this.getClients();
  }

  getClients(): void {
    this.HTTPClient.getElement("Client").subscribe(
      (clients: Client[]) => {
        console.log(clients);
      }
    )
  } 

  setClient(client: Client): void {
    this.HTTPClient.saveElement("Client", client).subscribe(
      (client: Client) => {
        console.log(client);
      }
    )
  }
}
