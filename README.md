# B42_WEB_003_Web-Wizards

# VOGUEMART


VogueCart is a comprehensive online marketplace designed to enhance the shopping experience by offering a vast range of products across multiple categories. The platform enables users to browse, search, and purchase products with ease while ensuring a user-friendly and intuitive interface. With a modern and responsive design, VogueCart delivers seamless functionality, making online shopping convenient and efficient. The integration of advanced technologies enhances performance, security, and scalability, ensuring a reliable and robust e-commerce experience.


## Tech Stack

**Frontend:** HTML CSS Javascript

**Database:** Firebase

**Other tools:** Api Session Storage Bootstrap


## Features

- User Authentication & Authorization: Secure login and registration for users, with encrypted password storage and session management.

- Product Management: A vast collection of products categorized efficiently for easy browsing and quick searching.

- Advanced Search & Filtering: Allows users to find specific products using keywords, categories, and filters such as price, brand, and ratings.

- Secure Payment Integration: Supports multiple payment gateways, ensuring safe and hassle-free transactions.

- Responsive UI: Built with Tailwind CSS and React to ensure a smooth experience across all devices, including mobile and desktop.

- Order Tracking: Users can monitor their order status, including processing, shipping, and delivery updates.

- User Reviews & Ratings: Customers can provide feedback and rate products, helping others make informed purchasing decisions.

- Wishlist & Cart Management: Users can save items for later or proceed with a seamless checkout experience.

- Admin Dashboard: A dedicated portal for administrators to manage products, orders, users, and reports efficiently.

- API Integration: Enhances the system with third-party APIs for additional functionalities such as product recommendations, analytics, and location-based services.

- Session Storage: Ensures user session persistence and enhances user experience with temporary data storage.


## Installation

1. Clone the repository:

 git clone https://github.com/narsijangid/B42_WEB_003_Web-Wizards.git

2. Navigate to the project folder: cd B42_WEB_003_Web-Wizards

# Roadmap

 

 ## 1.  User Flow:

- Search Product: Users can search for products from the catalog.

- View Product: Users can view product details before purchasing.

- Add to Cart: Users can add selected products to their cart.

- Buy Product: Users can proceed with purchasing products.

- Login Page: Users are required to log in before checkout.

- Checkout Page: Users can review and confirm their order.

- Order Details & History: Users can track previous purchases.

- Logout: Users can securely log out of their account.

## 2. Admin Flow:

- Login Page: Admin must log in to access the dashboard.

- Dashboard: Admin can view an overview of store activity.

- Manage Products: Admin can add, edit, or remove products.

- Manage Status: Admin can update order statuses.

- Profile Update: Admin can modify their profile details.

- Logout: Admin can securely log out.


## 3. Authentication:

If a user/admin is not logged in, they will be redirected to the Login Page before accessing restricted features.


## 4. Future Enhancements:
 

Add user reviews and ratings for products.

Improve the UI/UX for a better shopping experience.





## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/api/products` | `string` |  https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json |
| `/api/orders` | `string` |  https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json|
| `/api/cart` | `string` |  https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json  |
| `/api/users` | `string` |  https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json|




#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

 

## Contributing

Contributions are always welcome!

 

  To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Add new feature"`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a Pull Request.

### Guidelines
- Follow coding standards and best practices.
- Keep PRs small and focused.
- Ensure your code is well-documented.
- Test before submitting.

Thank you for contributing! 🚀


## Page BreakDown (User)

# VogueCart - Home Page

The **Home Page** of VogueCart serves as the landing page for the e-commerce platform, providing users with a seamless shopping experience.

## Features

### Navigation Bar
- Includes the **VogueCart** logo.
- A **search bar** with category selection.
- Icons for **cart, notifications, and user authentication (login/logout/sign-up)**.

### Top Strip Bar
- Shows **app download link** and quick links for **Promo, News, Help Center, and Language settings**.

### Dynamic Category Section
- Displays **various shopping categories** with images.
- Clicking a category redirects users to the respective product listing page.

### Featured Sections (Rendered via JavaScript)
- **Top Picks**: Displays top-rated products.
- **Best Men’s Products**: Highlights selected men’s fashion items.
- **Best Laptop Products**: Showcases popular laptops.
- **Categories Section**: Displays trending categories like **vehicles, furniture, mobile accessories, sunglasses, etc.**

### Product Cards
- Each product includes an **image, category, title, price, and rating**.
- Clicking on a product redirects to its **detailed product page**.

### Footer
- Contains **company info, policies, and social media links**.
- Includes a link for **partnering with VogueCart**.

## Functionality (Powered by JavaScript)
- Fetches product data from a **Firebase database** and dynamically **sorts & displays** products.
- Categories are mapped with appropriate API categories for seamless redirection.
- Background banner changes dynamically.

