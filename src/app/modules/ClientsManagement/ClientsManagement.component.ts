import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/models/Client.interface';
import { RequestsControllerService } from 'src/app/services/RequestsController.service';

@Component({
  selector: 'app-ClientsManagement',
  templateUrl: './ClientsManagement.component.html',
  styleUrls: ['./ClientsManagement.component.scss']
})
export class ClientsManagementComponent implements OnInit {

  constructor(
    private HTTPClient: RequestsControllerService<IClient>
  ){}

  ngOnInit(){
    
    let client: IClient = {
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
      (clients: IClient[]) => {
        console.log(clients);
      }
    )
  } 

  setClient(client: IClient): void {
    this.HTTPClient.saveElement("Client", client).subscribe(
      (client: IClient) => {
        console.log(client);
      }
    )
  }

}
