import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const PayPalCheckoutBtn = (props) => {
  const { all_product, clearCart, addToPurchaseHistory } = useContext(ShopContext);

  const { products } = props;

  const total = products.reduce((accumulator, item) => {
    return accumulator + item.new_price;
  }, 0);

  const allItems = products.map((item) => {
    return {
      name: item.name,
      description: item.brand,
      unit_amount: {
        currency_code: 'USD',
        value: item.new_price,
      },
      quantity: 1,
    };
  });

  // console.log(allItems);

  // const [paidFor, setPaidFor] = useState(false);
  // const [error, setError] = useState(null);

  // const handleApproved = (orderId) => {
  //   setPaidFor(true);
  // };

  // if (paidFor) {
  //   console.log('You have successfully bought the product');
  // }

  // if (error) {
  //   console.log(error);
  // }

  return all_product.length > 0 ? (
    <PayPalButtons
      style={{
        height: 40,
        // color: 'silver',
        // layout: 'horizontal',
        // tagline: false,
        // shape: 'pill',
      }}
      onClick={(data, actions) => {
        const hasAlreadyBoughtProduct = false;

        if (hasAlreadyBoughtProduct) {
          alert('You have already bought this item');
          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: 'All Products',
              amount: {
                value: total,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: total,
                  },
                },
              },
              items: allItems,
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        // console.log(order.id);
        addToPurchaseHistory(order);

        clearCart();
      }}
      onCancel={() => {}}
      onError={(err) => {
        console.error('PayPal Checkout Error', err);
      }}
    />
  ) : null;
};

export default PayPalCheckoutBtn;
