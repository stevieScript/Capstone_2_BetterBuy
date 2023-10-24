# Capstone_2_BetterBuy

eBay Clone

Link to eBay API: https://developer.ebay.com/develop/apis

Link to live version: https://determined-reward.surge.sh

This project is a simple ecommerce site using the eBay API. The site will allow users to search for items, view items, and add items to their cart. Users will also be able to create an account, login, and logout. Users will be able to view their cart and checkout, view order history and update their profile information.

This was built with Node.js for the backend and React for the frontend. The db is built with postgresql. The site uses the eBay API to search for items and Stripe to process payments.

User Flow: Login or create an account. View products on the landing page or search for products to get more information about. Add items to cart using the cart icon in the product card or the product page. View cart and checkout. View order history. Update profile information.

## Installation

git clone  
cd into the project directory into the backend folder

run npm install

node server.js

cd into the project directory into the frontend folder

run npm install

npm start

If you want to run the app locally, you will need to create a .env file in the root directory with the following variables: SECRET_KEY=your_secret_key CLIENT_URL=your_client_url EBAY_APP_ID=your_ebay_app_id EBAY_CERT_ID=your_ebay_cert_id STRIPE_SECRET_KEY=your_stripe_secret_key

