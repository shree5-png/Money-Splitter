"use strict"

const billInput = document.querySelector('#inumber');
const peopleInput = document.querySelector('#ipeople')
const inputContainer = document.querySelectorAll('.same-input')

const customInput = document.querySelector('.customInput');
const btns = document.querySelectorAll('.mybtn');

const tipDigit = document.querySelector('.tipDigit');
const amtDigit = document.querySelector('.amtDigit');

const resetBtn = document.querySelector('.resetBtn');


// TOPIC storage

/**
 * To store the input data stream
 */
const data = {

    bill:'',
    tip:'',
    people:'',


};

/**
 * To store the calculated result stream
 */
const result = {

    tip:'',
    bill:'',

}


/**
 * billFn - function to take the value from input and call for update, this is called by event listener
 * similar with PeopleFn, btnFn, customFn
 * peopleFn - no of people
 * btnFn - tip percentage button
 * customFn - custom Tip percentage
 */

const billFn = function(){

    if(billInput.value && billInput.value>0){

        data.bill= billInput.value;
        updateCallerFunction();
    }
};


const peopleFn = function(){

    if(peopleInput.value && peopleInput.value>0){
        data.people = peopleInput.value;
        updateCallerFunction();
    }
};

/**
 * @param {each} - each is the html button element of tip percentage
 * each button contain data-id having its tip percentage in html, and it is accessed by dataset.id in here
 */
const btnFn = function(each){


        data.tip = each.dataset.id;
        updateCallerFunction();
}

const customFn = function(){

    if(customInput.value && customInput.value>0){
        data.tip = customInput.value;
        updateCallerFunction();
    }

}

// For reseting the value;
const resetFn= function(){

    data.bill = '';
    data.people = '';
    data.tip = '';

    result.bill = '';
    result.tip = '';

    tipDigit.textContent ="00.0";
    amtDigit.textContent ="00.0";

    inputContainer.forEach(each=>{
        each.value = '';
    })
    customInput.value = '';
};


/**
 * Event calling
 */
customInput.addEventListener("change",()=>{

    customFn();
})


btns.forEach(each=>{
    each.addEventListener("click",()=>{
        btnFn(each)
    })
})

billInput.addEventListener("change",()=>{

    billFn();
});

peopleInput.addEventListener("change",()=>{
    peopleFn();
});

resetBtn.addEventListener("click",()=>{
    resetFn();
})



/**
 * It calculate tip and total amount per person and store in the result object
 */
const tipFn = function(){

    if(data.bill !=='' && data.people !=='' && data.tip !==''){

        // Converting to Number
        const billAmt =Number(data.bill);
        const noOfPeople = Number(data.people);
        const tipPer = Number(data.tip);

        // Calculating tip
        const totalTip =  (tipPer / 100) * billAmt;
        const eachTip = totalTip/noOfPeople;

        // calculating Total per person
        const billPerPerson = billAmt / noOfPeople;
        const TotalPerPerson = billPerPerson + eachTip;

        // Storing in result object
        result.bill= TotalPerPerson;
        result.tip= eachTip;
    }
}


/**
 * It get data from result object and show it in the frontend
 */

const showResultTip = function(){

    if(result.tip !== '' && result.bill !== ''){

        const TipPerPerson = Number(result.tip);
        tipDigit.textContent = TipPerPerson.toFixed(1);

        const TotalPerPerson = Number(result.bill);
        amtDigit.textContent = TotalPerPerson.toFixed(1);

       
    }
}

// It call for the tipFn and showResultTip functions
const updateCallerFunction = function(){

    tipFn();
    showResultTip()
}
updateCallerFunction();









