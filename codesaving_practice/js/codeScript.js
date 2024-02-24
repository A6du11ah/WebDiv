function codeMirrorTextEditor_initializer() {
    let codeMirrorHTMLTextArea = CodeMirror.fromTextArea(document.getElementById('html-code'), {
        mode: "text/html",
        lineNumbers: true,
        lineWrapping: true,
        theme: "lucario",
        keyMap: "sublime",
        scrollbarStyle: "overlay",
        extraKeys: { "Ctrl-Space": "autocomplete" },
        matchBrackets: true,
        matchTags: true,
        highlightSelectionMatches: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        foldGutter: true,
        foldCode: true
    });

    codeMirrorHTMLTextArea.setSize("100%", "100%");

    CodeMirror.fromTextArea(document.getElementById('css-code'), {
        mode: "text/css",
        lineNumbers: true,
        lineWrapping: true,
        theme: "lucario",
        keyMap: "sublime",
        extraKeys: { "Ctrl-Space": "autocomplete" },
        scrollbarStyle: "overlay",
        matchBrackets: true,
        matchTags: true,
        highlightSelectionMatches: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        foldGutter: true,
        foldCode: true
    }).setSize("100%", "100%");

    CodeMirror.fromTextArea(document.getElementById('js-code'), {
        mode: "javascript",
        lineNumbers: true,
        lineWrapping: true,
        theme: "lucario",
        keyMap: "sublime",
        scrollbarStyle: "overlay",
        extraKeys: { "Ctrl-Space": "autocomplete" },
        matchBrackets: true,
        matchTags: true,
        highlightSelectionMatches: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        foldGutter: true,
        foldCode: true
    }).setSize("100%", "100%");

    let saveBTN = document.getElementById("save-tool");

    function getUserCode() {
        let userCode = document.getElementById("display-frame").contentDocument.body.innerHTML;
        userCode = userCode.split("<!-- usercode -->")[1].split("</body>")[0];
        return userCode;
    }

    saveBTN.onclick = function () {
        codeMirrorHTMLTextArea.setValue(getUserCode());
        // codeMirrorHTMLTextArea.autoFormatRange(
        //     codeMirrorHTMLTextArea.getCursor(true),
        //     codeMirrorHTMLTextArea.getCursor(false)
        // );
    }
}

