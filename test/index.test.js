import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import jsdom from 'jsdom';
import sinon from 'sinon';
import {
  emptyDom,
  testElm,
  ButtonComponent,
  DecoratedButton,
  WrappedButton,
} from './testUtil';
import withStyles from '../src';

describe('index.js:', () => {
  const cache = {
    get: sinon.stub(),
    set: sinon.stub(),
    delete: sinon.stub(),
  };
  const csjs = {
    getCss: sinon.spy(),
  };

  before(() => {
    const document = jsdom.jsdom(emptyDom);
    global.document = document;
    global.window = document.defaultView;
  });

  afterEach(() => {
    cache.get.reset();
    cache.set.reset();
    cache.delete.reset();
    csjs.getCss.reset();
    withStyles.__ResetDependency__('cache');
    withStyles.__ResetDependency__('csjs');
  });

  after(() => {
    delete global.document;
    delete global.window;
  });

  describe('withStyles', () => {
    it('should return a valid React component that renders (decorator)', () => {
      expect(ReactTestUtils.isElement(<DecoratedButton />)).to.be.true;

      const rendered = ReactTestUtils.renderIntoDocument(<DecoratedButton />);
      expect(ReactTestUtils.isCompositeComponent(rendered)).to.be.true;
    });

    it('should return a valid React component that renders (wrapped)', () => {
      expect(ReactTestUtils.isElement(<ButtonComponent />)).to.be.true;
      expect(ReactTestUtils.isElement(<WrappedButton />)).to.be.true;

      const rendered = ReactTestUtils.renderIntoDocument(<WrappedButton />);
      expect(ReactTestUtils.isCompositeComponent(rendered)).to.be.true;
    });

    it('should cache styles on subsequent mounts', () => {
      withStyles.__Rewire__('cache', cache);
      cache.get
        .onFirstCall()
        .returns(undefined)
        .onSecondCall()
        .returns({ style: testElm, count: 1 });

      const rendered = ReactTestUtils.renderIntoDocument(<WrappedButton />);
      rendered.componentWillMount();
      expect(cache.set.calledOnce).to.be.true;
    });

    it('should clear styles cache on last component instance dismount', () => {
      withStyles.__Rewire__('cache', cache);
      cache.get
        .onFirstCall()
        .returns(undefined)
        .onSecondCall()
        .returns({ style: testElm, count: 1 });

      const rendered = ReactTestUtils.renderIntoDocument(<WrappedButton />);
      rendered.componentWillUnmount();
      expect(cache.delete.calledOnce).to.be.true;
    });

    it('should not clear styles cache on normal component dismount', () => {
      withStyles.__Rewire__('cache', cache);
      cache.get
        .onFirstCall()
        .returns(undefined)
        .onSecondCall()
        .returns({ style: testElm, count: 1 })
        .onThirdCall()
        .returns({ styles: testElm, count: 2 });

      /**
       * renderIntoDocument triggers componentWillMount, the first instance of
       * the component being mounted. Manually triggering componentWillMount
       * right afterwards increases the count to 2, representing a second
       * instance of the component. Manually triggering componentWillUnmount
       * will then unmount one of them, but the first one still remains, so the
       * cache should not be cleared.
       */
      const rendered = ReactTestUtils.renderIntoDocument(<WrappedButton />);
      rendered.componentWillMount();
      rendered.componentWillUnmount();
      expect(cache.delete.called).to.be.false;
    });

    it('should refresh styles in componentWillUpdate (non-production)', () => {
      const realNodeEnv = process.env.NODE_ENV;
      withStyles.__Rewire__('csjs', csjs);

      process.env.NODE_ENV = 'test';
      const rendered = ReactTestUtils.renderIntoDocument(<WrappedButton />);
      rendered.componentWillUpdate();
      process.env.NODE_ENV = realNodeEnv;
      expect(csjs.getCss.called).to.be.true;
    });

    it('should not refresh styles in componentWillUpdate (production)', () => {
      const realNodeEnv = process.env.NODE_ENV;
      withStyles.__Rewire__('csjs', csjs);

      process.env.NODE_ENV = 'production';
      const rendered = ReactTestUtils.renderIntoDocument(<WrappedButton />);
      rendered.componentWillUpdate();
      process.env.NODE_ENV = realNodeEnv;
      expect(csjs.getCss.called).to.be.false;
    });
  });
});
