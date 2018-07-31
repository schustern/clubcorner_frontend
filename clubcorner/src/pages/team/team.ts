import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Services} from '../../providers/trainer/trainer';
import {Team} from '../../Schema/team.schema';
import {Termin} from '../../Schema/termin.schema';
import {Person} from '../../Schema/person.schema';
import { PlayerInviteModalPage } from '../modals/player-invite-modal/player-invite-modal';
import { PlayerListModalPage } from '../modals/player-list-modal/player-list-modal';
import { CreateGameModalPage } from '../modals/create-game-modal/create-game-modal';
import { CreateTrainingModalPage } from '../modals/create-training-modal/create-training-modal';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import {HomePage} from "../home/home";
import {mannschaftszuordnung} from "../../Schema/mannschaftszuordnung.schema";
//import { Calendar } from "@ionic-native/calendar";

@Component({
  selector: 'page-team',
  templateUrl: 'team.html'
})
export class TeamPage implements OnInit {
  selectedItem: mannschaftszuordnung;
  icons: string[];
  items: Array<{title: string}>;


  alleSpieler: Person[];
  alleTermine: Termin[];

  constructor(public navCtrl: NavController, private emailComposer: EmailComposer, public navParams: NavParams,
              public modalCtrl: ModalController, public alertCtrl: AlertController, private _teamProv: Services) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('team');
  }

  ngOnInit() {
    this.getAllTermine();
    this.alleTermine = [];
  }

  /*openPlayerInviteModal() {
    let myModal = this.modalCtrl.create(PlayerInviteModalPage, {id: this.selectedItem.id});
    myModal.present();
};*/

  openPlayerListModal() {
    let myModal = this.modalCtrl.create(PlayerListModalPage, {data: this.selectedItem});
    myModal.present();
  };

  openCreateGameModal() {
    let myModal = this.modalCtrl.create(CreateGameModalPage, {data: this.selectedItem});
    myModal.present();
  };

  openCreateTrainingModal() {
    let myModal = this.modalCtrl.create(CreateTrainingModalPage);
    myModal.present();
  };


  openPlayerInviteModal() {
    let myModal = this.modalCtrl.create(PlayerInviteModalPage, {id: this.selectedItem.mannschafts_ID});
    myModal.present();
  }

  openDeleteTeamModal() {
    const confirm = this.alertCtrl.create({
      title: 'Manschaft auflösen',
      message: 'Sind sie sich sicher, dass sie die Mannschaft auflösen wollen?',
      buttons: [
        {
          text: 'Ablehnen',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Zustimmen',
          handler: () => {
            console.log('Agree clicked');
            this.deleteTeam();
          }
        }
      ]
    });
    confirm.present();
  }

 /* openCalendar(){

  }*/
//-----------------------------------------------------------------
//-----------------------------------------------------------------

  deleteTeam(){
    this._teamProv.deleteTeam(/*ID des zu löschenden Teams*/ this.selectedItem.mannschafts_ID).subscribe(
      (data) => {
        this.navCtrl.pop();
        this.navCtrl.push(HomePage);
        console.log(data);
      },
      error => console.log(error)
    )
  }

  getAllTermine() {
    this._teamProv.getTermin(this.selectedItem.mannschafts_ID).subscribe(
      (data) => {
        console.log(data);
        this.alleTermine = data['termine'] as Termin[];
      },
      error => console.log(error)
    )
  }

  shareCode(code: string){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available){

      }
    });

    let email = {
      to: '',
      cc: '',
      subject: 'TeamApp: Einladung in eine Mannschaft',
      body: 'Hallo, du wurdest in eine Mannschat eingeladen. Nutze den folgenden Code um dem Team beizutreten: ' + code,
      isHtml: true
    };

    this.emailComposer.open(email);
  }



//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Aller Spieler einer Mannschaft anzeigen - Runde Button unten links
 /*getAllPlayer(){
    this._teamProv.getPlayerInTeam(this.selectedItem.id).subscribe(
      (data) => {
        console.log(data);
        this.alleSpieler = data as Person[];
      },
      error => console.log(error)
    )
  }*/

}
