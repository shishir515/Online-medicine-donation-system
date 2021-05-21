
import { Injectable } from '@angular/core';
import { NGO } from './ngo.model';
@Injectable({
  providedIn: 'root'
}
)

export class NgoService {
  formData: NGO;
  ngo: NGO[] = [
    {name: "SOS", vId: 123, email: "sos@gmail.com", country: "Nepal", city: "Kathmandu", type: "Non-commerical"},
    {name: "Maiti Nepal", vId: 123, email: "sos@gmail.com", country: "Nepal", city: "Kathmandu", type: "Non-commerical"},
    {name: "Red Cross", vId: 123, email: "sos@gmail.com", country: "Nepal", city: "Kathmandu", type: "Non-commerical"}
  ];

  getNgo() {
    return this.ngo.slice();
  }

}
