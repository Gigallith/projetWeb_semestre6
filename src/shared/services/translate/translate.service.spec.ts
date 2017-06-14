import { TestBed, inject } from "@angular/core/testing";

import { TranslateService } from "./translate.service";

describe("MessageService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateService]
    });
  });

  it("should ...", inject([TranslateService], (service: TranslateService) => {
    expect(service).toBeTruthy();
  }));
});
