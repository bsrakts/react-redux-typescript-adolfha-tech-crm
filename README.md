
## 🚀 Introduction

Welcome to adolfha-tech-crm! This project is a modern CRM application built with the latest web technologies and data fetched from dummyjson. Whether you're here to understand the source code or contribute, this guide should give you a comprehensive overview of the project.

![Screenshot](/src/assets/screenshot.png)


## 🛠 Technologies Used:

 - **Vite:** A lightning-fast build tool and development server.
 - **React 18:** A JavaScript library for building user interfaces.
 - **TypeScript:** A typed superset of JavaScript.
 - **TailwindCSS:** A utility-first CSS framework for rapidly building
   custom designs.
 - **Redux Toolkit:** The official, opinionated, batteries-included toolset
   for efficient Redux development.
 - **ESLint:** A pluggable and configurable linter tool for identifying and
   reporting on patterns in JavaScript.
 - **React Router:** Declarative routing for React.
 - **Axios:** Promise based HTTP client for the browser and node.js.
 - **MUI:** React components for faster and simpler web development.
 - **Lottie:** For rendering Adobe After Effects animations natively on
   mobile and on the web.

  

## 🌐 Project Overview:

**Login Page:** Features a sleek login form. Logging in is done using hardcoded user credentials. Upon successful authentication, users are granted a token and redirected to the /users page.
 
**Dashboard:** The first entry point after logging in.

- Chart: Leveraging the power of React ApexCharts, it presents visually appealing and informative graphs.

- Products Overview: Provides a concise view of products based on the categories fetched from the /products/category endpoint of the dummyjson API.

**Users Page:** Displays a table listing user details fetched from the dummyjson API, showcasing:

*firstName*
*lastName*
*age*
*gender*
*email*
*phone*
*birthDate*
*image*

**Todos Page:** Fetches data from the /todos endpoint of the dummyjson API. It offers:

 - Filtering by userId and todo content
 - Adding a new item via a modal
 - Toggling the completed status of a selected item
 - Deleting a selected item

🧑‍💻 Getting Started:

Clone the Repository:

    git clone https://github.com/bsrakts/react-redux-typescript-adolfha-tech-crm.git

Navigate to the directory:

    cd adolfha-tech-crm-project

Install Dependencies:

    npm install

Run the Application in Development Mode:

    npm run dev

🤝 Contributing:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

  

Hope you enjoy working with [adolfha-tech-crm](https://github.com/bsrakts/react-redux-typescript-adolfha-tech-crm)! If you like the project, don't forget to give it a ⭐!
