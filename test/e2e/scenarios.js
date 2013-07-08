/*global describe:true, it: true, beforeEach: true, expect: true, browser: true*/

'use strict';

describe('todo app', function () {
  beforeEach(function () {
    browser().navigateTo('/');
  });

  describe('tasks page', function () {
    it('should display the correct route', function () {
      expect(browser().location().path()).toBe('/tasks');
    });

    it('should set autofocus to new task textbox', function () {
      expect(element('#new-task:focus').count()).toBeTruthy();
    });

    it('should load 3 task items per page', function (done) {
      expect(repeater('#task-list li').count()).toBe(3);
    });
  });
});
