const btnsNext = document.querySelectorAll(".form-quiz__button");
const btnsPrev = document.querySelectorAll(".form-quiz__button-prev");
const form = document.querySelector(".form-quiz");
const formItems = form.querySelectorAll("fieldset");
const sendBtn = form.querySelector(".send-mail__button");
const dotsTop = document.querySelectorAll(".quiz-count__number");
const inputs = form.querySelectorAll("input");
const inputsBlock = form.querySelectorAll(".form-quiz__group");
const backImageBlock = document.querySelector(".quiz-block__image");
const popupThanks = document.querySelector(".popup-thanks");
const overlay = document.querySelector(".overlay");

const answersObj = {
  step0: {
    question: "",
    answers: [],
  },
  step1: {
    question: "",
    answers: [],
  },
  step2: {
    question: "",
    answers: [],
  },
  step3: {
    question: "",
    answers: [],
  },
  step4: {
    phone: "",
    email: "",
  },
};

inputsBlock.forEach((item) => {
  item.querySelector("label").style.zIndex = 100;
  item.querySelector("label").style.cursor = "pointer";
});

btnsNext.forEach((btn, indexBtn) => {
  btn.disabled = true;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (indexBtn === btnsNext.length - 1) {
      backImageBlock.style.display = "block";
    }

    formItems[indexBtn].style.display = "none";
    formItems[indexBtn + 1].style.display = "block";
  });
});

btnsPrev.forEach((btn, indexBtn) => {
  btn.style.zIndex = "100";

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    formItems[indexBtn + 1].style.display = "none";
    formItems[indexBtn].style.display = "block";
  });
});

formItems.forEach((formItem, indexFormItem) => {
  formItem.addEventListener("change", (e) => {
    const target = e.target;
    const imputsChecked = formItem.querySelectorAll("input:checked");
    const allInputs = formItem.querySelectorAll("input");
    const itemTitle = formItem.querySelector(".form-quiz__title");

    if (target.classList.contains("form-quiz__radio")) {
      allInputs.forEach((inp) => {
        inp.parentNode.classList.remove("active-radio");
      });

      target.parentNode.classList.add("active-radio");
    } else if (target.classList.contains("form-quiz__checkbox")) {
      if (target.checked) {
        target.parentNode.classList.add("active-checkbox");
      } else {
        target.parentNode.classList.remove("active-checkbox");
      }
    }

    if (indexFormItem !== formItems.length - 1) {
      answersObj[`step${indexFormItem}`].question = itemTitle.textContent;

      answersObj[`step${indexFormItem}`].answers.length = 0;
      imputsChecked.forEach((inputChecked) => {
        answersObj[`step${indexFormItem}`].answers.push(inputChecked.value);
      });

      if (imputsChecked.length > 0) {
        btnsNext[indexFormItem].disabled = false;
        dotsTop[indexFormItem].classList.add("count-active");
      } else {
        btnsNext[indexFormItem].disabled = true;
        dotsTop[indexFormItem].classList.remove("count-active");
      }
    }
  });
});

dotsTop.forEach((dot) => {
  dot.classList.remove("count-active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  answersObj.step4.phone = document.getElementById("quiz-phone").value;
  answersObj.step4.email = document.getElementById("quiz-email").value;

  postData(answersObj)
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "success") {
        overlay.style.display = "block";
        popupThanks.style.display = "block";
        form.reset();
      } else {
        alert(res.status);
      }

      $('.popup-thanks__close, .overlay').click(function () {
        $('.popup-thanks, .overlay').fadeOut();
      });
    });
});

const postData = (body) => {
  return fetch("./quiz-send.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

inputs.forEach((input) => {
  input.checked = false;

  if (input.type === "radio") {
    input.parentNode.classList.remove("active-radio");
  } else if (input.type === "checkbox") {
    input.parentNode.classList.remove("active-checkbox");
  }
});

backImageBlock.style.display = "none";