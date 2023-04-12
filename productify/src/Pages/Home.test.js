import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

const mockProducts = [  {    id: 1,    name: 'Product 1',    category: 'electronics',    price: 19.99,    image: 'https://example.com/product1.jpg',    description: 'Product 1 description',  },  {    id: 2,    name: 'Product 2',    category: 'clothing',    price: 29.99,    image: 'https://example.com/product2.jpg',    description: 'Product 2 description',  },];

describe('Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders product list correctly', () => {
    wrapper.setState({ discountedProducts: mockProducts });
    expect(wrapper.find('.grid-item')).toHaveLength(2);
  });

  it('filters products correctly by category', () => {
    wrapper.setState({ discountedProducts: mockProducts });
    wrapper.find('#category-filter').simulate('change', { target: { value: 'electronics' } });
    expect(wrapper.find('.grid-item')).toHaveLength(1);
  });

  it('filters products correctly by maximum price', () => {
    wrapper.setState({ discountedProducts: mockProducts });
    wrapper.find('#price-filter').simulate('change', { target: { value: '20' } });
    expect(wrapper.find('.grid-item')).toHaveLength(1);
  });

  it('filters products correctly by name search', () => {
    wrapper.setState({ discountedProducts: mockProducts });
    wrapper.find('#name-search').simulate('change', { target: { value: 'product 1' } });
    expect(wrapper.find('.grid-item')).toHaveLength(1);
  });

  it('applies discount correctly', () => {
    wrapper.setState({ filteredProducts: mockProducts });
    wrapper.instance().handleSelectProduct(1, true);
    wrapper.instance().handleApplyDiscount(10);
    const discountedProduct = wrapper.state('discountedProducts').find(product => product.id === 1);
    expect(discountedProduct.discountedPrice).toBeCloseTo(17.99);
    expect(discountedProduct.discountPercentage).toBe(10);
  });
});
