import React from 'react';
import Bookmark from './Bookmark';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('Tests for Bookmark', () => {
  it('renders bookmark not selected correctly', () => {
    const props = {
      value: 'bookmark',
      label: 'Bookmark',
      onChange: jest.fn(),
      checked: false
    };
    const tree = renderer.create(
        <Bookmark {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders bookmark selected correctly', () => {
    const props = {
      value: 'bookmark',
      label: 'Bookmark',
      onChange: jest.fn(),
      checked: true
    };
    const tree = renderer.create(
        <Bookmark {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Test that checking the bookmark switch calls the given function', () => {
    const onChange = jest.fn();
    const props = {
      value: 'bookmark',
      label: 'Bookmark',
      onChange: onChange,
      checked: true
    };
    const wrapper = mount(
      <Bookmark {...props} />
    );
    wrapper.find('input[value="bookmark"]').simulate('change', {target: {checked: !props.checked}});
    expect(onChange).toHaveBeenCalled();
  });
});