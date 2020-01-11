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
  tweet: TweetForInitialCredibility = { tweet: 'null'};
  name: string;
  model: any = {};
  queryId: number;
  progress: Progress = {
    dataCollected: false,
    credibility: false,
    profile: false,
    network: false,
  };
  overallProgress = 0;

  color = 'primary';
  mode = 'buffer';
  value = 0;
  bufferValue = 0;
  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, private dashboardService: DashboardService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.tweet.tweet = localStorage.getItem('tweet');
    this.name = localStorage.getItem('name');
    this.queryId = +localStorage.getItem('queryId');
    // console.log('tweet', this.tweet.tweet);queryId
    this.getInitialCredibility();
    this.getAutomatedAcc();
    this.getProgress();
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

  getProgress() {
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
