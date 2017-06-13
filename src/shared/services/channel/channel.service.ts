import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

import {ReplaySubject, Subscription} from "rxjs";
import {ChannelModel} from "../../models/ChannelModel";
import {URLSERVER} from "../../constants/urls";
/**
 * Created by Enzo on 12/06/2017.
 */

@Injectable()
export class ChannelService {

  private url: string;

  public static MAX_CHANNEL = 20;

  private finalTabList : ChannelModel[];

  public channelList$: ReplaySubject<ChannelModel[]>;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.channelList$ = new ReplaySubject(1);
    this.channelList$.next([new ChannelModel(1)]);
    this.finalTabList = [];
  }

  private resetTab(){
    this.finalTabList.length = 0;
  }

  public getChannels(route: string, pageNum : number){

    this.extractChannelByPage(route, pageNum).subscribe((response) =>
      {
        this.finalTabList = this.finalTabList.concat(response.json());

        if (response.json().length == ChannelService.MAX_CHANNEL){
          let tmp = pageNum + 1;
          this.getChannels(route, tmp);
        } else {
          this.channelList$.next(this.finalTabList);
        }
      }
    );
  }

  private extractChannelByPage(route: string, pageNum : number) : Observable<Response>{
    const finalUrl = this.url + route + pageNum;

    return this.http.get(finalUrl);
  }

  extractAndUpdateChannelList(route : string) {
    this.resetTab();

    this.getChannels(route, 0);
  }

  private extractChannelAndGetChannels(response : Response, route : string){
    this.extractAndUpdateChannelList(route);

    return new ChannelModel(
      response.json().id,
      response.json().name,
      response.json().createdAt,
      response.json().updatedAt
    )
  }
}
