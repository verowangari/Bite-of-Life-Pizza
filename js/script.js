let searchbtn = document.querySelector("#search")
let searchfrm =document.querySelector('.head .search-bar')
searchbtn.onclick=()=>{
    searchfrm.classList.toggle('active');
}
window.onscroll=() =>{
    menu.classList.remove('active')
    searchfrm.classList.remove('active')
}

let menu = document.querySelector('.head .navbar');
// document.querySelector('#bars').onclick()=()=>{
//    MediaElementAudioSourceNode.classList.toggle('active');
//    searchfrm.classList.remove('active');

// }
// menu.onclick=()=>{
//     menu.classList.toggle('active');
// }

// ------------------------------------------------------------------PIZZAJSTRY----------
var price , crust_price, topping_price ;
let total = 0;
function Getpizza( name,proportion,crust,topping, total ){
  this.name = name;
  this.proportion = proportion;
  this.crust = crust;
  this.topping = topping;
  this.total = total;
}


// continue button
$(document).ready(function(){
  // $("button.continue").click(function(){
  //   $("button.continue").hide();
  //   $("#order-text").hide();
  //   $("div.final-output").slideDown(1000);
  // });
  $("button.continue").click(function(event){
   let pname = $(".name option:selected").val();
   let psize = $("#proportion option:selected").val();
   let pcrust = $("#crust option:selected").val();
   let ptopping = [];
   $.each($("input[name='toppings']:checked"), function(){            
       ptopping.push($(this).val());
   });
   console.log(ptopping.join(", "));

   switch(psize){
    case "0":
      price =0;
    break;
    case "large":
       price = 1200;
       console.log(price);
     break;
     case "medium":
       price = 850;
       console.log("The price is "+price);
     break;
     case "small":
       price = 600;
       console.log(price);
     default:
       console.log("error"); 
   }
   switch(pcrust){
      case "0":
        crust_price = 0;
      break;
      case "Cracker":
        crust_price = 100;
      break;
      case "Cheese":
        crust_price = 150;
      break;
      case "Gluten-free":
        crust_price = 180;
      break;
      default:
        console.log("No price"); 
    }
    let topping_value = ptopping.length*50;
    console.log("toppins value" + topping_value);

    if((psize == "0") && (pcrust == "0")){
      console.log("nothing selected");
      $("button.continue").show();
      $("#order-text").show();
      $("div.final-output").hide();
      alert("Please select pizza size and crust"); 
    }
    else{
      $("button.continue").hide();
      $("#order-text").hide();
      $("div.final-output").slideDown(1000);
    }

    total = price + crust_price + topping_value;
    console.log(total);
    let checkoutTotal =0;
    checkoutTotal = checkoutTotal + total;

    $("#pizza-type").html($(".name option:selected").val());
    $("#pizzasize").html( $("#proportion option:selected").val());
    $("#pizzacrust").html($("#crust option:selected").val());
    $("#pizzatopping").html(ptopping.join(", "));
    $("#totals").html(total);
    
// Add pizza button
    $("button.addPizza").click(function(){
      let pname = $(".name option:selected").val();
      let psize = $("#proportion option:selected").val();
      let pcrust = $("#crust option:selected").val();
      let ptopping = [];
      $.each($("input[name='toppings']:checked"), function(){            
          ptopping.push($(this).val());
      });
      console.log(ptopping.join(", "));
      switch(psize){
        case "0":
          price =0;
        break;
        case "large":
           price = 1500;
           console.log(price);
         break;
         case "medium":
           price = 1250;
           console.log("The price is "+price);
         break;
         case "small":
           price = 900;
           console.log(price);
         default:
           console.log("error"); 
       }
       switch(pcrust){
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
          default:
            console.log("No price"); 
        }
        let topping_value = ptopping.length*50;
        console.log("toppins value" + topping_value);
        total = price + crust_price + topping_value;
        console.log(total);

        checkoutTotal = checkoutTotal + total;
        console.log(checkoutTotal);
      // constractor function
      var newOrder = new Getpizza(pname, psize, pcrust,ptopping,total);

      $("#placeorders").append('<tr><td id="pizza-type">'+newOrder.name +'</td><td id="pizzasize">' + newOrder.proportion + '</td><td id="pizzacrust">'+newOrder.crust + '</td><td id="pizzatopping">'+newOrder.topping+'</td><td id="totals">'+newOrder.total+'</td></tr>');
      console.log(newOrder);
      
      

    });
    // Checkout button
    $("button#checkout").click(function(){ 
      $("button#checkout").hide();
      $("button.addPizza").hide();
      $("button.deliver").slideDown(1000);
      $("#addedprice").slideDown(1000);
      console.log("Your total bills is sh. "+checkoutTotal);
      $("#pizzatotal").append("Your bill is sh. "+checkoutTotal);
    });

    // home delivery button
    $("button.deliver").click(function(){
      $(".summary-table").hide();
      $(".final-output h2").hide();
      $(".delivery").slideDown(1000);
      $("#addedprice").hide();
      $("button.deliver").hide();
      $("#pizzatotal").hide();
      let deliceryamount= checkoutTotal+150;
      console.log("You will pay sh. "+deliceryamount+" on delivery");
      $("#totalbill").append("Your bill plus delivery fee is: "+deliceryamount);
    });

    // when one clicks place order button
    $("button#final-order").click(function(event){
      event.preventDefault();

      $("#pizzatotal").hide();
      $(".delivery").hide();
      $("button#final-order").hide();
      let deliceryamount= checkoutTotal+150;
      console.log("Final Bill is: "+deliceryamount);
      let person = $("input#name").val();
      let phone = $("input#phone").val();
      let location = $("input#location").val();

      if ($("input#name").val() && $("input#phone").val() && $("input#location").val()!=""){
  
        $("#finallmessage").append(person+", We have recieved your order and it will be delivered to you at "+location+ ". Prepare sh. "+deliceryamount);
        $("#totalbill").hide();
        $("#finallmessage").slideDown(1200);
      }
      else {
        alert("Please fill in the details for delivery!");
        $(".delivery").show();
        $("button#final-order").show();
      }
    });
   event.preventDefault();
  });
});