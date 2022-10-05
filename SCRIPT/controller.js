`use strict`;

import { year } from "./model.js";
import { daysName } from "./model.js";
import { monthSectionTypes } from "./model.js";
import view from "./view.js";

class App {
    root = null;
    sectionMonthsContainer = null;
    cardsContainer = null;
    monthSection = null;

    currentYear = 2022;

    constructor() {
        this.currentYear = new Date().getFullYear();
        this.root = document.querySelector(`#root`);

        this.InitHTML();
        this.OnClickMonthListener(this.PlayCardEvent.bind(this));
        this.OnClickMonthListener(this.AddAsideMonthContainer.bind(this));
        this.SetActualDay();
    }

    SetActualDay() {
        document.querySelector(`.calendar-year-large`).textContent = this.currentYear;
        document.querySelector(`.calendar-month-large`).textContent = year[new Date().getMonth()].month;
        document.querySelector(`.calendar-day-large`).textContent = new Date().getDate().toString().padStart(2, 0);
    }

    OnClickMonthListener(handler) {
        this.sectionMonthsContainer.addEventListener("click", handler);
    }

    InitHTML() {
        this.GenerateAside();
        this.AddMonthContainer();
        this.InvestigateYearModel();
    }

    ChangeFullSideView() {
        if (this.monthSection) {
            this.monthSection.classList.remove(`month`);
            this.monthSection.classList.add(`full--side`);
        }
    }

    PlayCardEvent(e) {
        const day = e.target.closest(`.day`);
        if (!day) return;

        const pointedDay = document.querySelector(`.pointed-day`);
        pointedDay.textContent = ``;

        const month = e.target.closest(`.month`).querySelector(`.month-name`).textContent;
        const dayItem = day.querySelector(`time`).textContent;

        pointedDay.textContent = `2022.${month}.${dayItem}`;
    }

    ChangeMonthBackground(htmlClass) {
        //Generate random color on the html element text that receive.
        setInterval(
            () => {
                htmlClass.style.color = `rgb(${Math.random() * 155},${Math.random() * 130},${Math.random() * 155})`;
            },
            1000,
            htmlClass
        );
    }

    GenerateAside() {
        const aside = view.GetAsideHTML();
        this.root.insertAdjacentHTML("beforeend", aside);
    }
    ResetAside(e) {}

    AddAsideMonthContainer(e) {
        const month = e.target.closest(`.month`);
        if (!month) return;

        const asideMonthsContainer = this.root.querySelector(`.aside--months--container`);
        asideMonthsContainer.innerHTML = ``;

        const monthObject = year.find((val) => val.id === month.id);
        const monthToBeMarked = view.MonthMarkup(monthObject);

        asideMonthsContainer.insertAdjacentHTML(`beforeend`, monthToBeMarked);

        const daysNameDiv = asideMonthsContainer.querySelector(`.days-name`);
        const monthName = asideMonthsContainer.querySelector(`.month-name`);
        const cardsContainer = asideMonthsContainer.querySelector(`.cards-container`);

        //ADD CALENDAR COMPONENT: -----------------------
        this.AddDayNames(daysNameDiv);
        this.AddPlaceholder(cardsContainer, monthObject);
        this.AddDays(cardsContainer, monthObject);
    }

    InvestigateYearModel() {
        year.forEach((month, i) => {
            //1)genarate month section and cards-container
            let sectionMarkup = null;
            if (i <= 0) sectionMarkup = view.MonthMarkup(month, monthSectionTypes[2]);
            if (i > 0 && i <= 5) sectionMarkup = view.MonthMarkup(month, monthSectionTypes[1]);
            if (i > 5 && i <= 12) sectionMarkup = view.MonthMarkup(month, monthSectionTypes[0]);

            const id = month.id;
            this.AddMonth(sectionMarkup, month);
        });
    }

    AddMonthContainer() {
        this.root.insertAdjacentHTML(`beforeend`, view.GetMonthContainerHtml());
        this.sectionMonthsContainer = document.querySelector(`.months--container`);
    }

