class AccordionItem {
    constructor(title, body, parent) {
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
        this.title = this.createElement(title, accordionItem, "accordion-title");
        this.body = this.createElement(body, accordionItem, "accordion-text");


        parent.append(accordionItem);

        this.state = false;
        this.body.style.display = ("none");

        this.title.addEventListener("click", function () {
            this.state ? this.close() : this.open();
        }.bind(this));

    }

    open() {
        if (!this.state) {
            this.body.style.display = ("block");
            this.state = !this.state;
        }
    }

    close() {
        if (this.state) {
            this.body.style.display = ("none");
            this.state = !this.state;
        }
    }
    createElement(text, parent, className) {
        const accordionElem = document.createElement("p");
        accordionElem.classList.add(className);
        accordionElem.innerText = text;
        parent.append(accordionElem);
        return accordionElem;
    }
}

class Accordion {
    constructor(items) {
        const accordion = document.getElementById("accordion");
        this.accordionItems = [];
        for (const i of items) {
            this.accordionItems.push(new AccordionItem(i.title, i.body, accordion));
        }
        this.open(1);
    }
    open(index) {
        this.accordionItems[index - 1].open();
    }
    close(index) {
        this.accordionItems[index - 1].close();
    }
}

const items = [
    { title: "Accordion 1", body: "Esse amet aute deserunt voluptate aute." },
    { title: "Accordion 2", body: "Ut deserunt ex nostrud id ullamco enim irure." }
];


const accordion = new Accordion(items);

/* accordion.open(1);
accordion.open(2);

accordion.close(1);
accordion.close(2); */