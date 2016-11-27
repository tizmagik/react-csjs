import React from 'react';
import getCss from 'csjs/get-css';
import scopedName from 'csjs/lib/scoped-name';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { testStyles } from './testUtil';
import TaggedDecoratedButton from './components/TaggedDecoratedButton';
import DecoratedButton from './components/DecoratedButton';
import WrappedButton from './components/WrappedButton';
import withStyles from '../src';

describe('withStyles', () => {
  describe('core', () => {
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
  });

  describe('caching', () => {
    const scope = scopedName(getCss(testStyles))('DecoratedComponent');
    let cache;

    beforeEach(() => {
      cache = {};
      withStyles.__Rewire__('cache', cache);
    });

    afterEach(() => {
      withStyles.__ResetDependency__('cache');
    });

    it('should cache styles on subsequent mounts', () => {
      expect(cache[scope]).to.be.undefined;
      mount(<WrappedButton />);
      mount(<WrappedButton />);
      expect(cache[scope]).to.be.an('object').and.to.have.property('count', 2);
    });

    it('should clear styles cache on last component instance dismount', () => {
      expect(cache[scope]).to.be.undefined;
      const wrapper = mount(<WrappedButton />);
      expect(cache[scope]).to.be.an('object').and.to.have.property('count', 1);
      wrapper.unmount();
      expect(cache[scope]).to.be.undefined;
    });

    it('should not clear styles cache on normal component dismount', () => {
      expect(cache[scope]).to.be.undefined;
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
      expect(cache[scope]).to.be.an('object').and.to.have.property('count', 1);
    });
  });

  describe('hot reload', () => {
    const csjs = { getCss: sinon.spy() };
    const realNodeEnv = process.env.NODE_ENV;

    beforeEach(() => {
      withStyles.__Rewire__('csjs', csjs);
    });

    afterEach(() => {
      csjs.getCss.reset();
      withStyles.__ResetDependency__('csjs');
    });

    it('should refresh styles in componentWillUpdate (non-production)', () => {
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
      process.env.NODE_ENV = 'production';
      const wrapper = shallow(<WrappedButton />);
      wrapper.setProps({ foo: 'bar' });
      process.env.NODE_ENV = realNodeEnv;
      expect(csjs.getCss.called).to.be.false;
    });
  });
});
