import React, { useState } from "react";
import products from "../Products";
import {
  Grid,
  LegacyCard,
  Select,
  TextField,
  Button,
} from "@shopify/polaris";

const Home = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [discountedProducts, setDiscountedProducts] = useState([]);

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch =
      categoryFilter === "" ||
      product.category.toLowerCase().includes(categoryFilter.toLowerCase());

    const isPriceMatch =
      priceFilter === "" || product.price <= parseFloat(priceFilter);

    const isNameMatch =
      nameSearch === "" ||
      product.name.toLowerCase().includes(nameSearch.toLowerCase());

    return isCategoryMatch && isPriceMatch && isNameMatch;
  });

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - price * (discountPercentage / 100);
  };

  const handleApplyDiscount = (discount) => {
    const selectedProducts =discountedProducts.filter(
      (product) => product.selected
    );
    const updatedProducts = discountedProducts.map((product) => {
      if (product.selected) {
        return {
          ...product,
          discountedPrice: calculateDiscountedPrice(product.price, discount),
          discountPercentage: discount,
        };
      } else {
        return product;
      }
    });
    setDiscountedProducts(updatedProducts);
  };
  
  const handleSelectProduct = (id, selected) => {
    const updatedProducts = filteredProducts.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          selected: selected,
        };
      } else {
        return product;
      }
    });
    setDiscountedProducts(updatedProducts);
  };

  const productList = discountedProducts.length > 0 ? discountedProducts : filteredProducts;

  return (
    <div>
      <div>
        <label htmlFor="category-filter">Filter by category:</label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="food">Food</option>
        </select>
      </div>
      <div>
        <label htmlFor="price-filter">Filter by maximum price:</label>
        <select
          id="price-filter"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">No maximum price</option>
          <option value="10">Up to $10</option>
          <option value="20">Up to $20</option>
          <option value="50">Up to $50</option>
        </select>
      </div>
      <div>
        <label htmlFor="name-search">Search by name:</label>
        <input
          type="text"
          id="name-search"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={() => handleApplyDiscount(10)}>Apply 10% discount</Button>
        <Button onClick={() => handleApplyDiscount(20)}>Apply 20% discount</Button>
        <Button onClick={() => handleApplyDiscount(30)}>Apply 30% discount</Button>
      </div>
      <div className="grid-container">
      {/* <LegacyGrid> */}
      {productList.map((product) => (
  <div key={product.id} className="grid-item">
    <LegacyCard
      title={product.name}
      primaryFooterAction={{
        content: product.selected ? "Deselect" : "Select",
        onAction: () =>
          handleSelectProduct(product.id, !product.selected),
      }}
    >
      <img width={200} height={250} src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      {product.discountedPrice && (
        <>
          <p>
            Discounted price: ${product.discountedPrice.toFixed(2)}
          </p>
          <p>Discount: {product.discountPercentage}%</p>
        </>
      )}
    </LegacyCard>
  </div>
))}
    </div>
    </div>
  );
};

export default Home;