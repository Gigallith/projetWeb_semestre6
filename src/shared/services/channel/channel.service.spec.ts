import {inject, TestBed} from "@angular/core/testing";

import {ChannelService} from "./channel.service";
/**
 * Created by Enzo on 12/06/2017.
 */

describe("ChannelService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelService]
    });
  });

  it("should ...", inject([ChannelService], (service: ChannelService) => {
      expect(service).toBeTruthy();
    })
  );
});
