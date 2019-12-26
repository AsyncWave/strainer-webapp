import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../services/query.service';
import { AlertifyService } from 'projects/dashboard/src/app/services/alertify.service';
import { Router } from '@angular/router';
// import SampleJson from '../../../../../assets/data/particles.json';
declare var particlesJS: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  model: any = {};
  exist: boolean;
  constructor(private queryService: QueryService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    // console.log(SampleJson);
    particlesJS.load('particles-js', '../../../../../assets/data/particles.json', function() { console.log('callback - particles.js config loaded'); })
    localStorage.removeItem('queryId');
    localStorage.removeItem('tweet');
    this.model.screenname = 'nishan_cw';
    // tslint:disable-next-line:max-line-length
    this.model.query = 'New poll shows Trump lead intact after criticism of Megyn Kelly: Donald Trump in the news: An online... http://t.co/LVhrFMWIpD #politics';
    this.model.queryId = 90030072;
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
        }, error => {
          // console.log('responce', error);
          this.alertify.alert('Oh--ooh!', error, () => {});
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

    }, error => {
      // console.log('responce', error);
      this.alertify.alert('Oh--ooh!', error, () => {});
      // this.alertify.error(error);
    }, () => {
      this.router.navigate(['/home/dashboard']);
    });
  }
}
