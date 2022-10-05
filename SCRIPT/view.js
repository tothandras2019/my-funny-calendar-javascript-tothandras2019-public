`use strict`;

//List with javascript all the days of this year (in YYYY MM DD format) the following HTML structure:
/* <div class='card'>
    <time datetime='YYYY'>YYYY</time>
    <time datetime='MM'>MM</time>
    <time datetime='DD'>DD</time>
</div>; */

//The html document's <body> element contains only a <div id="root"></div> element. All the other HTML is added with JavaScript.

class View {
    GetMonthContainerHtml() {
        return `
        <section class="months--container">
        </section>`;
    }

    GetAsideHTML() {
        return `
            <aside class="left--side">
                <div class="calendar-aside">
                    <div>
                        <p class="calendar-year-large">2022</p>
                        <p class="calendar-month-large">JAN</p>
                        <p class="calendar-day-large">05</p>
                    </div>
                </div>
                <section class="aside--months--container">
                </section>  
                <div class="calendar--logo">
                    <p>Pointed day</p>
                    <p class="pointed-day"></p>
                </div>                
                <div class="Reset">
                    <p>Reset</p>
                    
                </div>
            </aside>`;
    }

    MonthMarkup(data, monthSectionType = "") {
        return `
        <section class="month ${monthSectionType}" id="${data.id}">
            <div class="month-name">${data.month}</div>
            <div class="days-name"></div>
            <div class="cards-container"></div>
        </section>`;
    }

    DayNameMarkup(dayName) {
        return `<p class="day-name" id="${dayName}">${dayName}</p>`;
    }

    DayPlaceHolderMarkup() {
        return `
            <div class='placeholder'>
                <time datetime='DD'></time>
            </div>`;
    }

    DayMarkup(data, dayNum) {
        return `
            <div class='day'>
                <time datetime='DD'>${dayNum}</time>
            </div>`;
    }
}

export default new View();
