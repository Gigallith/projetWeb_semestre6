import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

import {ReplaySubject} from "rxjs";
import {ChannelModel} from "../../models/ChannelModel";
import {URLSERVER} from "../../constants/urls";
/**
 * Created by Enzo on 12/06/2017.
 */

@Injectable()
export class ChannelService {

  private url: string;

  public static MAX_CHANNEL = 20;

  public channelList$: ReplaySubject<ChannelModel[]>;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.channelList$ = new ReplaySubject(10);
    this.channelList$.next([new ChannelModel(1)]);
  }

  public getChannels(route: string, pageNum : number) : ChannelModel[]{
    const finalUrl = this.url + route + pageNum;

    let finalTabChannel: ChannelModel[];
    finalTabChannel = [];

    console.log(this.extractChannelByPage(route, 1).length);

    this.http.get(finalUrl)
      .subscribe((response) => {
          finalTabChannel = finalTabChannel.concat(response.json());

          /*
          if (response.json().length == ChannelService.MAX_CHANNEL){

            pageNum = pageNum + 1;
            finalTabChannel = finalTabChannel.concat(this.getChannels(route, pageNum));

            return finalTabChannel;
          } else {

            return finalTabChannel;
          }
          */
        }
      );

    return finalTabChannel;
  }

  private extractChannelByPage(route: string, pageNum : number) : ChannelModel[] {
    const finalUrl = this.url + route + pageNum;

    let finalTabChannel: ChannelModel[] = [];

    this.http.get(finalUrl)
      .subscribe((response) => {
        finalTabChannel = finalTabChannel.concat(response.json());

        console.log("hop");

        console.log("Nb : " + finalTabChannel.length);
        console.log("hop");
      });

    console.log("Nb : " + finalTabChannel.length);

    return finalTabChannel;
  }


  extractAndUpdateChannelList(response: Response) {
    const channelList = response.json() || [];

    this.channelList$.next(channelList);
  }

  private extractChannelAndGetChannels(response : Response, route : string){
    this.http.get(route).subscribe((response) => this.extractAndUpdateChannelList(response));

    return new ChannelModel(
      response.json().id,
      response.json().name,
      response.json().createdAt,
      response.json().updatedAt
    )
  }
}