This **Home Page** ensures a user-friendly and interactive shopping experience for VogueCart customers. 🚀


## Page BreakDown (User)

# VogueCart - Home Page

The **Home Page** of VogueCart serves as the landing page for the e-commerce platform, providing users with a seamless shopping experience.

## Features

### Navigation Bar
- Includes the **VogueCart** logo.
- A **search bar** with category selection.
- Icons for **cart, notifications, and user authentication (login/logout/sign-up)**.

### Top Strip Bar
- Shows **app download link** and quick links for **Promo, News, Help Center, and Language settings**.

### Dynamic Category Section
- Displays **various shopping categories** with images.
- Clicking a category redirects users to the respective product listing page.

### Featured Sections (Rendered via JavaScript)
- **Top Picks**: Displays top-rated products.
- **Best Men’s Products**: Highlights selected men’s fashion items.
- **Best Laptop Products**: Showcases popular laptops.
- **Categories Section**: Displays trending categories like **vehicles, furniture, mobile accessories, sunglasses, etc.**

### Product Cards
- Each product includes an **image, category, title, price, and rating**.
- Clicking on a product redirects to its **detailed product page**.

### Footer
- Contains **company info, policies, and social media links**.
- Includes a link for **partnering with VogueCart**.

## Functionality  
- Fetches product data from a **Firebase database** and dynamically **sorts & displays** products.
- Categories are mapped with appropriate API categories for seamless redirection.
- Background banner changes dynamically.

This **Home Page** ensures a user-friendly and interactive shopping experience for VogueCart customers. 🚀



# Product Page - JavaScript Implementation

This project is a dynamic product listing page that fetches product data from a Firebase database, supports filtering, sorting, and pagination, and allows users to navigate to individual product pages.

## Features

- **Fetch Products**: Retrieves product data from Firebase.
- **Search Functionality**: Allows users to search for products by title.
- **Category Filtering**: Filters products based on selected category.
- **Sorting Options**: Supports sorting by price (ascending/descending) and rating.
- **Pagination**: Displays products with page navigation.
- **Price Filtering**: Allows users to filter products by price range.
- **Rating Filtering**: Filters products based on ratings.
- **Individual Product Navigation**: Click on a product to view details.

## Technologies Used

- JavaScript (DOM Manipulation)
- Firebase Realtime Database
- HTML, CSS
- Bootstrap (for styling)

## How It Works

1. **Fetching Data**  
   The page fetches product data from Firebase and stores it in an array.
   
2. **Search & Filtering**  
   - Users can search for products via the search bar.
   - The category dropdown filters products based on selected categories.
   - Price and rating filters refine results further.

3. **Sorting**  
   - Users can sort products by price (low to high or high to low).
   - Sorting by rating is also supported.

4. **Pagination**  
   - Displays a fixed number of products per page.
   - Users can navigate between pages using pagination controls.

5. **Product Click Navigation**  
   - Clicking a product redirects to its details page.

## Usage

- Modify `fetch()` to use your database URL.
- Ensure that the product objects contain `title`, `category`, `thumbnail`, `price`, and `rating` fields.

 
## Future Enhancements

- Add more filtering options (e.g., brand, availability).
- Improve UI with animations and transitions.
 
## VogueCart - Cart and Payment Page

### File Structure
```
B42_WEB_003_Web-Wizards/
│── users/
│   ├── cartAndpayment/
│   │   ├── cartAndPayment.html
│   │   ├── js/
│   │   │   ├── cartAndPayment.js
│   │   ├── css/
│   │   │   ├── cartAndPayment.css
```

### Description
The **Cart and Payment Page** handles the shopping cart and checkout process for **VogueCart**. It includes:
- Displaying cart items.
- Allowing users to update quantity and remove items.
- A form for payment details.
- Integration with Firebase for storing cart data.

### Features
- **Cart Section**: Dynamically fetches and displays items from `cart.json`.
- **Payment Form**: Collects email, phone, address, pin-code, and payment method (Card/UPI).
- **Navbar & Footer**: Shared components for navigation and branding.
- **JavaScript Functions**:
  - Fetch cart data from Firebase.
  - Update quantities and remove items.
  - Validate payment details.
 

### To-Do
- Implement order summary calculation.
- Add discount coupon feature.
- Integrate actual payment gateway.
 
### Contributors
- VogueCart Team


## Page BreakDown (Admin)

# VougeCart - Admin Dashboard

## Overview

The **VougeCart Admin Dashboard** is a powerful and easy-to-use admin panel that allows administrators to manage and monitor various aspects of an e-commerce platform. This dashboard provides insights into orders, revenue, and products in real-time.

