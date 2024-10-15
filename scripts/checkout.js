import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

/* Promises and resolve
- better way to handle asychronous code
- similar to done() fn
- let us wait for some code to finish, before going to the next step */
//promise fn runs immediately
//tumhe lagega ki promise run hone ke baad neeche waala code loadproducts waala chalega, jisme 3 fn diye hue hai, lekin nhi, ye dono code parallely chalenge, these 2 groups of code are running at the same time, reason is it allows Js to do multiple things at the same time, so when promise finishes it can do a next step, but this next step is going to be seperate from the rest of the code
//inner fn gets a parameter called resolve works same as done()
/*new Promise((resolve) => {
  //asychronous fn
  loadProducts(() => {
    resolve(); //resolve makes it go to the next step now
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});*/

//we will give array, inside this array, we will give multiple promise, basically we created array of promise and we will give this array to promise.all and its going to wait for all of the promise to finish before going to next step
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("value1");
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/* loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
}); */

//diagramatic representation

/*new Promise((resolve)=>{ _______
                                  |
                                  |
                                  V
  loadProducts()=>{          loadProducts()=>{       
      |                           |
      |                           |
      V                           V
renderOrderSummary();          resolve();
      |                           |
      |                           |
      V                           V
renderPymentSummary();        //next step (.then)

*/
