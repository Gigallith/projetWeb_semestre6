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

  /**
   * Method used when we want to refresh the channel list
   */
  extractAndUpdateChannelList() {
    this.resetTab();

    this.getChannels(THREADPAGE, this.pageNum);
  }

  /**
   * Method used to retrieve the channels on the current page
   *
   * @param route the url extension to retrieve the channel list
   * @param pageNum the page of the channel we want to retrieve
   */
  public getChannels(route: string, pageNum: number) {

    this.extractChannelByPage(route, pageNum).subscribe((response) => {
        this.finalTabList = response.json();

        this.channelList$.next(this.finalTabList);
      }
    );
  }

  /**
   * Method used to send a request to the API and it will return the response obtained
   *
   * @param route the url extension to retrieve the channel list
   * @param pageNum the page of the channel we want to enter
   * @returns {Observable<Response>} the obesrvable response from the API
   */
  private extractChannelByPage(route: string, pageNum: number): Observable<Response> {
    const finalUrl = this.url + route + pageNum;
    return this.http.get(finalUrl);
  }

  /**
   * Method used when the user wants to crate a new channel
   *
   * @param route the url extension to post a new channel on the API
   * @param channel the channel model the user wants to create
   */
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

  /**
   * Method used to refresh the channel list when the user created a new one
   *
   * @param response the response to the POST request (regarding the channel creation)
   * @param route the url extension to post a new channel on the API
   * @returns {ChannelModel} the new channel the user created
   */
  private extractChannelAndGetChannels(response: Response, route: string) {
    this.http.get(route).subscribe((newResponse) => this.extractAndUpdateChannelList());

    return new ChannelModel(
      response.json().id,
      response.json().name,
      response.json().createdAt,
      response.json().updatedAt
    );
  }

  /**
   * Method used to enter the first available channel when the user enter the application.
   *
   * @param route the url extension to retrieve the channel list
   * @param pageNum the page of the channel we want to enter (0 by default)
   */
  public getFirstChannel(route: string, pageNum: number) {
    this.extractChannelByPage(route, pageNum).subscribe((response) => {
        this.messageService.setChannelID(response.json()[0].id);
      }
    );
  }

  /**
   * Method used when the user wants to switch to the next channel page
   */
  public incrPagenum() {
    this.pageNum = this.pageNum + 1;

  }

  /**
   * Method used when the user wants to switch to the previous channel page
   */
  public decrPagenum() {
    this.pageNum = this.pageNum - 1;
  }

  /**
   * Current page number getter
   */
  public getPagenum(): number {
    return this.pageNum;
  }

  /**
   * Method that returns if the current channel list is empty or not
   *
   * @returns {boolean} true if the current channel list is empty. False otherwise
   */
  public isEmptyList(): boolean {
    return (this.finalTabList.length === 0);
  }

  /**
   * Method that reset the current channel list
   */
  private resetTab() {
    this.finalTabList = [];
  }

  /**
   * Method used when the user change the current channel. It will update the name displayed
   *
   * @param titre the name of the wanted channel
   */
  changeChatTitre(titre: String) {
    this.channeltitre.next(titre);
  }
}
