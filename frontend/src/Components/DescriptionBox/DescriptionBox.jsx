import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = (props) => {
  const [otherDetail, setOtherDetail] = useState('desc');

  return (
    <>
      {/* <div className="descriptionbox">
        <div className="descriptionbox-navigator">
          <div className="descriptionbox-nav-box">Description</div>
          <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio minus et possimus consequatur rem eius animi, quia fugit modi sequi veniam, iure commodi aliquam eos, ullam doloribus earum repellat
            deleniti voluptatum tempore sapiente incidunt? Aperiam doloremque facere reiciendis quia perspiciatis cum ipsam, sit molestiae aliquam. Facilis consectetur mollitia ratione ipsam, iste inventore quae tempore
            illo quibusdam consequuntur aliquam nihil deleniti blanditiis at fugit impedit consequatur? Nam asperiores eligendi quia sit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia beatae corrupti. Tempore quod eos beatae praesentium voluptates asperiores aliquid vero doloremque possimus vitae, rerum vel laboriosam
            mollitia quo. Dolores.
          </p>
        </div>
      </div> */}
      <div className="product-otherDetails-container">
        <div className="product-otherDetails">
          <form className="product-otherDetails-form" action="">
            <input
              label="DESCRIPTION"
              type="radio"
              name="product-otherDetail-radio"
              id="otherDetail1"
              className="product-otherDetail-radio "
              onClick={() => {
                setOtherDetail('desc');
              }}
              defaultChecked
            />
            <input
              label="SIZE GUIDE"
              type="radio"
              name="product-otherDetail-radio"
              id="otherDetail2"
              className="product-otherDetail-radio "
              onClick={() => {
                setOtherDetail('size');
              }}
            />
            <input
              label="SHIPPING & RETURNS"
              type="radio"
              name="product-otherDetail-radio"
              id="otherDetail3"
              className="product-otherDetail-radio "
              onClick={() => {
                setOtherDetail('ship');
              }}
            />
          </form>
        </div>
        <div className="product-otherDetails-content">
          <div className="product-otherDetails-desc " style={otherDetail === 'desc' ? { display: 'block' } : { display: 'none  ' }} id="otherDetail1Div">
            <p>{props.description}</p>
          </div>
          <div className="product-otherDetails-size " style={otherDetail === 'size' ? { display: 'block' } : { display: 'none  ' }} id="otherDetail2Div">
            <p>
              A size chart is a reference table that provides measurements for various body parts to help individuals determine the best size for clothing, shoes, or accessories. The specific measurements included in a
              size chart will vary depending on the item being sized, but some common measurements that may be included are:
              <br />
              <br />
              Chest/bust: the circumference around the fullest part of the chest or bust
              <br />
              Waist: the circumference around the narrowest part of the waist
              <br />
              Hips: the circumference around the widest part of the hips
              <br />
              Inseam: the distance from the crotch to the ankle
              <br />
              Sleeve length: the distance from the center of the back of the neck to the end of the sleeve
              <br />
              Shoe size: the length of the foot in inches or centimeters
              <br />
              <br />
              It is important to note that size charts may vary depending on the brand, country of origin, and style of the item. Therefore, it is always a good idea to consult the specific size chart provided by the
              manufacturer or retailer of the item you are interested in purchasing.
            </p>
          </div>
          <div className="product-otherDetails-return " style={otherDetail === 'ship' ? { display: 'block' } : { display: 'none  ' }} id="otherDetail3Div">
            <h1>Returns Policy</h1>
            <p>
              You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective
              item, etc.).
              <br />
              You should expect to receive your refund within four weeks of giving your package to the return shipper, however, in many cases you will receive a refund more quickly. This time period includes the transit
              time for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to process
              our refund request (5 to 10 business days).
              <br />
              If you need to return an item, please Contact Us with your order number and details about the product you would like to return. We will respond quickly with instructions for how to return items from your
              order.
            </p>

            {/* <h1 style="margin-top: 20px;">Shipping</h1> */}
            <h1>Shipping</h1>
            <p>
              We can ship to virtually any address in the world. Note that there are restrictions on some products, and some products cannot be shipped to international destinations.
              <br />
              When you place an order, we will estimate shipping and delivery dates for you based on the availability of your items and the shipping options you choose. Depending on the shipping provider you choose,
              shipping date estimates may appear on the shipping quotes page.
              <br />
              Please also note that the shipping rates for many items we sell are weight-based. The weight of any such item can be found on its detail page. To reflect the policies of the shipping companies we use, all
              weights will be rounded up to the next full pound.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionBox;
