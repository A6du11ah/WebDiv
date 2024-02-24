function component_controlHandler() {
    let previousSelectedComponentItemlist = null;

    [...document.getElementsByClassName("component-itemlist")].forEach((componentItemlistContainer) => {
        let componentItemlistLabel = componentItemlistContainer.firstElementChild;
        let componentItemlist = componentItemlistContainer.lastElementChild;

        componentItemlistLabel.onclick = function () {
            if (componentItemlist.classList.contains("component-itemlist-expand")) {
                previousSelectedComponentItemlist = null;

                componentItemlist.classList.remove("component-itemlist-expand");
                componentItemlist.classList.add("component-itemlist-collapse");
            } else {
                if (previousSelectedComponentItemlist != null) {
                    previousSelectedComponentItemlist.classList.remove("component-itemlist-expand");
                    previousSelectedComponentItemlist.classList.add("component-itemlist-collapse");
                }

                previousSelectedComponentItemlist = componentItemlist;
                componentItemlist.classList.add("component-itemlist-expand");
                componentItemlist.classList.remove("component-itemlist-collapse");
            }
        };
    });

    [...document.getElementsByClassName("component-item")].forEach(function (componentItem) {
        componentItem.onclick = function () {
            let componentItemName = componentItem.innerText.slice(2, -2);
            let componentItemCode = wdComponentCode.get(componentItemName);

            let wdUserIframe = document.getElementById('display-frame');
            let wdUserDocument = wdUserIframe.contentDocument;

            if (wdSelectedElement != null) {
                wdSelectedElement.innerHTML += componentItemCode;
            } else {
                wdUserDocument.body.innerHTML += componentItemCode;
            }
        };
    });
}

component_controlHandler();