import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';

@Component({
  selector: 'app-ClientsManagement',
  templateUrl: './ClientsManagement.component.html',
  styleUrls: ['./ClientsManagement.component.scss']
})
export class ClientsManagementComponent implements OnInit {

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