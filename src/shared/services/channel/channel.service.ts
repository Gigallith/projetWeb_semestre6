import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {ReplaySubject} from "rxjs/ReplaySubject";
import {ChannelModel} from "../../models/ChannelModel";
import {THREADPAGE, URLSERVER} from "../../constants/urls";
import {MessageListComponent} from "../../../app/messages/message-list/message-list.component";
import {MessageService} from "../message/message.service";
import {Subject} from "rxjs/Subject";
/**
 * Created by Enzo on 12/06/2017.
 */


@Injectable()
export class ChannelService {

  public static MAX_CHANNEL = 20;
  private url: string;

  private finalTabList: ChannelModel[];

  public channelList$: ReplaySubject<ChannelModel[]>;
  private channeltitre = new Subject<String>();
  public titre$ = this.channeltitre.asObservable();

  constructor(private http: Http, private messageService: MessageService) {
    this.url = URLSERVER;
    this.channelList$ = new ReplaySubject(1);
    this.channelList$.next([new ChannelModel(1)]);
    this.finalTabList = [];
  }

  private resetTab() {
    this.finalTabList = [];
  }

  public getChannels(route: string, pageNum: number) {

    this.extractChannelByPage(route, pageNum).subscribe((response) => {
        this.finalTabList = this.finalTabList.concat(response.json());

        if (response.json().length === ChannelService.MAX_CHANNEL) {
          const tmp = pageNum + 1;
          this.getChannels(route, tmp);
        } else {
          this.channelList$.next(this.finalTabList);
          this.messageService.setChannelID(this.selectFirstChannel());
        }
      }
    );
  }

  private extractChannelByPage(route: string, pageNum: number): Observable<Response> {
    const finalUrl = this.url + route + pageNum;

    return this.http.get(finalUrl);
  }

  extractAndUpdateChannelList() {
    this.resetTab();

    this.getChannels(THREADPAGE, 0);
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

  public selectFirstChannel(): number {
    return this.finalTabList[0].id;
  }

  changeChatTitre(titre: String) {
    this.channeltitre.next(titre);
  }
}
