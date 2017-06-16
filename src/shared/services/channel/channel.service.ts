import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {ReplaySubject} from "rxjs/ReplaySubject";
import {ChannelModel} from "../../models/ChannelModel";
import {THREADPAGE, URLSERVER} from "../../constants/urls";
import {MessageService} from "../message/message.service";
import {Subject} from "rxjs/Subject";
/**
 * Created by Enzo on 12/06/2017.
 */


@Injectable()
export class ChannelService {

  private url: string;

  private finalTabList: ChannelModel[];
  private pageNum: number;

  public channelList$: ReplaySubject<ChannelModel[]>;
  private channeltitre = new Subject<String>();
  public titre$ = this.channeltitre.asObservable();

  constructor(private http: Http, private messageService: MessageService) {
    this.url = URLSERVER;
    this.channelList$ = new ReplaySubject(1);
    this.channelList$.next([new ChannelModel(1)]);
    this.finalTabList = [];
    this.pageNum = 0;
  }


  public incrPagenum() {
    this.pageNum = this.pageNum + 1;

  }

  public decrPagenum() {
    this.pageNum = this.pageNum - 1;
  }

  public getPagenum(): number {
    return this.pageNum;
  }

  public isEmptyList(): boolean {
    return (this.finalTabList.length === 0);
  }


  private resetTab() {
    this.finalTabList = [];
  }

  public getChannels(route: string, pageNum: number) {

    this.extractChannelByPage(route, pageNum).subscribe((response) => {
        this.finalTabList = this.finalTabList.concat(response.json());

        this.channelList$.next(this.finalTabList);
      }
    );
  }

  private extractChannelByPage(route: string, pageNum: number): Observable<Response> {
    const finalUrl = this.url + route + pageNum;
    return this.http.get(finalUrl);
  }

  extractAndUpdateChannelList() {
    this.resetTab();

    this.getChannels(THREADPAGE, this.pageNum);
  }

  private extractChannelAndGetChannels(response: Response, route: string) {
    this.http.get(route).subscribe((newResponse) => this.extractAndUpdateChannelList());

    return new ChannelModel(
      response.json().id,
      response.json().name,
      response.json().createdAt,
      response.json().updatedAt
    );
  }

  public createChannel(route: string, channel: ChannelModel) {
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});

    const body = {
      "name": channel.name
    };

    const finalPath = this.url + route;

    this.http.post(finalPath, body, options)
      .subscribe(
        (response) => this.extractChannelAndGetChannels(response, route)
        , (err) => {
          if (err.status === 409) {
            alert("The channel " + channel.name + " already exists");
          }
        });
  }

  changeChatTitre(titre: String) {
    this.channeltitre.next(titre);
  }

  public getFirstChannel(route: string, pageNum: number) {

    this.extractChannelByPage(route, pageNum).subscribe((response) => {
        this.messageService.setChannelID(response.json()[0].id);
      }
    );
  }
}
