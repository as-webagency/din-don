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

  const phoneInput = document.getElementById("quiz-phone");
  const emailInput = document.getElementById("quiz-email");

  answersObj.step4.phone = phoneInput.value;
  answersObj.step4.email = emailInput.value;

  if (phoneInput.value === "" || emailInput.value === "") {
    alert("Введите данные формы");
  } else if(emailInput.classList.contains('error')) {
    alert("Введите верный email");
  } else if(phoneInput.classList.contains('error')) {
    alert("Введите верный номер телефона");
  } else {
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

        $(".popup-thanks__close, .overlay").click(function () {
          $(".popup-thanks, .overlay").fadeOut();
        });
      });
  }
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

document.getElementById("quiz-email").classList.add('error')
document.getElementById("quiz-email").addEventListener("input", (e) => {
  const emailRegExp = /@/;

  if(e.target.value.search(emailRegExp) > 0) {
    e.target.classList.add('success')
    e.target.classList.remove('error')
  } else {
    e.target.classList.remove('success')
    e.target.classList.add('error')
  }
});

document.getElementById("quiz-phone").classList.add('error')
document.getElementById("quiz-phone").addEventListener("input", (e) => {
  const phoneCount = 17;

  if(e.target.value.length === phoneCount) {
    e.target.classList.add('success')
    e.target.classList.remove('error')
  } else {
    e.target.classList.remove('success')
    e.target.classList.add('error')
  }
});

backImageBlock.style.display = "none";

/* Слайдеры */

// Slider For
const sliderFor = () => {

  const slide = document.querySelectorAll('.for-slider-content__item'),
      slider = document.querySelector('.for-slider-content');

  let currentSlide = 0, interval;

  for (let i = 0; i < slide.length; i++) {
      const dotsParent = document.querySelectorAll('.for-slider-content-dots'),
          dots = document.createElement('li');

      if (i === 0) {
          dots.setAttribute('class', 'dot dot-active');
          dotsParent[0].appendChild(dots);
      } else {
          dots.setAttribute('class', 'dot');
          dotsParent[0].appendChild(dots);
      }
  }

  const dot = document.querySelectorAll('.dot');
  const prevSlide = (elem, index, nameClass) => {
      elem[index].classList.remove(nameClass);
  };

  const nextSlide = (elem, index, nameClass) => {
      elem[index].classList.add(nameClass);
  };

  const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'for-slider-content__item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide.length) {
          currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'for-slider-content__item-active');
      nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
      clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.for-slider-content-btn, .dot')) {
          return;
      }

      prevSlide(slide, currentSlide, 'for-slider-content__item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
          currentSlide++;
      } else if (target.matches('#arrow-left')) {
          currentSlide--;
      } else if (target.matches('.dot')) {
          dot.forEach((elem, index) => {
              if (elem === target) {
                  currentSlide = index;
              }
          });
      }

      if (currentSlide >= slide.length) {
          currentSlide = 0;
      }

      if (currentSlide < 0) {
          currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'for-slider-content__item-active');
      nextSlide(dot, currentSlide, 'dot-active');

  });

  slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.for-slider-content-btn') || 
      event.target.matches('.dot')) {
          stopSlide();
      }
  });

  slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.for-slider-content-btn') ||
          event.target.matches('.dot')) {
          startSlide();
      }
  });

  startSlide(2500);
};
sliderFor();

// Slider Video
const sliderVideo = () => {

  const slide2 = document.querySelectorAll('.video-slider-content__item'),
      slider2 = document.querySelector('.video-slider-content');

  let currentSlide = 0, interval;

  // for (let i = 0; i < slide2.length; i++) {
  //     const dotsParent = document.querySelectorAll('.video-slider-content-dots'),
  //         dots = document.createElement('div');

  //     if (i === 0) {
  //         dots.setAttribute('class', 'dot dot-active');
  //         dotsParent[0].appendChild(dots);
  //     } else {
  //         dots.setAttribute('class', 'dot');
  //         dotsParent[0].appendChild(dots);
  //     }
  // }

  const dot = document.querySelectorAll('.dot');
  const prevSlide = (elem, index, nameClass) => {
      elem[index].classList.remove(nameClass);
  };

  const nextSlide = (elem, index, nameClass) => {
      elem[index].classList.add(nameClass);
  };

  const autoPlaySlide = () => {
      prevSlide(slide2, currentSlide, 'video-slider-content__item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide2.length) {
          currentSlide = 0;
      }

      nextSlide(slide2, currentSlide, 'video-slider-content__item-active');
      nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
      clearInterval(interval);
  };

  slider2.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.video-slider-content-btn, .dot')) {
          return;
      }

      prevSlide(slide2, currentSlide, 'video-slider-content__item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right_2')) {
          currentSlide++;
      } else if (target.matches('#arrow-left_2')) {
          currentSlide--;
      } else if (target.matches('.dot')) {
          dot.forEach((elem, index) => {
              if (elem === target) {
                  currentSlide = index;
              }
          });
      }

      if (currentSlide >= slide2.length) {
          currentSlide = 0;
      }

      if (currentSlide < 0) {
          currentSlide = slide2.length - 1;
      }

      nextSlide(slide2, currentSlide, 'video-slider-content__item-active');
      nextSlide(dot, currentSlide, 'dot-active');

  });

  slider2.addEventListener('mouseover', (event) => {
      if (event.target.matches('.video-slider-content-btn') || 
      event.target.matches('.dot')) {
          stopSlide();
      }
  });

  slider2.addEventListener('mouseout', (event) => {
      if (event.target.matches('.video-slider-content-btn') ||
          event.target.matches('.dot')) {
          startSlide();
      }
  });

  startSlide(2500);
};
sliderVideo();