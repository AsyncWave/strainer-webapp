import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ProfileService } from 'projects/dashboard/src/app/services/profile.service';
import { AlertifyService } from 'projects/dashboard/src/app/services/alertify.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private alertify: AlertifyService) { }
  // username: string;
  user: any = {};
  year = new Date().getFullYear();
  tweetItems: any;
  credibility: any;
  agreement_score: any;
  stars: number[] = [1, 2 ];
  selectedValue: number;
  
  getUserProfile(username) {
    // this.selectedValue = star;
    if (username == '' || username== null)
      username = 'BBCNews';

    this.profileService.getUserProfileService(username).subscribe(res => {
      this.user = res;
      this.tweetItems = this.user.replies;
      this.credibility = this.user.credibility;
      this.startAnimationForLineChart();
      
      // console.log(res);

    }, error => {
      // console.log('responce', error);
      this.alertify.alert('Oh--ooh!', error, () => { });
      // this.alertify.error(error);
    });
    
  }
  startAnimationForLineChart() {
    this.agreement_score = this.user.agreement_score*100
    var agreementScoreChart = new Chartist.Pie('.ct-chart', {
      series: [this.agreement_score, 100-this.agreement_score],
      // labels: ['Positive', 'Negative'],
     
    }, {
      donut: true,
      donutWidth: 30,
      donutSolid: true,
      startAngle: 0,
      showLabel: true
    });

    agreementScoreChart.on('draw', function (data) {
      if (data.type === 'slice') {
        // Get the total path length in order to use for dash array animation
        var pathLength = data.element._node.getTotalLength();

        // Set a dasharray that matches the path length as prerequisite to animate dashoffset
        data.element.attr({
          'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
        });

        // Create animation definition while also assigning an ID to the animation for later sync usage
        var animationDefinition = {
          'stroke-dashoffset': {
            id: 'anim' + data.index,
            dur: 1000,
            from: -pathLength + 'px',
            to: '0px',
            easing: Chartist.Svg.Easing.easeOutQuint,
            // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
            fill: 'freeze'
          }
        };

        // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation


        // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
        data.element.attr({
          'stroke-dashoffset': -pathLength + 'px'
        });

        // We can't use guided mode as the animations need to rely on setting begin manually
        // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
        data.element.animate(animationDefinition, false);
      }
    });

    // For the sake of the example we update the chart every time it's created with a delay of 8 seconds


  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    let username = localStorage.getItem('name');
    // console.log(username);
    this.getUserProfile(username);
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */





    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    // const dataCompletedTasksChart: any = {
    //     labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    //     series: [
    //         [230, 750, 450, 300, 280, 240, 200, 190]
    //     ]
    // };

    //    const optionsCompletedTasksChart: any = {
    //         lineSmooth: Chartist.Interpolation.cardinal({
    //             tension: 0
    //         }),
    //         low: 0,
    //         high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //         chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    //     }

    //     var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    //     // start animation for the Completed Tasks Chart - Line Chart
    //     this.startAnimationForLineChart(completedTasksChart);



    //     /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    //     var datawebsiteViewsChart = {
    //       labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    //       series: [
    //         [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

    //       ]
    //     };
    //     var optionswebsiteViewsChart = {
    //         axisX: {
    //             showGrid: false
    //         },
    //         low: 0,
    //         high: 1000,
    //         chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    //     };
    //     var responsiveOptions: any[] = [
    //       ['screen and (max-width: 640px)', {
    //         seriesBarDistance: 5,
    //         axisX: {
    //           labelInterpolationFnc: function (value) {
    //             return value[0];
    //           }
    //         }
    //       }]
    //     ];
    //     var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //     //start animation for the Emails Subscription Chart
    //     this.startAnimationForBarChart(websiteViewsChart);
  }

}
