const tabOptions = {
  PRODUCT: "PRODUCT",
  SUPPLIER: "SUPPLIER",
  LOGS: "LOGS",
};

const tabOptionsEnum = Object.values(tabOptions);

export { tabOptions, tabOptionsEnum };

const api = "http://127.0.0.1:11000/api";
const fetchRequestType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const fetchHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export { api, fetchRequestType, fetchHeaders };

const productCategories = [
  "Beverages",
  "Condiments",
  "Confections",
  "Dairy Products",
  "Grains/Cereals",
  "Meat/Poultry",
  "Produce",
  "Seafood",
];

export { productCategories };
