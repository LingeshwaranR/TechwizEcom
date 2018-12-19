const sortProducts = (productsArr, sortBy) => {
  switch (sortBy) {
    case 'Name: A-Z':
      return productsArr.sort((a, b) => (a.info.name > b.info.name) ? 1 : ((b.info.name > a.info.name) ? -1 : 0));
    case 'Name: Z-A':
      return productsArr.sort((a, b) => (a.info.name < b.info.name) ? 1 : ((b.info.name < a.info.name) ? -1 : 0));
    case 'Price: Low to High':
      return productsArr.sort((a, b) => (a.info.price > b.info.price) ? 1 :((b.info.price > a.info.price)? -1 :0 ));
    case 'Price: High to Low':
      return productsArr.sort((a, b) => (a.info.price < b.info.price) ? 1:(b.info.price < a.info.price)? -1 :0 );
    default:
      return productsArr
  }
}

export default sortProducts;