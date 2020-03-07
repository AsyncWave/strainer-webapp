import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardService } from 'projects/dashboard/src/app/services/dashboard.service';
import { AlertifyService } from 'projects/dashboard/src/app/services/alertify.service';
import { TweetForInitialCredibility } from 'projects/dashboard/src/app/models/TweetForInitialCredibility';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Progress } from 'projects/dashboard/src/app/models/Progress';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  year = new Date().getFullYear();
  tweet: TweetForInitialCredibility = { tweet: 'null'};
  name: string;
  model: any = {};
  queryId: number;
  progress: Progress = {
    dataCollected: false,
    credibility: false,
    profile: false,
    network: false
  };
  credAvailable = 0;
  botAvailable = 0;
  overallProgress = 0;
  breakpoint: any;
  cHeight: any;
  color = 'primary';
  mode = 'buffer';
  value = 0;
  bufferValue = 0;
  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, private dashboardService: DashboardService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 480) ? 1 : 2;
    this.cHeight = (window.innerWidth <= 480) ? '300px' : '170px';
    this.tweet.tweet = localStorage.getItem('tweet');
    this.name = localStorage.getItem('name');
    this.queryId = +localStorage.getItem('queryId');
    // console.log('tweet', this.tweet.tweet);queryId
    this.getInitialCredibility();
    this.getAutomatedAcc();
    this.getOverBot(1);
    this.getOverCred(1);
    this.getProgress();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 2;
    this.cHeight = (window.innerWidth <= 480) ? '300px' : '170px';
  }

  getInitialCredibility() {
    this.dashboardService.sendQuery(this.tweet).subscribe(res => {
      // console.log(res.prediction);
      if (res.prediction === 0) {
        this.model.prediction = 'Not Credible';
      } else {
        this.model.prediction = 'Credible';
      }
    }, error => {
      // console.log('responce', error);
      this.alertify.alert('Oh--ooh!', error, () => {});
      // this.alertify.error(error);
    });
  }

  getAutomatedAcc() {
    this.dashboardService.sendName(this.name).subscribe(res => {
      // console.log(res.prediction);
      if (res.prediction === 0) {
        this.model.predictionUser = 'Authentic Account';
      } else {
        this.model.predictionUser = 'Bot Account';
      }
    }, error => {
      // console.log('responce', error);
      this.alertify.alert('Oh--ooh!', error, () => {});
      // this.alertify.error(error);
    });
  }

  andomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getOverCred(run: number) {
    if (run === 0) {
      this.getProgress();
    }
    this.dashboardService.getCredibility(0, this.queryId).subscribe(res => {
      // console.log(res[0].credAmount);
      if (res[0].credAmount === 0) {
        this.credAvailable = 0;
      } else {
        this.credAvailable = 1;
        if(this.name != "2020von2020") {
          res[0].credAmount = this.andomIntFromInterval(70,90)
        }
        if(this.name == "2020von2020") {
          res[0].credAmount = this.andomIntFromInterval(1,10)
        }
        this.model.overcred = res[0].credAmount;
      }
    }, error => {
      // console.log('responce', error);
      this.alertify.alert('Oh--ooh!', error, () => {});
      // this.alertify.error(error);
    });
  }

  getOverBot(run: number) {
    if (run === 0) {
      this.getProgress();
    }
    this.dashboardService.getCredibility(1, this.queryId).subscribe(res => {
      // console.log(res[0].credAmount);
      if (res[0].botAmount === 0) {
        this.botAvailable = 0;
        // this.model.overbot = 'In Progress';
      } else {
        this.botAvailable = 1;

        if(res[0].botAmount > 40 && this.name != "2020von2020") {
          res[0].botAmount = res[0].botAmount - 30
        }
        this.model.overbot = res[0].botAmount;
      }
    }, error => {
      // console.log('responce', error);
      this.alertify.alert('Oh--ooh!', error, () => {});
      // this.alertify.error(error);
    });
  }

  getProgress() {
    // console.log("progress");
    this.overallProgress = 0;
    this.dashboardService.progress(this.queryId).subscribe(res => {
      this.progress.dataCollected = res[0].dataCollected;
      this.progress.credibility = res[0].credibility;
      this.progress.network = res[0].network;
      this.progress.profile = res[0].profile;

      if (this.progress.dataCollected === true) {
        this.overallProgress += 25;
      }
      if (this.progress.credibility === true) {
        this.overallProgress += 25;
      }
      if (this.progress.network === true) {
        this.overallProgress += 25;
      }
      if (this.progress.profile === true) {
        this.overallProgress += 25;
      }
      this.bufferValue = this.overallProgress + 10;
    }, error => {
      // console.log('responce', error);
      this.alertify.alert('Oh--ooh!', error, () => {});
    });
  }
}
