import { restaurants, Restaurant } from "./restaurants";
import { orders, Order, PriceBracket } from "./orders";

const hour: number = new Date().getHours();
const dollarSigns = '$$';
const deliveryTimeMax = 90;
const maxDistance = 10;
let result: string;

const priceBracket: number = dollarSigns.length;

const filteredRestaurants = restaurants.filter((restaurant) => {
  if (Number(restaurant.priceBracket) > priceBracket) {
    return false;
  }

  if (restaurant.deliveryTimeMinutes > deliveryTimeMax) {
    return false;
  }

  if (Number(restaurant.distance) > maxDistance) {
    return false;
  }

  if (hour < Number(restaurant.openHour) || hour > Number(restaurant.closeHour)) {
    return false;
  }

  return restaurant;
});

if (filteredRestaurants.length === 0) {
  result = 'There are no restaurants available right now.';
} else {
  result = `We found ${filteredRestaurants.length} restaurants, the first is ${filteredRestaurants[0].name}.`;
}

console.log(result);

/// Add your getMaxPrice() function below:
function getMaxPrice(price: PriceBracket) {
  switch(price) {
    case PriceBracket.Low:
      return 10.0;
    case PriceBracket.Medium:
      return 20.0;
    case PriceBracket.High:
      return 30.0;
  }
}

/// Add your getOrders() function below:
function getOrders(price: PriceBracket, orders: Order[][]) {
  let filteredOrders: Order[][] = [];
  orders[0].filter((order: Order) => order.price <= getMaxPrice(price));
  
  orders.forEach((restaurant: Order[]) => {
    const result = restaurant.filter((order: Order) => order.price <= getMaxPrice(price));
    filteredOrders.push(result);
  });
  return filteredOrders;
}

/// Add your printOrders() function below:
function printOrders(restaurants: Restaurant[], orders: Order[][]) {
  
  restaurants.forEach((restaurant: Restaurant, index: number) => {
    if (orders[index].length > 0) {
    console.log(restaurant.name);
    orders[index].forEach((order) => {
      console.log(` - ${order.name}: $${order.price}`);
    });
    }
  });
}

/// Main
const elligibleOrders = getOrders(PriceBracket.Low, orders);
printOrders(restaurants, elligibleOrders);