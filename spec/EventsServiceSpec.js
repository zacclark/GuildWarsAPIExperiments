describe("GWE.EventsService", function() {
  describe("#new", function () {
    it("returns an instantiated events service", function () {
      var service = new GWE.EventsService();
    });
  });

  describe("#getWorlds", function () {
    var service;

    beforeEach(function () {
      jasmine.Ajax.useMock();
      service = new GWE.EventsService();
    });

    it("queries the api for the world list", function () {
      service.getWorlds({});

      var request = mostRecentAjaxRequest();
      expect(request).not.toBeNull();
      expect(request.url).toEqual("https://api.guildwars2.com/v1/world_names.json");
      expect(request.method).toEqual("GET");
    });

    xdescribe("when successful", function() {
      // figure out why jasmine ajax isn't working here
      it("calls its success callback with the array of world names", function () {
        var wasCalled = false;

        service.getWorlds({
          success: function (worlds) {
            wasCalled = true;
            expect(worlds.length).toEqual(4);
            expect(worlds[0].id).toEqual("1010");
            expect(worlds[0].name).toEqual("Ehmry Bay");
          }
        });

        var request = mostRecentAjaxRequest();
        console.log(request);
//        request.response({
//          status: 200,
//          responseText: '[ {"id":"1010","name":"Ehmry Bay"}, {"id":"1018","name":"Northern Shiverpeaks"}, {"id":"1002","name":"Borlis Pass"}, {"id":"1008","name":"Jade Quarry"} ]'
//        });

        expect(wasCalled).toEqual(true);
      });
    });
  });
});