    AddMonth(sectionMarkup, month) {
        this.sectionMonthsContainer.insertAdjacentHTML(`beforeend`, sectionMarkup);
        this.monthSection = this.sectionMonthsContainer.querySelector(`#${month.id}`);

        this.cardsContainer = this.monthSection.querySelector(`.cards-container`);
        const daysNameDiv = this.monthSection.querySelector(`.days-name`);
        const monthName = this.monthSection.querySelector(`.month-name`);

        //ADD CALENDAR COMPONENT: -----------------------
        this.AddDayNames(daysNameDiv);
        this.AddPlaceholder(this.cardsContainer, month);
        this.AddDays(this.cardsContainer, month);
    }

    AddDayNames(daysNameDiv) {
        daysName.forEach((day) => {
            const sorterDayName = day[0].slice(0, 3).toUpperCase();
            const dayNameMarkup = view.DayNameMarkup(sorterDayName);
            daysNameDiv.insertAdjacentHTML(`beforeend`, dayNameMarkup);
        });
    }

    AddPlaceholder(cardsContainer, year) {
        const dateOf = new Date(`${this.currentYear} ${year.month} ${1}`);
        //result example: Sat Jan 01 2022 00:00:00 GMT+0100 (közép-európai téli idő)

        const sortDateOF = dateOf.toString().slice(0, 3);
        console.log(dateOf);

        let startIndexOfDay = daysName.find((day, i) => {
            if (day[0].slice(0, 3) === sortDateOF) return i;
        });

        for (let i = 0; i < startIndexOfDay; i++) {
            cardsContainer.insertAdjacentHTML(`beforeend`, view.DayPlaceHolderMarkup());
        }
    }

    AddDays(cardsContainer, month) {
        for (let i = 1; i <= month.days; i++) {
            cardsContainer.insertAdjacentHTML(`beforeend`, view.DayMarkup(month, i));
        }
    }
}

new App();

// #region BACKUP CODES:

// MonthViewEvent(e) {
//     //hide all months and show only one.
//     const month = e.target.closest(`.month`);
//     if (!month) return;

//     this.sectionMonthsContainer.innerHTML = ``;
//     const monthObject = year.find((val) => val.id === month.id);
//     this.Generate_Single_MonthHTML(monthObject);
//     //TODO: move to calling method
//     this.ChangeFullSideView();
// }

//----------------------------------------------------------------
// this.cardsContainer = this.monthSection.querySelector(`.cards-container`);

// const dateOf = new Date(`2022 ${year.month} ${1}`);
// const sortDateOF = dateOf.toString().slice(0, 3);
// let startIndexOfDay = ``;

// daysName.forEach((day) => {
//     const [name, index] = day;

//     if (name.slice(0, 3) === sortDateOF) {
//         startIndexOfDay = index;
//     }
// });
// console.log(startIndexOfDay);

// for (let i = 0; i < startIndexOfDay; i++) {
//     //add daycard to month section
//     this.cardsContainer.insertAdjacentHTML(`beforeend`, view.DayPlaceHolderMarkup());
// }

//----------------------------------------------------------------

// const daysNameDiv = this.monthSection.querySelector(`.days-name`);

// daysName.forEach((day) => {
//     const sorterDayName = day[0].slice(0, 3).toUpperCase();
//     const dayNameMarkup = view.DayNameMarkup(sorterDayName);
//     daysNameDiv.insertAdjacentHTML(`beforeend`, dayNameMarkup);
// });

//HTML TAGS:
// <!-- <header>
//     <h1>Funny Calendar</h1>
//     <h2>2022</h2>
// </header>-->

// <!-- <section class="months--container">
//     <section class="month" id="jan">
//             <div class="month-name">${data.month}</div>
//             <div class="cards">
//                 <div class='card'>
//                     <time datetime='DD'>${dayNum}</time>
//                 </div>
//                 <div class='card'>
//                     <time datetime='DD'>${dayNum}</time>
//                 </div>
//                 <div class='card'>
//                     <time datetime='DD'>${dayNum}</time>
//                 </div>
//                 <div class='card'>
//                     <time datetime='DD'>${dayNum}</time>
//                 </div>
//             </div>
//         </section>
//     </section> -->

//     <!-- <aside class="left--side">
//         <div class="calendar-aside">
//             <div>
//                 <p class="calendar-year-large">2022</p>
//                 <p class="calendar-month-large">JAN</p>
//                 <p class="calendar-day-large">05</p>
//             </div>
//         </div>
//         <div class="calendar--logo"><p>OPTIONS</p></div>
//     </aside> -->

//#endregion
