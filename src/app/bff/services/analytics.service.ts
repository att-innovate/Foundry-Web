import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export const LOG_ERROR: string = "error";
export const LOG_WARNING: string = "warning";
export const LOG_INFO: string = "info";
export const LOG_FATAL: string = "fatal";

export const ANALYTIC_QUERY_EVENT: string = "router_query";
export const ANALYTIC_REPORT_EVENT: string = "report";
export const ANALYTIC_BACK_TO_LEGACY: string = "back_to_legacy";
export const ANALYTIC_FILE_DIFF: string = "file_diff";

export interface IAnalyticLog {
  tags?:string,
  app: string,
  app_version: string,
  type: string,
  message: string;
  name?: string,
  user?: any,
  payload?: any,
  session: string,
  section: string,
}



@Injectable()
export class AnalyticsService {
  baseUrl: string;// = "http://localhost:3000/api/";
  user: any = {};
  session: string = "";
  app: string = "cvaas";
  active: boolean;
  onNetwork: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `http://${window.location.hostname}:3000/api/`;
    //this.baseUrl = `http://mtn21cvaas02.mt.att.com:3000/api/`;
    this.active = true;
  }

  setNetwork(value: string) {
    this.onNetwork = value;
  }

  setApp(app: string) {
    this.app = app;
  }

  setAppUser(user: any) {
    this.user = user;
  }

  setSession(session: string) {
    this.session = session;
  }

  postPageLog(url: string, payload: any = "") {
    let log: IAnalyticLog = this.getNewLog()

    log.type = 'page';
    log.message = url;
    log.payload = payload;
    this.sendLog(log);
  }

  postBffBrain(message: string, payload: any = "") {
    // debugger;
    console.log('postBffBrain:' + message);
  }

  postFeedbackLog(message: string, payload: any = "",tags:string="") {
    let log: IAnalyticLog = this.getNewLog()

    log.type = 'feedback';
    log.message = message;
    log.payload = payload;
    log.tags = tags;
    this.sendLog(log);
  }

  postEventLog(eventType: string, payload: any = "") {
    let log: IAnalyticLog = this.getNewLog()

    log.type = "event"
    log.message = eventType;
    log.payload = payload;
    this.sendLog(log);
  }

  postLogInfo(message: string, payload: any = "") {
    let log: IAnalyticLog = this.getNewLog()

    log.type = "log"
    log.message = message;
    log.payload = payload;
    this.sendLog(log);
  }

  /* postLogFeedback(message: string, payload: any = "") {
    let log: IAnalyticLog = this.getNewLog()

    log.type = "feedback"
    log.message = message;
    log.payload = payload;
    this.sendLog(log);
  } */

  postLogAction(message: string, payload: any = "") {
    let log: IAnalyticLog = this.getNewLog()

    log.type = "action"
    log.message = message;
    log.payload = payload;
    this.sendLog(log);
  }

  postLogError(message: string, payload: any = "") {
    let log: IAnalyticLog = this.getNewLog()

    log.type = "error"
    log.message = message;
    log.payload = payload;
    this.sendLog(log);
  }

  postLogWarning(message: string, payload: any = '') {
    let log: IAnalyticLog = this.getNewLog()

    log.type = 'warning'
    log.message = message;
    log.payload = payload;
    this.sendLog(log);
  }

  getNewLog(): IAnalyticLog {
    return {
      session: this.session,
      app: this.app,
      app_version: '1',
      type: 'log',
      user: this.user,
      message: '',
      section: this.onNetwork
    }
  }

  private sendLog(log: IAnalyticLog) {

    if (this.active) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' })

      this.http.post(`${this.baseUrl}logs/`, log, { headers: headers }).subscribe(data => {

      }, error => {
        console.log(error);
        this.active = false;
      })

      //return obser;
    }
  }


}
