import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../services/query.service';
import { AlertifyService } from 'projects/dashboard/src/app/services/alertify.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  model: any = {};
  exist: boolean;
  constructor(private queryService: QueryService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.model.screenname = 'nishan_cw';
    this.model.query = 'hello';
  }

  sendQuery() {
    this.model.screenname = this.model.screenname.replace(/@/g, '').toLowerCase();
    this.queryService.checkExists(this.model.screenname).subscribe(res => {
      // tslint:disable-next-line:no-string-literal
      if (this.model.screenname === res['data'][0]['screen_name'].toLowerCase()) {
        this.exist = true;
        this.alertify.message('User found!');
        this.queryService.sendQuery(this.model).subscribe(responce => {
          // console.log('responce', responce);
          this.alertify.success(responce);
        }, error => {
          this.alertify.error(error);
        });
      }
    }, error => {
      this.exist = false;
      this.alertify.error(error);
    });
  }

}
