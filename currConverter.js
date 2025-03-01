const API_KEY = "5246fa2ab1ad357c079ff6e8";
BASE_URL = "https://v6.exchangerate-api.com/v6/5246fa2ab1ad357c079ff6e8";

let countries= document.querySelectorAll("#countries select");
let btn = document.querySelector("button");
let fromCurr= document.querySelector(".count1 select");
let toCurr= document.querySelector(".count2 select");
let msg = document.querySelector("#msg");
console.log(fromCurr);
console.log(toCurr); 


for(let select of countries){ 
    for(let Currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = Currcode;
        newOption.value = Currcode;
        if(select.name === "from" && Currcode === "USD"){
            newOption.selected= "selected";
        }else if(select.name === "to" && Currcode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e)=>{
        updateFlag(e.target);
    });
}
console.log(fromCurr.value);
console.log(toCurr.value);
const updateFlag=(element)=>{
   let Currcode = element.value;
   console.log(Currcode);
   let countryCode = countryList[Currcode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const fromCurrency = fromCurr.value.toUpperCase(); // API uses uppercase
    const toCurrency = toCurr.value.toUpperCase();
    console.log(toCurrency);
    const URL = `${BASE_URL}/pair/${fromCurrency}/${toCurrency}`;
    try {
        let response = await fetch(URL);
        if (!response.ok) {
            msg.innerText = "Currency pair not found!";
            return;
        }
        let data = await response.json();
        console.log("Data",data);
        const rate = data.conversion_rate;
        const amtInput=document.getElementById("amt");
        const amtVal = parseFloat(amtInput.value);
        console.log("AmtVal:",amtVal);
        if (!rate) {
            msg.innerText = "Currency pair not found.";
            return;
        }
        console.log("Rate:",rate);
        const finalAmt = amtVal * rate; // amtVal is the input amount
        console.log("Final:",finalAmt);
        msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmt} ${toCurrency}`;
    } catch (error) {
        msg.innerText = "Currency Pair not found!";
    }
});


// btn.addEventListener("click", async (e)=>{
//     console.log("Button Clicked");
//     e.preventDefault();
//     let amount = document.querySelector("#amount input");
//     let amtVal = amount.value;
//     if(amtVal==="" || amtVal < 1){
//         amtVal=1;
//         amount.value=1;
//     }
//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     console.log(URL);
//     let response = await fetch(URL);
//     console.log(response);
//     let data = await response.json();
//     let rate = data[toCurr.value.toUpperCase()];
//     let finalAmt = amtVal * rate;
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
// })

 // Corrected BASE_URL

// btn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     console.log("Button clicked");
//     // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     const URL = `${BASE_URL}/usd/inr.json`;
//     console.log("Fetching URL:", URL);
//     try {
//         let response = await fetch(URL);
//         console.log("Response:", response);
    
//         if (!response.ok) {
//             console.error("API request failed:", response.status, response.statusText);
//             msg.innerText = "Error fetching exchange rate.";
//             return;
//         }
//         let data = await response.json();
//         console.log("Data:", data);
//         // let rate = data[toCurr.value.toLowerCase()]; // Assuming the rate is directly under the toCurr code
//         // let finalAmt = amtVal * rate;
//         // msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
//     } catch (error) {
//         console.error("Error:", error);
//         // msg.innerText = "Error fetching exchange rate.";
//     }
// });