function resize_interactionHandler() {
    let resizeBar = document.getElementById("resize-bar");
    let resizeButton = document.getElementById("resize-button");

    let controlArea = document.getElementById("control-area");
    let outputArea = document.getElementById("output-area");
    let codeArea = document.getElementById("code-area");

    let curPrevX, curPrevY, outputAreaPrevW, codeAreaPrevW, codeAreaPrevWP;
    let bodyW = parseInt(window.getComputedStyle(document.body).width, 10);

    let codeTitleBarHandles = document.getElementsByClassName("code-title-bar-layer");

    let currCodeContNum, currCodeCont, prevOfCurrCodeCont, otherCodeCont, currSelCodeContPrevH, prevOfCurrSelCodeContPrevH, otherCodeContPrevH;
    let minCodeContH = (1.5 * parseInt(window.getComputedStyle(codeTitleBarHandles[0].parentElement).height, 10));

    ////////////////////////////////////////////////////////////////

    function resizeVSlider_mouseDownHandler(e) {
        if (codeArea.style.width != "0%") {
            curPrevX = e.clientX;

            outputAreaPrevW = parseInt(window.getComputedStyle(outputArea).width, 10);
            codeAreaPrevW = parseInt(window.getComputedStyle(codeArea).width, 10);

            outputArea.style.pointerEvents = "none";

            document.addEventListener("mousemove", resizeVSlider_mouseMoveHandler);
            document.addEventListener("mouseup", resizeVSlider_mouseUpHandler);
        }
    }

    function resizeVSlider_mouseMoveHandler(e) {
        let controlAreaW = parseInt(window.getComputedStyle(controlArea).width, 10);

        let dX = e.clientX - curPrevX;

        let outputAreaCurrW = outputAreaPrevW + dX;
        let outputAreaCurrWP = 100 * outputAreaCurrW / bodyW;

        let codeAreaCurrW = codeAreaPrevW - dX;
        let codeAreaCurrWP = 100 * codeAreaCurrW / bodyW;

        if (outputAreaCurrWP <= 0) {
            outputArea.style.width = "0%";
            codeArea.style.width = `calc(100% - 0.9rem - ${controlAreaW}px)`;
        } else if (codeAreaCurrWP >= 25) {
            outputArea.style.width = `${outputAreaCurrWP}%`;
            codeArea.style.width = `calc(100% - ${outputAreaCurrWP}% - 0.9rem - ${controlAreaW}px)`;
        } else if (codeAreaCurrWP < 25) {
            outputArea.style.width = `calc(75% - 0.9rem - ${controlAreaW}px)`;
            codeArea.style.width = "25%";
        }
    }

    function resizeVSlider_mouseUpHandler() {
        outputArea.style.pointerEvents = "auto";

        document.removeEventListener("mouseup", resizeVSlider_mouseUpHandler);
        document.removeEventListener("mousemove", resizeVSlider_mouseMoveHandler);
    }

    ////////////////////////////////////////////////////////////////////////

    function resizeHSlider_mouseDownHandler(e) {
        curPrevY = e.clientY;

        currCodeCont = e.target.parentElement.parentElement;
        currSelCodeContPrevH = parseInt(window.getComputedStyle(currCodeCont).height, 10);

        prevOfCurrCodeCont = currCodeCont.previousElementSibling;
        prevOfCurrSelCodeContPrevH = parseInt(window.getComputedStyle(prevOfCurrCodeCont).height, 10);

        for (let i = 0; i < codeTitleBarHandles.length; i++) {
            let currIterCodeCont = codeTitleBarHandles[i].parentElement.parentElement;

            if (currIterCodeCont != prevOfCurrCodeCont && currIterCodeCont != currCodeCont) {
                currCodeContNum = (i == 0 ? 3 : 2);

                otherCodeCont = currIterCodeCont;
                otherCodeContPrevH = parseInt(window.getComputedStyle(currIterCodeCont).height, 10);
            }
        }

        document.addEventListener("mousemove", resizeHSlider_mouseMoveHandler);
        document.addEventListener("mouseup", resizeHSlider_mouseUpHandler);
    }

    function resizeHSlider_mouseMoveHandler(e) {
        let dY = e.clientY - curPrevY;

        let currSelCodeContCurrH = currSelCodeContPrevH - dY;
        let prevOfCurrSelCodeContCurrH = prevOfCurrSelCodeContPrevH + dY;

        if (dY > 0 && currSelCodeContCurrH >= minCodeContH) {
            currCodeCont.style.height = `${currSelCodeContCurrH}px`;
            prevOfCurrCodeCont.style.height = `calc(100% - ${currSelCodeContCurrH}px - ${otherCodeContPrevH}px)`;
            otherCodeCont.style.height = `${otherCodeContPrevH}px`;
        } else if (dY > 0 && currCodeContNum == 3 && currSelCodeContPrevH >= minCodeContH) {
            currCodeCont.style.height = `${minCodeContH}px`;
            prevOfCurrCodeCont.style.height = `calc(100% - ${minCodeContH}px - ${otherCodeContPrevH}px)`;
            otherCodeCont.style.height = `${otherCodeContPrevH}px`;
        } else if (dY > 0 && currCodeContNum == 2) {
            let otherCodeContCurrH = otherCodeContPrevH - dY + (currSelCodeContPrevH - minCodeContH);

            if (otherCodeContCurrH >= minCodeContH) {
                currCodeCont.style.height = `${minCodeContH}px`;
                prevOfCurrCodeCont.style.height = `calc(100% - ${minCodeContH}px - ${otherCodeContCurrH}px)`;
                otherCodeCont.style.height = `${otherCodeContCurrH}px`;
            } else if (otherCodeContPrevH >= minCodeContH) {
                currCodeCont.style.height = `${minCodeContH}px`;
                prevOfCurrCodeCont.style.height = `calc(100% - ${2 * minCodeContH}px)`;
                otherCodeCont.style.height = `${minCodeContH}px`;
            }
        } else if (dY < 0 && prevOfCurrSelCodeContCurrH >= minCodeContH) {
            prevOfCurrCodeCont.style.height = `${prevOfCurrSelCodeContCurrH}px`;
            currCodeCont.style.height = `calc(100% - ${prevOfCurrSelCodeContCurrH}px - ${otherCodeContPrevH}px)`;
            otherCodeCont.style.height = `${otherCodeContPrevH}px`;
        } else if (dY < 0 && currCodeContNum == 2 && prevOfCurrSelCodeContPrevH >= minCodeContH) {
            prevOfCurrCodeCont.style.height = `${minCodeContH}px`;
            currCodeCont.style.height = `calc(100% - ${minCodeContH}px - ${otherCodeContPrevH}px)`;
            otherCodeCont.style.height = `${otherCodeContPrevH}px`;
        } else if (dY < 0 && currCodeContNum == 3) {
            let otherCodeContCurrH = otherCodeContPrevH + dY + (prevOfCurrSelCodeContPrevH - minCodeContH);

            if (otherCodeContCurrH >= minCodeContH) {
                currCodeCont.style.height = `calc(100% - ${minCodeContH}px - ${otherCodeContCurrH}px)`;
                prevOfCurrCodeCont.style.height = `${minCodeContH}px`;
                otherCodeCont.style.height = `${otherCodeContCurrH}px`;
            } else if (otherCodeContPrevH >= minCodeContH) {
                currCodeCont.style.height = `calc(100% - ${2 * minCodeContH}px)`;
                prevOfCurrCodeCont.style.height = `${minCodeContH}px`;
                otherCodeCont.style.height = `${minCodeContH}px`;
            }
        }
    }

    function resizeHSlider_mouseUpHandler() {
        document.removeEventListener("mouseup", resizeHSlider_mouseUpHandler);
        document.removeEventListener("mousemove", resizeHSlider_mouseMoveHandler);
    }

    ////////////////////////////////////////////////////////////////////////

    resizeBar.addEventListener("mousedown", resizeVSlider_mouseDownHandler);

    resizeButton.addEventListener("click", () => {
        let controlAreaW = parseInt(window.getComputedStyle(controlArea).width, 10);

        if (codeArea.style.width == "0%") {
            outputArea.style.width = `max(0px, calc(100% - ${codeAreaPrevWP}% - 0.9rem - ${controlAreaW}px))`;
            codeArea.style.width = `min(calc(100% - 0.9rem - ${controlAreaW}px), ${codeAreaPrevWP}%)`;
            resizeBar.style.cursor = "col-resize";

            outputArea.style.transition = "width 0.4s";
            codeArea.style.transition = "width 0.4s";

            setTimeout(() => {
                outputArea.style.transition = "none";
                codeArea.style.transition = "none";
            }, 400);

            resizeButton.firstElementChild.style.display = "block";
            resizeButton.lastElementChild.style.display = "none";
        } else {
            codeAreaPrevWP = (100 * parseInt(window.getComputedStyle(codeArea).width, 10) / bodyW);

            outputArea.style.width = `calc(100% - 0.9rem - ${controlAreaW}px)`;
            codeArea.style.width = "0%";
            resizeBar.style.cursor = "auto";

            outputArea.style.transition = "width 0.4s";
            codeArea.style.transition = "width 0.4s";

            setTimeout(() => {
                outputArea.style.transition = "none";
                codeArea.style.transition = "none";
            }, 400);

            resizeButton.lastElementChild.style.display = "block";
            resizeButton.firstElementChild.style.display = "none";
        }
    });

    codeTitleBarHandles[1].addEventListener("mousedown", resizeHSlider_mouseDownHandler);
    codeTitleBarHandles[2].addEventListener("mousedown", resizeHSlider_mouseDownHandler);

    for (let i = 0; i < codeTitleBarHandles.length; i++) {
        codeTitleBarHandles[i].parentElement.addEventListener("dblclick", () => {
            let expandCodeCont = false;

            for (let j = 0; j < codeTitleBarHandles.length; j++) {
                if (i != j && parseInt(window.getComputedStyle(codeTitleBarHandles[j].parentElement.parentElement).height, 10) != minCodeContH) {
                    expandCodeCont = true;
                }
            }

            if (expandCodeCont) {
                codeTitleBarHandles[i].parentElement.parentElement.style.height = `calc(100% - ${2 * minCodeContH}px)`;

                for (let j = 0; j < codeTitleBarHandles.length; j++) {
                    if (i != j) {
                        codeTitleBarHandles[j].parentElement.parentElement.style.height = `${minCodeContH}px`;
                    }
                }

                [...codeTitleBarHandles].forEach(codeTitleBarHandle => {
                    codeTitleBarHandle.parentElement.parentElement.style.transition = "height 0.4s";
                });

                setTimeout(() => {
                    [...codeTitleBarHandles].forEach(codeTitleBarHandle => {
                        codeTitleBarHandle.parentElement.parentElement.style.transition = "none";
                    });
                }, 400);
            }
        });
    }
}

codeMirrorTextEditor_initializer();
resize_interactionHandler();