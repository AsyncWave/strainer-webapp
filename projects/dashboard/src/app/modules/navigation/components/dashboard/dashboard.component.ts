import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardService } from 'projects/dashboard/src/app/services/dashboard.service';
import { AlertifyService } from 'projects/dashboard/src/app/services/alertify.service';
import { TweetForInitialCredibility } from 'projects/dashboard/src/app/models/TweetForInitialCredibility';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tweet: TweetForInitialCredibility = { tweet: 'null'};
  name: string;
  model: any = {};
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );
  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, private dashboardService: DashboardService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.tweet.tweet = localStorage.getItem('tweet');
    this.name = localStorage.getItem('name');
    // console.log('tweet', this.tweet.tweet);
    this.getInitialCredibility();
    this.getAutomatedAcc();
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

}
