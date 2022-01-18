let searchbtn = document.querySelector("#search");
let searchfrm = document.querySelector(".head .search-bar");
searchbtn.onclick = () => {
  searchfrm.classList.toggle("active");
};
window.onscroll = () => {
  menu.classList.remove("active");
  searchfrm.classList.remove("active");
};

let menu = document.querySelector(".head .navbar");
// document.querySelector('#bars').onclick()=()=>{

// }
menu.onclick = () => {
  menu.classList.toggle("active");
};

// -----------------------------------------------------------------------------------------------ADD TO CART TRIAL

$(document).ready(function () {
  $("button#cart").click(function () {
    $("section.order").slideDown(600);
  });
});

// ------------------------------------------------------------------PIZZAJSTRY----------

let total = 0;
function Getpizza(name, proportion, crust, topping, total) {
  this.name = name;
  this.proportion = proportion;
  this.crust = crust;
  this.topping = topping;
  this.total = total;
}

// ------------------------------------------------------continue button
$(document).ready(function () {
  $("button.continue").click(function (event) {
    let pizaname = $(".name option:selected").val();
    let pizasize = $("#proportion option:selected").val();
    let pizacrust = $("#crust option:selected").val();
    let pizatopping = [];
    $.each($("input[name='toppings']:checked"), function () {
      pizatopping.push($(this).val());
    });

    switch (pizasize) {
      case "0":
        price = 0;
        break;
      case "large":
        price = 1500;
        break;
      case "medium":
        price = 1250;
        break;
      case "small":
        price = 900;
    }
    switch (pizacrust) {
      case "0":
        crust_price = 0;
        break;
      case "Cracker":
        crust_price = 100;
        break;
      case "Cheese":
        crust_price = 150;
        break;
      case "Flat-Bread ":
        crust_price = 200;
        break;
      // default:
    }
    let topping_value = pizatopping.length * 100;

    if (pizasize == " " && pizacrust == " ") {
      $("div.final-output").hide();
      alert(" Please fill your order ");
    } else {
      $("button.continue").hide();
      $("#order-text").hide();
      $("div.final-output").slideDown(200);
    }

    total = price + crust_price + topping_value;
    console.log(total);
    let checkoutTotal = 0;
    checkoutTotal = checkoutTotal + total;

    $("#pizza-type").html($(".name option:selected").val());
    $("#totalcost").html(total);

    // --------------------------------------------------------------------------------Add pizza button
    $("button.addmore").click(function () {
      let pizaname = $(".name option:selected").val();
      let pizasize = $("#proportion option:selected").val();
      let pizacrust = $("#crust option:selected").val();
      let pizatopping = [];
      $.each(new $("input[name='toppings']:checked"), function () {
        pizatopping.push($(this).val());
      });

      let topping_value = pizatopping.length * 100;

      total = price + crust_price + topping_value;

      checkoutTotal = checkoutTotal + total;
      var newOrder = new Getpizza(
        pizaname,
        pizasize,
        pizacrust,
        pizatopping,
        total
      );
    });
    // --------------------------------------------------------------------------Checkout button
    $("button#checkout").click(function () {
      $("button#checkout").hide();
      $("button.addmore").hide();
      $("button.homedeliver").slideDown(100);
      $("#totalpaying").append("Total: Ksh " + checkoutTotal);
    });

    //  ----------------------------------------------------------------delivery button
    $("button.homedeliver").click(function () {
      $(".summary-table").hide();
      $(".final-output h2").hide();
      $(".delivery").slideDown(100);
      $("#free-delivery").hide();
      $("button.homedeliver").hide();
      $("#totalpaying").hide();
      $("button.addmore").hide();
      let feedelivery = checkoutTotal + 0;
      $("#totalpayingcost").append("Grandtotal: " + feedelivery);
    });

    // -------------------------------------------------------------------------Finishing
    $("button#finish-order").click(function (event) {
      event.preventDefault();

      $("#totalpaying").hide();
      $(".delivery").hide();
      $("button#finish-order").hide();
      $("button#checkout").hide();
      let feedelivery = checkoutTotal + 0;
      let customer = $("input#name").val();
      let phone = $("input#phone").val();
      let location = $("input#location").val();

      if (
        $("input#name").val() &&
        $("input#phone").val() &&
        $("input#location").val() != ""
      ) {
        $("#display-text").append(
          "Hi," +
            customer +
            "! Thank you for shopping with us. Your order will be delivered to " +
            location
        );
        $("#totalpayingcost").hide();
        $("#display-text").slideDown(1000);
      } else {
        alert("Enter your details");
        $(".delivery").show();
        $("button#finish-order").show();
      }
    });
    event.preventDefault();
  });
});
