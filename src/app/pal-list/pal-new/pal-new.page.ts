import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Pals } from 'src/app/models/pals.model';
import { PalService } from 'src/app/services/pal.service';

@Component({
  selector: 'app-pal-new',
  templateUrl: './pal-new.page.html',
  styleUrls: ['./pal-new.page.scss'],
})
export class PalNewPage implements OnInit {
  public pal!: Pals;

  types: any[] = [
    { label: 'Neutral', imageUrl: '../../../assets/img/types/neutral.png' },
    { label: 'Dark', imageUrl: '../../../assets/img/types/dark.png' },
    { label: 'Dragon', imageUrl: '../../../assets/img/types/dragon.png' },
    { label: 'Ice', imageUrl: '../../../assets/img/types/ice.png' },
    { label: 'Fire', imageUrl: '../../../assets/img/types/fire.png' },
    { label: 'Grass', imageUrl: '../../../assets/img/types/grass.png' },
    { label: 'Ground', imageUrl: '../../../assets/img/types/ground.png' },
    { label: 'Electric', imageUrl: '../../../assets/img/types/electric.png' },
    { label: 'Water', imageUrl: '../../../assets/img/types/water.png' }
  ];

  
  types2: any[] = [
    { label: 'None' },
    ...this.types
  ];

  works: any[] = [
    { label: 'Kindling', checked: false, imageUrl: "../../../assets/img/works/kindling.png" },
    { label: 'Planting', checked: false, imageUrl: "../../../assets/img/works/planting.png" },
    { label: 'Handiwork', checked: false, imageUrl: "../../../assets/img/works/handiwork.png" },
    { label: 'Lumbering', checked: false, imageUrl: "../../../assets/img/works/lumbering.png" },
    { label: 'Medicine Production', checked: false, imageUrl: "../../../assets/img/works/medicine_production.png" },
    { label: 'Transporting', checked: false, imageUrl: "../../../assets/img/works/transporting.png" },
    { label: 'Watering', checked: false, imageUrl: "../../../assets/img/works/watering.png" },
    { label: 'Generating Electricity', checked: false, imageUrl: "../../../assets/img/works/generating_electricity.png" },
    { label: 'Gathering', checked: false, imageUrl: "../../../assets/img/works/gathering.png" },
    { label: 'Mining', checked: false, imageUrl: "../../../assets/img/works/mining.png" },
    { label: 'Cooling', checked: false, imageUrl: "../../../assets/img/works/cooling.png" },
    { label: 'Farming', checked: false, imageUrl: "../../../assets/img/works/farming.png" }
  ];

  constructor(
    private palService: PalService,
    private toastCtrl: ToastController,
    private router : Router
  ) { }

  ngOnInit() {
    this.pal = new Pals()
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'New pal registered',
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/pal']);
      }, 2000);
    });
  }

  add() {
    if (this.isPalValid(this.pal)) {
      this.palService.saveNewPal(this.pal).subscribe(() => {
        this.pal = new Pals();
        this.presentToast();
      });
    } else {
      this.presentErrorToast('Please fill in all fields.');
    }
  }

  isPalValid(pal: Pals): boolean {
    return (
      pal.name !== '' &&
      pal.number !== 0 &&
      pal.description !== '' &&
      pal.type1 !== '' &&
      pal.type2 !== ''
    );
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
