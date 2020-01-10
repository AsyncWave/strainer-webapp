import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../services/query.service';
import { AlertifyService } from 'projects/dashboard/src/app/services/alertify.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

declare var particlesJS: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  model: any = {};
  exist: boolean;
  year = new Date().getFullYear();
  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private queryService: QueryService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    particlesJS.load('particles-js', '../../../../../assets/data/particles.json');
    localStorage.removeItem('queryId');
    localStorage.removeItem('tweet');
    localStorage.removeItem('name');
    this.model.screenname = 'nishan_cw';
    // tslint:disable-next-line:max-line-length
    this.model.query = 'New poll shows Trump lead intact after criticism of Megyn Kelly: Donald Trump in the news: An online... http://t.co/LVhrFMWIpD #politics';
    this.model.queryId = '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  sendQuery() {
    this.model.screenname = this.model.screenname.replace(/@/g, '').toLowerCase();
    this.queryService.checkExists(this.model.screenname).subscribe(res => {
      // tslint:disable-next-line:no-string-literal
      if (this.model.screenname === res[0]['screen_name'].toLowerCase()) {
        this.exist = true;
        this.alertify.message('User found!');
        this.queryService.sendQuery(this.model).subscribe(responce => {
          // console.log('responce', responce);
          this.alertify.success(responce.message);
          // tslint:disable-next-line:max-line-length
          this.alertify.alert('Heads up!', ' Please copy this query Id > ' + responce.queryId + ', check back again later and provide it at \'CHECK IN\'', () => {});
          this.model.queryId = responce.queryId;
        }, error => {
          // console.log('responce', error);
          this.alertify.alert('Oh--ooh!', error.message, () => {});
          if (error.queryId != null) {
            this.model.queryId = error.queryId;
          }
          // this.alertify.error(error);
        });
      }
    }, error => {
      this.exist = false;
      this.alertify.error(error);
    });
  }

  checkIn() {
    this.queryService.getQuery(this.model.queryId).subscribe(responce => {
      // console.log('responce', responce);
      this.alertify.success('Tweet found');
      this.alertify.message(responce[0].query);
      localStorage.setItem('queryId', this.model.queryId);
      localStorage.setItem('tweet', responce[0].query);
      localStorage.setItem('name', responce[0].name);

    }, error => {
      // console.log('responce', error);
      this.alertify.alert('Oh--ooh!', error, () => {});
      // this.alertify.error(error);
    }, () => {
      this.router.navigate(['/home/dashboard']);
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {}
