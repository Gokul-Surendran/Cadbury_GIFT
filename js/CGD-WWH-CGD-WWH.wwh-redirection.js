function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }


(function () {
  var dates = {
    startDate: '2024-01-01',
    endDate: '2024-04-10',
    convert: function convert(d) {
      return d.constructor === Date ? d : d.constructor === Array ? new Date(d[0], d[1], d[2]) : d.constructor === Number ? new Date(d) : d.constructor === String ? new Date(d) : _typeof(d) === "object" ? new Date(d.year, d.month, d.date) : NaN;
    },
    inRange: function inRange(d, start, end) {
      return isFinite(d = this.convert(d).valueOf()) && isFinite(start = this.convert(start).valueOf()) && isFinite(end = this.convert(end).valueOf()) ? start <= d && d <= end : NaN;
    }
  };

  // remove console trace for debugging purposes
  console.trace = () => {};

  const WWH_URL_STAGING = 'https://wwh24-uk-staging.wearebernadette.co';
  const WWH_URL_LIVE = 'https://worldwidehide.cadbury.co.uk';
  let WWH_URL = WWH_URL_LIVE;
  if(location.host.indexOf('mcstaging') >= 0) WWH_URL = WWH_URL_STAGING;


  if (dates.inRange(Date.now(), dates.startDate, dates.endDate)) {
    var wwhConfig = {
      // Triggers that will be run if the url matches the key, uses lowecase, startsWith
      pageTriggers: {
        // For landing on the CGD WWH landing page, handles query string/token creation.
        '/easter-worldwide-hide': handleLanding,
        // '/easter-worldwide-hide-manchester-united': handleMULanding,
        // Validate token is set, redirect if not.
        //'/checkout': handleCheckout,
        // For checkout page, handles injecting the (now) cookie token value into the form
        '/checkout/onepage/success/': handleCheckoutSuccess,
        '/multishipping/checkout/success/': handleCheckoutSuccessMultiShipping,
        // Product pages, as per landing
        
        /*'/cadbury-mini-eggs-giant-wwh-easter-egg.html': handleLanding,
        '/cadbury-dairy-milk-wwh-easter-egg.html': handleLanding,
        '/cadbury-dairy-milk-buttons-wwh-easter-egg.html': handleLanding,
        // '/cadbury-manchester-united-egg-wwh-easter-egg.html': handleMULanding,
        '/cadbury-creme-egg-wwh-easter-egg-235g.html': handleLanding,
        '/cadbury-roses-wwh-easter-egg.html': handleLanding,
        '/cadbury-twirl-egg-wwh-easter-egg.html': handleLanding,
        '/cadbury-flake-wwh-easter-egg.html': handleLanding,*/

        '/cadbury-creme-egg-wwh-easter-egg-235g.html': handleLanding,
        '/cadbury-twirl-wwh-easter-egg.html': handleLanding,
        '/cadbury-flake-wwh-easter-egg.html': handleLanding,
        '/cadbury-egg-with-micro-mini-eggs-inclusions-wwh-easter-egg.html': handleLanding,
        '/cadbury-dairy-milk-ultimate-wwh-easter-egg.html': handleLanding,

      },
      core: {
        // The name of the cookie to use
        tokenCookie: 'wwh-token'
      },
      api: {
        // endpoint: 'https://worldwidehide.cadbury.co.uk/api/orders/provisional',
        // muEndpoint: 'https://worldwidehide-manutd.cadbury.co.uk/api/orders/provisional' 

        endpoint: WWH_URL + '/api/orders/provisional',
        muEndpoint: 'https://worldwidehide-manutd.cadbury.co.uk/api/orders/provisional' 
      },
      landing: {
        // The name of the token we expect to see in the query string
        tokenQuery: 'token',
        // The URL to redirect the user to if a token is not present
        wwhRedirection: 'https://worldwidehide.cadbury.co.uk/p2p-cgd-egg?returnPath=',
        wwhMURedirection: 'https://worldwidehide-manutd.cadbury.co.uk/p2p-cgd-egg?returnPath='
      },
      checkout: {
        // The CSS selector to wait for on checkout load, it uses AJAX so will not be present on traditional load/ready events.
        fieldSelector: 'div[name="shippingAddress.custom_attributes.delivery_instruction"] input',
        // How often to poll for the element. It's a cheap operation so 200ms should be fine. Ceases once found.
        checkoutSelectorPoll: 200,
        // A whitelist of products that are associated with the WWH campaign. The script will not run the checkout logic if at least one of these products is not in the cart.
        allowedProducts: [

          'Cadbury Creme Egg WWH Easter Egg',
          'Cadbury Twirl WWH Easter Egg',
          'Cadbury Flake WWH Easter Egg',
          'Cadbury Egg with Micro Mini Eggs Inclusions WWH Easter Egg',
          'Cadbury Dairy Milk Ultimate WWH Easter Egg'

        
        /*'Cadbury Mini Eggs WWH Easter Egg', 
        'Cadbury Dairy Milk WWH Easter Egg', 
        'Cadbury Dairy Milk Buttons WWH Easter Egg', 
        // 'Cadbury Manchester United Egg WWH Easter Egg', 
        'Cadbury Creme Egg WWH Easter Egg',
        'Cadbury Roses WWH Easter Egg',
        'Cadbury Twirl WWH Easter Egg',
        'Cadbury Flake WWH Easter Egg'
        // 'Dairy Milk Fruit & Nut 110g',
        // 'Cadbury Dairy Milk with Daim 120g'*/

        ],
        muAllowedProducts: ['Cadbury Manchester United Egg WWH Easter Egg'],
        // If not null, we rename the label on the input to this value
        renameField: 'World Wide Hunt ID (Do not edit)',
        // If true, we change the input field to readonly
        readonlyField: true,
        // If true, we hide the input and associated label.
        hideField: true,
        success: {
          // Selector for the item names
          productSelector: 'a.checkout-success__item-link',
          // Selector for the order number
          orderSelector: '.checkout-success__order-number-label',
          itemSelector: '.checkout-success__item',
          quantitySelector: '.quantity .checkout-success__item-value',
          shippingAddressSelector: '.checkout-success__order-shipping-info__shipping-address>p',
          messageDetailsSelector: '.checkout-success__message-details'
        },
        multishippingSuccess: {
          deliveryDetailsSelector: '.delivery-details',
          deliverySuccessSelector: '.ms-success-delivery',
          messageDetailsSelector: '.email-link',
          productSelector: 'div.name',
          orderSelector: '.order-details-content span'
        }
      }
    };
    /*
    Params for checkout page, if required
      Url: /checkout/onepage/success/
      Selector:
      OrderId/Value from selector: 1046112271
    */
    // Iterate over each of the page triggers, looking for a match (startswith on the url). If found, run the associated function.

    Object.entries(wwhConfig.pageTriggers).forEach(function (entry) {
      //if (getCookie('wwh-test') != null) {
      var _entry = _slicedToArray(entry, 2),
          key = _entry[0],
          value = _entry[1];

      if (window.location.pathname.toLowerCase().startsWith(key)) {
        value();
      } //}

    }); // Handles picking up the token from the URL and storing it as a cookie. Redirects the user if the token is missing or invalid.

    function handleLanding() {
      console.group('WWH-Debug');
      console.log('HandleLanding() getToken()', getToken());
      console.groupEnd();
      if (getToken() === null) {
        window.location.href = wwhConfig.landing.wwhRedirection + window.location.pathname;
      }
    }

    function handleMULanding() {
      if (getToken() === null) {
        window.location.href = wwhConfig.landing.wwhMURedirection + window.location.pathname;
      }

      wwhConfig.api.endpoint = 'https://worldwidehide-manutd.cadbury.co.uk/api/orders/provisional';
    } // Add a listener to the page to begin the token injection.


    function handleCheckout() {
      setTimeout(tryValidateOrder, 1000);
      //window.addEventListener('load', tryValidateOrder);
    } // Add a listener to the page to begin the token injection.


    function handleCheckoutSuccess() {
      setTimeout(getHidingLink, 1000);
      //window.addEventListener('load', getHidingLink);
    }

    function handleCheckoutSuccessMultiShipping() {
      setTimeout(getHidingLinkMultishipping, 1000);
      //window.addEventListener('load', getHidingLinkMultishipping);
    } // Handles the checkout success page, sends a post to the WWH platform for order/token association.


    function getHidingLink() {
      var token = getToken();

      if (getToken() === null) {
        return; // Normal order or one without a token.
      } // Get the products list


      waitForElementToDisplay(wwhConfig.checkout.success.productSelector, 200, 3000);
      var targetElements = document.querySelectorAll(wwhConfig.checkout.success.productSelector); // If it's not yet loaded, try again.

      if (targetElements === null) {
        setTimeout(trySetTokenForm, wwhConfig.checkout.checkoutSelectorPoll);
        return;
      } // Check if the order has a WWH product, if not, return.


      var hasProduct = _toConsumableArray(targetElements).map(function (x) {
        return x.innerText;
      }).some(function (x) {
        return wwhConfig.checkout.allowedProducts.includes(x);
      });

      if (!hasProduct) {
        return;
      } // Retrieve the order number


      waitForElementToDisplay(wwhConfig.checkout.success.orderSelector, 200, 3000);
      var orderNumber = document.querySelector(wwhConfig.checkout.success.orderSelector).parentElement.innerText.match(/[0-9]+/)[0];
      var postcode = "";
      waitForElementToDisplay(wwhConfig.checkout.success.shippingAddressSelector, 200, 3000);
      var shippingDetails = document.querySelector(wwhConfig.checkout.success.shippingAddressSelector).innerHTML.split("<br>");

      if (shippingDetails && shippingDetails.length > 1) {
        var postcodes = shippingDetails[1].split(",");
        postcode = postcodes[postcodes.length-1];
      }

      waitForElementToDisplay(wwhConfig.checkout.success.itemSelector, 200, 3000);
      var itemCount = document.querySelectorAll(wwhConfig.checkout.success.itemSelector).length;
      var items = Array();
      var itemName = "";
      var quantity = "";

      for (var i = 0; i < itemCount; i++) {
        itemName = document.querySelectorAll(wwhConfig.checkout.success.itemSelector)[i].querySelector(wwhConfig.checkout.success.productSelector).innerText;
        quantity = document.querySelectorAll(wwhConfig.checkout.success.itemSelector)[i].querySelector(wwhConfig.checkout.success.quantitySelector).innerText;

        if (wwhConfig.checkout.allowedProducts.includes(itemName)) {
          items.push({
            itemName: itemName,
            quantity: quantity,
            postcode: postcode,
            orderId: orderNumber
          });
        }
      }

      var data = {
        token: token,
        items: items
      };

      if (data !== null && data.items !== null && data.items.length > 0) {
        var endpoint = wwhConfig.checkout.muAllowedProducts.includes(data.items[0].itemName) ? wwhConfig.api.muEndpoint : wwhConfig.api.endpoint;
        fetch(endpoint, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json"
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          if (typeof result !== 'undefined' && typeof result.url !== 'undefined' && result.url !== null) {
            waitForElementToDisplay(wwhConfig.checkout.success.messageDetailsSelector, 200, 3000);
            var resultDiv = document.querySelector(wwhConfig.checkout.success.messageDetailsSelector);
            resultDiv.innerHTML = resultDiv.innerHTML + '<p class="checkout-success__message"><a class="action primary" href="' + result.url + '" target="_blank">Start Hiding</a></p>';
          }
        }).catch(function (error) {
          console.error("Error:", error);
        });
      }
    } // Handles the checkout success page, sends a post to the WWH platform for order/token association.


    function getHidingLinkMultishipping() {
      var token = getToken();

      if (getToken() === null) {
        return; // Normal order or one without a token.
      } // Get the products list


      waitForElementToDisplay(wwhConfig.checkout.multishippingSuccess.productSelector, 200, 3000);
      var targetElements = document.querySelectorAll(wwhConfig.checkout.multishippingSuccess.productSelector); // If it's not yet loaded, try again.

      if (targetElements === null) {
        setTimeout(trySetTokenForm, wwhConfig.checkout.checkoutSelectorPoll);
        return;
      } // Check if the order has a WWH product, if not, return.


      var hasProduct = _toConsumableArray(targetElements).map(function (x) {
        return x.innerText;
      }).some(function (x) {
        return wwhConfig.checkout.allowedProducts.includes(x);
      });

      if (!hasProduct) {
        return;
      }

      var items = Array();
      var itemName = "";
      var quantity = ""; // Retrieve the order number

      var orderNumbers = Array();
      waitForElementToDisplay(wwhConfig.checkout.multishippingSuccess.orderSelector, 200, 3000);
      document.querySelectorAll(wwhConfig.checkout.multishippingSuccess.orderSelector).forEach(function (item) {
        if (!isNaN(parseInt(item.textContent))) {
          orderNumbers.push(item.textContent);
        }
      });
      waitForElementToDisplay(wwhConfig.checkout.multishippingSuccess.deliveryDetailsSelector, 200, 3000);
      var deliveryCount = document.querySelectorAll(wwhConfig.checkout.multishippingSuccess.deliveryDetailsSelector).length;
      waitForElementToDisplay(wwhConfig.checkout.multishippingSuccess.deliveryDetailsSelector, 200, 3000);
      waitForElementToDisplay(wwhConfig.checkout.multishippingSuccess.deliverySuccessSelector, 200, 3000);

      for (var t = 0; t < deliveryCount; t++) {
        var postcodes = document.querySelectorAll(wwhConfig.checkout.multishippingSuccess.deliveryDetailsSelector)[t].lastElementChild.innerText.split(',');
        var postcode = postcodes[postcodes.length-1].trim().match(/^([A-Za-z]{1,2}[0-9A-Za-z]{1,2})[ ]?([0-9]{0,1}[A-Za-z]{2})$/)[0];
        var itemCount = document.querySelectorAll(wwhConfig.checkout.multishippingSuccess.deliverySuccessSelector)[t].querySelectorAll('.name').length;

        for (var i = 0; i < itemCount; i++) {
          itemName = document.querySelectorAll(wwhConfig.checkout.multishippingSuccess.deliverySuccessSelector)[t].querySelectorAll('.name')[i].innerText;
          quantity = document.querySelectorAll(wwhConfig.checkout.multishippingSuccess.deliverySuccessSelector)[t].querySelector('div.qty:not(.heading)').innerText;

          if (wwhConfig.checkout.allowedProducts.includes(itemName)) {
            items.push({
              itemName: itemName,
              quantity: quantity,
              postcode: postcode,
              orderId: orderNumbers[t]
            });
          }
        }
      }

      var data = {
        token: token,
        items: items
      };

      if (data !== null && data.items !== null && data.items.length > 0) {
        fetch(wwhConfig.api.endpoint, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json"
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          if (typeof result !== 'undefined' && typeof result.url !== 'undefined' && result.url !== null) {
            waitForElementToDisplay(wwhConfig.checkout.multishippingSuccess.messageDetailsSelector, 200, 3000);
            var resultDiv = document.querySelector(wwhConfig.checkout.multishippingSuccess.messageDetailsSelector);
            resultDiv.innerHTML = resultDiv.innerHTML + '<p class="checkout-success__message"><a class="action primary" href="' + result.url + '" target="_blank">Start Hiding</a></p>';
          }
        }).catch(function (error) {
          console.error("Error:", error);
        });
      }
    } // Actual token injection into the checkout page. Waits for the relevent fields to appear, then loads the cookie and sets the value.


    function tryValidateOrder() {
      var token = getToken(); // Wait for the input element to be rendered.

      var targetElement = document.querySelector(wwhConfig.checkout.fieldSelector);

      if (targetElement === null) {
        setTimeout(tryValidateOrder, wwhConfig.checkout.checkoutSelectorPoll);
        return;
      } // Validate that the product is within our whitelist, if not, stop work. Uses the Magento global variable for cart state.


      var hasProduct = window.checkoutConfig.totalsData.items.map(function (x) {
        return x.name;
      }).some(function (x) {
        return wwhConfig.checkout.allowedProducts.includes(x);
      });

      if (hasProduct && token === null) {
        handleLanding();
      }
    }

    function waitForElementToDisplay(selector, checkFrequencyInMs, timeoutInMs) {
      var startTimeInMs = Date.now();

      (function loopSearch() {
        if (document.querySelector(selector)) {
          return;
        } else {
          setTimeout(function () {
            if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
            loopSearch();
          }, checkFrequencyInMs);
        }
      })();
    } // Actual token injection into the checkout page. Waits for the relevent fields to appear, then loads the cookie and sets the value.
    // Actual token injection into the checkout page. Waits for the relevent fields to appear, then loads the cookie and sets the value.


    function trySetTokenForm() {
      var token = getToken();

      if (getToken() === null) {
        return; // Should not happen, user has added to basket without a token. To avoid we could align our cookie duration with the cart cookie.
      } // Wait for the input element to be rendered.


      var targetElement = document.querySelector(wwhConfig.checkout.fieldSelector);

      if (targetElement === null) {
        setTimeout(trySetTokenForm, wwhConfig.checkout.checkoutSelectorPoll);
        return;
      } // Validate that the product is within our whitelist, if not, stop work. Uses the Magento global variable for cart state.


      var hasProduct = window.checkoutConfig.totalsData.items.map(function (x) {
        return x.name;
      }).some(function (x) {
        return wwhConfig.checkout.allowedProducts.includes(x);
      });

      if (!hasProduct) {
        var targetValue = targetElement.value; // If the user no longer has products in the WWH promotion, but once did, the token might be saved by Magento, clear it if so.

        if (isGuid(targetValue)) {
          targetElement.value = '';
          targetElement.dispatchEvent(new KeyboardEvent('keyup', {
            key: ' '
          }));
        }

        return;
      } // Sets the input value, dispatches a fake event to help with associated JS DOM handlers.


      targetElement.value = token;
      targetElement.dispatchEvent(new KeyboardEvent('keyup', {
        key: ' '
      })); // If requested, hide the input/label container.

      if (wwhConfig.checkout.hideField) {
        targetElement.parentElement.parentElement.style.display = 'none';
      } // If requested, mark the input as readonly.


      if (wwhConfig.checkout.readonlyField) {
        targetElement.setAttribute('readonly', 'readonly');
      } // If requested, rename the field (sets the label text)


      if (wwhConfig.checkout.renameField !== null) {
        targetElement.parentElement.parentElement.querySelector('label > span').innerText = wwhConfig.checkout.renameField;
      }
    } // Token reading/creation logic, tries to use the URL query string first, and if found sets the relevent cookie. Regardless of this, attempts to read the cookie.


    function getToken() {
      var url = new URL(window.location);
      var wwhToken = url.searchParams.get(wwhConfig.landing.tokenQuery);

      if (wwhToken !== null) {
        // Ensure token is a valid GUID
        var isValid = isGuid(wwhToken);

        if (isValid) {
          setCookie(wwhConfig.core.tokenCookie, wwhToken, 31); // Remove the token from the URL, redirect the user. This avoids the user sharing the store page.

          url.searchParams.delete(wwhConfig.landing.tokenQuery);
          window.history.replaceState(null, null, url);
        }
      }

      return getCookie(wwhConfig.core.tokenCookie);
    } // Checks if a value is a guid


    function isGuid(token) {
      return token.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) !== null;
    } // Helper function to set a cookie based on name, value, and an expiry in days.


    function setCookie(name, value, days) {
      var expires = '';

      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=".concat(date.toUTCString());
      }

      document.cookie = "".concat(name, "=").concat(value || '').concat(expires, "; path=/");
    } // Helper function to get a cookie value by name.


    function getCookie(name) {
      var nameEQ = "".concat(name, "=");
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; ++i) {
        var c = ca[i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }

      return null;
    }
  }
})();