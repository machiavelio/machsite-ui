import { TestBed } from "@angular/core/testing";

import { ApiAccessService } from "./api-access.service";

describe("ApiAccessService", () => {
  let service: ApiAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAccessService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
