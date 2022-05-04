class DOMError extends Error { };

class BaseComponent {
    constructor(container, props = {}) {
        if (!(container instanceof HTMLElement)) {
            throw new DOMError('Container not found');
        }

        this.container = container;
        this.props = props;
    }
}
class DialogComponent extends BaseComponent {
    constructor(...args) {
        super(...args);
        this.state = true;

        const dialog = this.container;
        dialog.hidden = this.state;
        const buttonOpen = document.querySelector("[data-dialog]");
        buttonOpen.onclick = this.hidden.bind(this, dialog);
        const buttonReject = document.querySelector("[data-dialog-reject]");
        buttonReject.onclick = this.props.onReject.bind(this);
        const buttonSubmit = document.querySelector("[data-dialog-submit]");
        buttonSubmit.onclick = this.props.onSubmit.bind(this);
    }

    hidden(element) {
        this.state = !this.state;
        element.hidden = this.state;
    }
}

const dialogEl = new DialogComponent(document.querySelector(".app-dialog"), {
    onReject: () => {
        dialogEl.hidden(dialogEl.container);
    },
    onSubmit: () => {
        dialogEl.hidden(dialogEl.container);
        alert("Your choice is saved");
    },
});

class RatingComponent extends BaseComponent {
        constructor(...args) {
        super(...args);
        this.ratingArr = Array.from(this.container.children);
        
        this.ratingArr.forEach((star, i) => {
            star.state = { activeIndex: i, isClicked: false };
            star.onclick = this.clickStar.bind(this, star);
            star.onmouseover = this.mouseover.bind(this, star);
            star.onmouseout = this.mouseout.bind(this, star);
        })
    }
    clickStar(element) {
        let currentStarLevel = element.state.activeIndex;

        this.ratingArr.forEach((star, j) => {
            if (currentStarLevel >= j) {
                star.style.filter = "unset";
                star.state.isClicked = true;
            } else {
                star.style.filter = "";
                star.state.isClicked = false;
            }
        })
    }
    mouseover(element) {
        let currentStarLevel = element.state.activeIndex;

        this.ratingArr.forEach((star, j) => {
            if (currentStarLevel >= j) {
                star.style.filter = "grayscale(50%)";
            } else {
                star.style.filter = "";
            }
        })    
    }

    mouseout(element) {
        this.ratingArr.forEach((star, j) => {
            if (!element.state.isClicked) {
                star.style.filter = "";       
            }     
        })
    }


}

const ratingComponent = new RatingComponent(document.querySelector(".app-rating"), {});





































