import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import {
  testElm,
  testStyles,
} from './testUtil';
import TaggedDecoratedButton from './components/TaggedDecoratedButton';
import DecoratedButton from './components/DecoratedButton';
import WrappedButton from './components/WrappedButton';
import withStyles from '../src';

describe('index.js', () => {
  const cache = {
    get: sinon.stub(),
    set: sinon.stub(),
    delete: sinon.stub(),
  };
  const csjs = {
    getCss: sinon.spy(),
  };

  afterEach(() => {
    cache.get.reset();
    cache.set.reset();
    cache.delete.reset();
    csjs.getCss.reset();
    withStyles.__ResetDependency__('cache');
    withStyles.__ResetDependency__('csjs');
  });

  describe('withStyles', () => {
    it('should return a styled React component (tagged decorator)', () => {
      const wrapper = shallow(<TaggedDecoratedButton />);
      expect(wrapper.props().classes).to.be.an.instanceOf(Object);
      Object
        .keys(testStyles)
        .forEach((style) => {
          expect(wrapper.html()).to.contain(testStyles[`${style}`].className);
        });
    });

    it('should return a styled React component (decorator)', () => {
      const wrapper = shallow(<DecoratedButton />);
      expect(wrapper.props().classes).to.be.an.instanceOf(Object);
      Object
        .keys(testStyles)
        .forEach((style) => {
          expect(wrapper.html()).to.contain(testStyles[`${style}`].className);
        });
    });

    it('should return a styled React component (wrapped)', () => {
      const wrapper = shallow(<WrappedButton />);
      expect(wrapper.props().classes).to.be.an.instanceOf(Object);
      Object
        .keys(testStyles)
        .forEach((style) => {
          expect(wrapper.html()).to.contain(testStyles[`${style}`].className);
        });
    });

    it('should cache styles on subsequent mounts', () => {
      withStyles.__Rewire__('cache', cache);
      cache.get
        .onFirstCall()
        .returns(undefined)
        .onSecondCall()
        .returns({ style: testElm, count: 1 });

      mount(<WrappedButton />);
      mount(<WrappedButton />);
      expect(cache.set.calledOnce).to.be.true;
    });

    it('should clear styles cache on last component instance dismount', () => {
      withStyles.__Rewire__('cache', cache);
      cache.get
        .onFirstCall()
        .returns(undefined)
        .onSecondCall()
        .returns({ style: testElm, count: 1 });

      const wrapper = mount(<WrappedButton />);
      wrapper.unmount();
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
       * Calling mount triggers componentWillMount for the first instance of the
       * component being mounted. Mounting again right afterwards triggers
       * componentWillMount again, increasing the count to 2. Unmounting the
       * second one will trigger componentWillUnmount, but the first one still
       * remains, so the cache should not be cleared.
       */
      mount(<WrappedButton />);
      const wrapper = mount(<WrappedButton />);
      wrapper.unmount();
      expect(cache.delete.called).to.be.false;
    });

    it('should refresh styles in componentWillUpdate (non-production)', () => {
      const realNodeEnv = process.env.NODE_ENV;
      withStyles.__Rewire__('csjs', csjs);

      process.env.NODE_ENV = 'test';
      const wrapper = shallow(<WrappedButton />);
      /**
       * Calling setProps on the Enzyme wrapper of the shallow render of
       * <WrappedButton /> will trigger the componentWillUpdate lifecycle
       * method.
       */
      wrapper.setProps({ foo: 'bar' });
      process.env.NODE_ENV = realNodeEnv;
      expect(csjs.getCss.called).to.be.true;
    });

    it('should not refresh styles in componentWillUpdate (production)', () => {
      const realNodeEnv = process.env.NODE_ENV;
      withStyles.__Rewire__('csjs', csjs);

      process.env.NODE_ENV = 'production';
      const wrapper = shallow(<WrappedButton />);
      /**
       * Calling setProps on the Enzyme wrapper of the shallow render of
       * <WrappedButton /> will trigger the componentWillUpdate lifecycle
       * method.
       */
      wrapper.setProps({ foo: 'bar' });
      process.env.NODE_ENV = realNodeEnv;
      expect(csjs.getCss.called).to.be.false;
    });
  });
});
