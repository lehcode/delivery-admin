'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('admin app', function () {


  it('should automatically redirect to / when location hash/fragment is empty', function () {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('index', function () {

    beforeEach(function () {
      browser.get('index.html#!/');
    });


    it('should render login page when user navigates to /', function () {
      expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 1/);
    });

  });


  // describe('view2', function () {
	//
  //   beforeEach(function () {
  //     browser.get('index.html#!/view2');
  //   });
	//
	//
  //   it('should render view2 when user navigates to /view2', function () {
  //     expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 2/);
  //   });
	//
  // });
});
