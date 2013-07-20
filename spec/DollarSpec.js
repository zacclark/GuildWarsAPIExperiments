describe("$", function() {
  it("includes a jquery-like library", function() {
      expect($("body").length).toEqual(1);
  });
});