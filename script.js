const inputsElements=document.querySelectorAll('.card__input');
const submitButton=document.querySelector('.card__button');

const validateDay=(day)=>{
    if(day && day>0 && day<=31){
        return true;
    };
};
const validateMonth=(month)=>{
    if(month && month>0 && month<=12){
        return true;
    };
};
const validateYear=(year)=>{
    const currentYear=new Date().getFullYear();
    if(year && year>0 && year<=currentYear){
        return true;
    };
};

const isDateValid=(dayElement,monthElement,yearElement) =>{
    let isvalid=[false,false,false];

    if(!validateDay(dayElement.value)){
        dayElement.classList.add('card__input--error');
    } else{
        isvalid[0]=true;
        dayElement.classList.remove('card__input--error');
    };

    if(!validateMonth(monthElement.value)){
        monthElement.classList.add('card__input--error');
    } else{
        isvalid[1]=true;
        monthElement.classList.remove('card__input--error');
    }

    if(!validateYear(yearElement.value)){
        yearElement.classList.add('card__input--error');
    } else{
        isvalid[2]=true;
        yearElement.classList.remove('card__input--error');
    }

    return isvalid.every(item => item===true);

}

const calculateAge=(year,month,day) =>{
    const today=new Date(); // get on the date now 
    const birthdate=new Date(year,month-1,day) ; // create object for calculate the birthdate
    let age=today.getFullYear() - birthdate.getFullYear(); //  calculate the birthdate years
    const monthDiff=today.getMonth() - birthdate.getMonth(); // calculate the birthdate month
    // Check if the user did not reach his birthday after this year
    if(monthDiff <0 || (monthDiff===0 && today.getDate() < birthdate.getDate())){
        age--;
    }
    return age;
}

const onClickHandler=() =>{
    const dayElement=document.querySelector('.card__input[name="day"] ');
    const monthElement=document.querySelector('.card__input[name="month"] ');
    const yearElement=document.querySelector('.card__input[name="year"] ');
    const resultElement=document.querySelector('.card__resultValue');

    if(!isDateValid(dayElement,monthElement,yearElement)){
        resultElement.textContent='--';
        return;
    }

    const userValue=calculateAge(yearElement.value ,monthElement.value, dayElement.value);
    resultElement.textContent=userValue;
}

inputsElements.forEach((item) =>{
    item.addEventListener("keydown" ,(event) => event.key==='Enter'&& onClickHandler() );
});

submitButton.addEventListener("click", onClickHandler);