### Features:
- View total orders, total revenue, today's sales, and last week's sales.
- Display a table of recent orders with order details.
- List top-selling products with thumbnails, prices, and titles.
- Dynamic content updates by fetching data from a Firebase database.

## File Structure

```plaintext
- B42_WEB_003_Web-Wizards/
  - admin/
    - dashboard/
      - css/
        - style.module.css         # Custom styles for the dashboard
      - js/
        - dashboard.js             # Script for dynamic content loading
      - dashboard.html             # Main dashboard page
  - images/
    - VOUGECART_light.png          # Logo image for the dashboard
     # Admin Dashboard - Orders Section
````
# VougeCart - Admin Order Page

The **Orders Section** of the Admin Dashboard allows administrators to view and manage order details. It presents detailed information about each order, including product details, pricing, return policies, status, and more. This section is designed to give admin users an easy and structured way to monitor and process orders.

### 1. **`index.html`** - The Structure of the Orders Page

The `index.html` file defines the **layout and content** of the Orders Section. Key components include:

- **Sidebar**: A navigation bar that allows easy access to different sections of the Admin Dashboard (e.g., Dashboard, Products, Orders).
- **Order Detail View**: This section displays detailed information about individual orders such as:
  - Product Image
  - Product Title
  - Product Price
  - Product SKU
  - Quantity Ordered
  - Order Status
  - User ID
  - Seller ID
  - Return Policy
  
The structure of this page is flexible and designed to be extended based on further functionality. All of the **dynamic data** will be populated using JavaScript.

#### Features:
- Dynamic content placeholders for order details.
- Discount circle (using visual styles) to display the percentage of discount on an order.
- The layout allows easy tracking of important order details in a clean, organized fashion.

### 2. **`style.module.css`** - Styling the Orders Page

The `style.module.css` file provides the **styling** rules for the Orders Section. It ensures the layout is visually appealing and responsive. Key design elements include:

- **Sidebar Styles**: To make the navigation section clean and functional.
- **Order Detail Section**: The section displaying order information is organized into a grid layout to ensure clear data separation.
- **Discount Circle**: The visual circle that represents the discount is styled with a vibrant color to draw attention.
- **Responsive Design**: The layout adjusts to different screen sizes to ensure a seamless experience for both desktop and mobile users.

#### Key Styling Rules:
- Grid layout for order details.
- Fixed sidebar for constant navigation.
- Custom style for displaying order information such as price, SKU, etc.

### 3. **`order.js`** - Fetching and Displaying Dynamic Data

The `order.js` file is responsible for **fetching** and **displaying dynamic content** on the Orders page. Here’s what it handles:

- **Data Fetching**: Connects to the backend (e.g., Firebase or API) to fetch order details.
- **Dynamic Population**: Once data is fetched, it dynamically populates the HTML elements in the Orders section such as:
  - Order Image
  - Order Price
  - Quantity Ordered
  - Order Status
- **Discount Circle**: The discount percentage is calculated and displayed inside the animated circle.

#### Key Functions:
- Fetching data from the database (e.g., Firebase Realtime Database).
- Inserting fetched data into the HTML elements.
- Updating the order status and discount dynamically based on the fetched data.

---

## Purpose

The **Orders Section** is designed to help admins manage customer orders efficiently. By providing a detailed view of each order, including the product details, pricing, status, and return policies, admins can make informed decisions and handle the orders in a timely manner.

---

 # Admin Profile Section

## Overview

The **Admin Profile Section** of the Admin Dashboard allows the administrator to manage their profile information. This includes personal details, contact information, and address. It provides the option to modify, save, or discard changes to the admin's profile.

## Files Overview

The Admin Profile Section consists of the following main files:

- `profile.html` - Contains the structure and layout of the Admin Profile page.
- `profile.css` - Provides the styling for the Admin Profile section.
- `profile.js` - Handles the logic for fetching and updating the admin profile data.

### 1. **`profile.html`** - The Structure of the Admin Profile Page

The `profile.html` file defines the **layout and content** of the Admin Profile page. Key components include:

- **Sidebar**: A navigation sidebar for easy access to different sections of the Admin Dashboard (e.g., Dashboard, Products, Orders, Profile).
- **Profile Section**: Displays the admin's profile details, such as:
  - Admin Profile Picture
  - Full Name
  - Role (Admin)
  - Editable fields for personal information such as first name, last name, email, mobile number, gender, and address.
  - Save, Edit, and Cancel buttons to manage profile changes.

#### Key Sections:
- **Header**: Contains the dashboard navigation and profile details.
- **Profile Container**: A section where the admin can see and edit their personal and contact information.
- **Form Actions**: Buttons to modify, save, or discard changes.

### 2. **`profile.css`** - Styling the Admin Profile Page

The `profile.css` file provides the **styling** for the Admin Profile page. It ensures the layout is clean, organized, and responsive. Key design elements include:

- **Profile Card**: A layout that visually separates different sections of the profile.
- **Form Styling**: Each input field has been styled for a better user experience.
- **Buttons**: Different button styles for actions such as "Save," "Edit," and "Cancel."

#### Key Styling Rules:
- Grid layout to display profile information neatly.
- Responsive design for mobile and desktop views.
- Custom styles for form inputs, labels, and buttons.

### 3. **`profile.js`** - Managing Admin Profile Data

The `profile.js` file handles the **dynamic fetching** and **updating** of the admin's profile information. It interacts with a backend (Firebase in this case) to retrieve and save data.

#### Key Functions:
- **Fetching Data**: The `fetchUserData` function retrieves the logged-in admin's data from Firebase.
  - Data fetched includes: First Name, Last Name, Email, Mobile Number, Gender, Address, and Zip Code.
- **Modifying Data**: When the admin clicks the "Edit" button, the input fields become editable.
- **Updating Data**: The "Save" button sends the modified data back to the Firebase database.
- **Canceling Changes**: The "Cancel" button reverts the profile data back to the original state.

 # Admin Login/Register Section

## Overview

The **Admin Login/Register Section** allows the administrator to log in to the Admin Dashboard or register a new admin account. This section facilitates both authentication (logging in) and account creation (registering a new admin). It provides the necessary forms, input fields, and buttons for the admin to enter their credentials and access the dashboard.

## Files Overview

The Admin Login/Register Section consists of the following main files:

- `adminLogin.html` - Contains the layout and structure of the Admin Login page.
- `adminRegister.html` - Contains the layout and structure of the Admin Registration page.
- `adminLogin.css` - Provides the styling for both the Admin Login and Register pages.
- `adminLogin.js` - Handles the logic for logging in, form validation, and interaction with the backend.

### 1. **`adminLogin.html`** - The Structure of the Admin Login Page

The `adminLogin.html` file defines the **layout and content** of the Admin Login page. Key components include:

- **Logo**: Displays the application logo for branding.
- **Login Form**: Contains fields for the admin to input their email and password.
- **Action Buttons**: Includes "Login" and "Forgot Password?" links for user interaction.
- **Google Sign-in**: Option for the admin to log in via Google.

#### Key Sections:
- **Header**: Displays the website's branding and a welcome message.
- **Login Form**: Includes input fields for the email and password.
- **Action Links**: Includes links for "Forgot Password?" and "Sign Up" for admins who don't have an account yet.

### 2. **`adminRegister.html`** - The Structure of the Admin Registration Page

The `adminRegister.html` file defines the **layout and content** of the Admin Registration page. Key components include:

- **Logo**: Displays the application logo for branding.
- **Registration Form**: Allows the admin to register a new account with fields for email, password, and confirmation.
- **Action Buttons**: Includes a "Register" button to submit the form and a link to return to the login page.

#### Key Sections:
- **Header**: Displays the website's branding and a welcome message.
- **Registration Form**: Includes fields for the admin to input email, password, and password confirmation.
- **Action Links**: Includes a link to return to the login page for admins who already have an account.

### 3. **`adminLogin.css`** - Styling the Admin Login/Register Pages

The `adminLogin.css` file provides the **styling** for both the Admin Login and Registration pages. It ensures that the layout is responsive, user-friendly, and visually appealing. Key design elements include:

- **Login Form Styling**: Defines the layout for input fields and buttons in the login form.
- **Registration Form Styling**: Provides styling for the registration fields and ensures consistency with the login form.
- **Button Styling**: Customizes buttons like "Login," "Register," and "Google Sign-in."

#### Key Styling Rules:
- Form layout is styled with padding, margins, and borders for a clean and organized structure.
- Responsive design for mobile and desktop views.
- Custom styles for labels, input fields, and buttons.

### 4. **`adminLogin.js`** - Handling Admin Login Logic

The `adminLogin.js` file is responsible for handling the **dynamic functionality** of the Admin Login/Register pages. It includes logic for form validation, user authentication, and interactions with the backend.

#### Key Functions:
- **Form Validation**: Ensures that the email and password fields are filled out correctly before submitting.
- **Login Logic**: Handles the logic for logging the admin into the system via Firebase or another authentication service.
- **Google Sign-in**: Integrates with Google’s authentication API to allow the admin to log in using their Google account.
- **Registration Logic**: Ensures the registration form inputs are validated and then submits the data to the backend to create a new admin account.

 

