//JS
let countries= document.querySelectorAll("#countries select");
let btn = document.querySelector("button");
let fromCurr= document.querySelector(".count1 select");
let toCurr= document.querySelector(".count2 select");
let msg = document.querySelector("#msg");

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
const updateFlag=(element)=>{
   let Currcode = element.value;
   let countryCode = countryList[Currcode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const amtInput = document.getElementById("amt");
    const amtVal = parseFloat(amtInput.value);
    const fromCurrency = fromCurr.value.toUpperCase(); 
    const toCurrency = toCurr.value.toUpperCase();
    const functionUrl = "/.netlify/functions/exchangeRate"; 

    const URL = `${functionUrl}?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amtVal}`;
    try {
       let response = await fetch(URL);
       if (!response.ok) {
         msg.innerText = "Error fetching exchange rates. Please try again.";
         return;
       }
       let data = await response.json();
       const rate = data.conversion_result;
       const finalAmt = amtVal * rate; 
       msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmt} ${toCurrency}`;
    } catch (error) {
       msg.innerText = "An error occurred. Please try again later.";
    }
   
});

