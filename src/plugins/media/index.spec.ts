import * as Media from "./index";
import { BehaviorSubject } from "@reactivex/rxjs";
import { Element, ElementResponse, CollectionResponse} from "../viwiPlugin";


describe("Service", () => {

  it("should have an id", (done:DoneFn) => {
    var s = new Media.Service();
    expect(typeof s.id).toEqual('string');
    done();
  });

  it("should exist", (done:DoneFn) => {
    var s = new Media.Service();
    expect(typeof s.name).toEqual('string');
    done();
  });

  it("should provide a list of resources", (done:DoneFn) => {
    var s = new Media.Service();
    expect(Array.isArray(s.resources)).toBeTruthy();
    done();
  });
});

describe("Renderers resource", () => {
  var r:Media.Renderers
  var RENDERERID:string = 'd6ebfd90-d2c1-11e6-9376-df943f51f0d8';

  beforeAll((done:DoneFn) => {
    var s = new Media.Service();
    r = new Media.Renderers(s);
    done();
  });

  it("should not find an arbitrary element", (done:DoneFn) => {
    expect(r.getElement('123').data).toBeUndefined();
    done();
  });

  it("should hold a renderer", (done:DoneFn) => {
    r.getElement(RENDERERID).data.subscribe((element) => {
      expect(element).toBeDefined();
    });
    done();
  });

  it("should hold a renderer called Netflux", (done:DoneFn) => {
    let renderers = r.getResource().data;
    expect(renderers).toBeDefined;
    expect(renderers.length).not.toEqual(0);
    let stpd = renderers.filter((el) => {
      return (el.getValue().data.name === "Netflux") ? el : undefined;
    });
    expect(stpd[0]).toBeDefined();
    done();
  });

  it("should hold a renderer called stpd", (done:DoneFn) => {
    let renderers = r.getResource().data;
    expect(renderers).toBeDefined;
    expect(renderers.length).not.toEqual(0);
    let stpd = renderers.filter((el) => {
      return (el.getValue().data.name === "stpd") ? el : undefined;
    });
    expect(stpd[0]).toBeDefined();
    done();
  });

  it("should change the shuffle state", (done:DoneFn) => {
    let values = ['off', 'on'];
    for (var index = 0; index < values.length; index++) {
      let value = values[index];
      r.updateElement(RENDERERID,{shuffle:value});
      expect(r.getElement(RENDERERID).data.getValue().data.shuffle).toEqual(value);
    }
    done();
  });

  it("should NOT change the shuffle state for invalid values", (done:DoneFn) => {
    r.updateElement(RENDERERID,{shuffle:'off'});
    expect(r.getElement(RENDERERID).data.getValue().data.shuffle).toEqual('off');
    r.updateElement(RENDERERID,{shuffle:'someInvalidValue'});
    expect(r.getElement(RENDERERID).data.getValue().data.shuffle).not.toEqual('someInvalidValue');
    expect(r.getElement(RENDERERID).data.getValue().data.shuffle).toEqual('off');
    done();
  });

  it("should change the repeat state", (done:DoneFn) => {
    let values = ['off', 'one', 'all'];
    for (var index = 0; index < values.length; index++) {
      let value = values[index];
      r.updateElement(RENDERERID,{repeat:value});
      expect(r.getElement(RENDERERID).data.getValue().data.repeat).toEqual(value);
    }
    done();
  });

  it("should NOT change the repeat state for invalid values", (done:DoneFn) => {
    r.updateElement(RENDERERID,{repeat:'off'});
    expect(r.getElement(RENDERERID).data.getValue().data.repeat).toEqual('off');
    r.updateElement(RENDERERID,{repeat:'someInvalidValue'});
    expect(r.getElement(RENDERERID).data.getValue().data.repeat).not.toEqual('someInvalidValue');
    expect(r.getElement(RENDERERID).data.getValue().data.repeat).toEqual('off');
    done();
  });
})

