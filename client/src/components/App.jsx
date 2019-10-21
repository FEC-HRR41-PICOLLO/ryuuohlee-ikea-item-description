//import requirements
import React from 'react';
import ProductOptions from './ProductOptions.jsx';
import ProductPurchase from './ProductPurchase.jsx';
import StockCheck from './StockCheck.jsx';
import StarRatings from 'react-star-ratings';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      productList: [],
      product: {},
      quantityValue: 1
    }

    this.handleProduct = this.handleProduct.bind(this);
  }

  //selects a random product from the list of products to display
  handleProduct(e) {
    var initial = 2;
    if (e) {
      this.setState({
        product: this.state.productList[e.target.value]
      });
    } else {
      this.setState({
        product: this.state.productList[initial]
      });
    }
  }

  componentDidMount() {
    fetch('api/products')
      .then(data => data.json())
      .then(data => this.setState({ productList: data }))
      .then(this.handleProduct);
  }

  render() {
    console.log(this.state.productList);
    const revStyle= {
      textDecoration: 'none'
    }
    return (
      <div className='product_container'>
        <div className='product_price'>
          <p className='product_age'>New</p>
          <h1 className='product_heading'>
            <span className='product_name'>{this.state.product.product_name}</span>
            <span className='shortDesc'>{this.state.product.product_short_desc}</span>
          </h1>
          <p className='product_cost'>{'$' + parseFloat(this.state.product.product_price).toFixed(2)}</p>
          <div className='aggregatedRating'>
            <a style={revStyle} className='reviews' href='test'>
              <span className='stars'>
                <StarRatings
                  rating={this.state.product.product_avg_rev}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension='25px'
                  starSpacing="0px"
                  name='rating'
                />
              </span>
              <span className="reviewValue">
                {this.state.product.product_avg_rev}
              </span>
              <span className="numberOfRev">138 Reviews</span>
            </a>
          </div>
        </div>
        <div className='product_ad_desc'>
          <span className='adDesc'>{this.state.product.product_ad_desc}</span>
        </div>
        <div>
          <ProductOptions products={this.state.productList} handleProduct={this.handleProduct.bind(this)} product={this.state.product} />
        </div>
        <div>
          <ProductPurchase />
        </div>
        <div>
          <StockCheck />
        </div>
      </div>
    )
  }
};

export default App;