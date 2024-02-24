function actionToolbar_controlHandler() {
    let controlPane = document.getElementById('control-pane');
    let controlPaneButton = document.getElementById('control-pane-button');

    let componentPane = document.getElementById("component-pane");
    let propertyPane = document.getElementById("property-pane");

    let outputArea = document.getElementById('output-area');
    let codeArea = document.getElementById('code-area');

    let contrPanePrevW;

    controlPaneButton.onclick = function () {
        let outputAreaPrevW = parseInt(window.getComputedStyle(outputArea).width, 10);

        if (controlPane.style.width != "0rem") {
            contrPanePrevW = parseInt(window.getComputedStyle(controlPane).width, 10);

            controlPane.style.overflow = "hidden";
            controlPane.style.width = "0rem";

            outputArea.style.width = `${outputAreaPrevW + contrPanePrevW + 1}px`;

            controlPaneButton.firstElementChild.style.display = "block";
            controlPaneButton.lastElementChild.style.display = "none";
        } else {
            setTimeout(() => { controlPane.style.overflow = "visible"; }, 400);
            controlPane.style.width = `${contrPanePrevW}px`;

            let dX = outputAreaPrevW - contrPanePrevW;

            if (dX >= 0) {
                outputArea.style.width = `${dX}px`;
            } else {
                let codeAreaPrevW = parseInt(window.getComputedStyle(codeArea).width, 10);

                outputArea.style.width = "0%";
                codeArea.style.width = `${codeAreaPrevW + dX + 1}px`;
            }

            controlPaneButton.firstElementChild.style.display = "none";
            controlPaneButton.lastElementChild.style.display = "block";
        }

        outputArea.style.transition = "width 0.4s";
        codeArea.style.transition = "width 0.4s";

        setTimeout(() => {
            outputArea.style.transition = "none";
            codeArea.style.transition = "none";
        }, 400);
    };

    function preProcessActionTool_controlHandler() {
        let controlMode = "none";

        let landingElement = null;
        let varSelector, fixSelector, resizer;

        function selectActionTool_controlHandler() {
            controlMode = "selection";

            let wdUserDocument = document.getElementById("display-frame").contentDocument;

            [...wdUserDocument.getElementsByClassName("wd-component")].forEach(eachComp => {
                eachComp.onmouseover = function (mouseOverEvent) {
                    if (eachComp != wdSelectedElement) attachSelector(eachComp, varSelector);

                    mouseOverEvent.stopPropagation();
                };

                eachComp.onmouseleave = function () {
                    if (eachComp != wdSelectedElement) detachSelector(varSelector);
                };

                eachComp.onclick = function (mouseClickEvent) {
                    detachSelector(varSelector);
                    attachSelector(eachComp, fixSelector);

                    wdSelectedElement = eachComp;

                    let propertyTool = document.getElementById("property-tool");

                    propertyTool.classList.remove("action-tool-option-inactive");
                    propertyTool.classList.add("action-tool-option-active");

                    mouseClickEvent.stopPropagation();
                };
            });
        }

        function attachSelector(anyComp, anySelector) {
            let compObjStyle = window.getComputedStyle(anyComp);

            let compObjVerticalMargin = parseInt(compObjStyle.marginTop, 10) + parseInt(compObjStyle.marginBottom, 10);
            let compObjVerticalBorder = parseInt(compObjStyle.borderTop, 10) + parseInt(compObjStyle.borderBottom, 10);
            let compObjVerticalPadding = parseInt(compObjStyle.paddingTop, 10) + parseInt(compObjStyle.paddingBottom, 10);
            let compObjTotalHeight = parseInt(compObjStyle.height, 10) + compObjVerticalPadding + compObjVerticalBorder + compObjVerticalMargin;

            let compObjHorizontalMargin = parseInt(compObjStyle.marginLeft, 10) + parseInt(compObjStyle.marginRight, 10);
            let compObjHorizontalBorder = parseInt(compObjStyle.borderLeft, 10) + parseInt(compObjStyle.borderRight, 10);
            let compObjHorizontalPadding = parseInt(compObjStyle.paddingLeft, 10) + parseInt(compObjStyle.paddingRight, 10);
            let compObjTotalWidth = parseInt(compObjStyle.width, 10) + compObjHorizontalPadding + compObjHorizontalBorder + compObjHorizontalMargin;

            let compObjRect = anyComp.getBoundingClientRect();

            anySelector.style.display = "block";
            anySelector.style.height = `${compObjTotalHeight}px`;
            anySelector.style.width = `${compObjTotalWidth}px`;
            anySelector.style.translate = `${compObjRect.x}px ${compObjRect.y}px`;
        }

        function detachSelector(anySelector) {
            anySelector.style.display = "none";
        }

        function fetchComponentTranslateValues(translateString) {
            let translateValuesStringArray = translateString.split(" ");

            if (translateValuesStringArray[0] == "none") return [0, 0];
            else if (translateValuesStringArray.length == 1) return [parseInt(translateValuesStringArray[0], 10), 0];
            else return [parseInt(translateValuesStringArray[0], 10), parseInt(translateValuesStringArray[1], 10)];
        }

        function moveActionTool_controlHandler() {
            controlMode = "movement";

            if (wdSelectedElement == null) return;

            wdSelectedElement.onmousedown = function (initEvent) {
                initMovement(initEvent);
            };
        }

        function initMovement(initEvent) {
            let prevCurPosX = initEvent.clientX;
            let prevCurPosY = initEvent.clientY;

            let selElemPrevTran = fetchComponentTranslateValues(window.getComputedStyle(wdSelectedElement).translate);
            let selElemPrevPos = wdSelectedElement.getBoundingClientRect();

            let wdUserDocument = document.getElementById("display-frame").contentDocument;

            wdUserDocument.onmousemove = function (detectEvent) {
                detectMovement(detectEvent, prevCurPosX, prevCurPosY, selElemPrevTran, selElemPrevPos);
            };

            wdUserDocument.onmouseup = function () {
                endMovement();
            };
        }

        function detectMovement(detectEvent, prevCurPosX, prevCurPosY, selElemPrevTran, selElemPrevPos) {
            let currCurPosX = detectEvent.clientX;
            let currCurPosY = detectEvent.clientY;

            let dX = currCurPosX - prevCurPosX;
            let dY = currCurPosY - prevCurPosY;

            wdSelectedElement.style.translate = `${selElemPrevTran[0] + dX}px ${selElemPrevTran[1] + dY}px`;
            fixSelector.style.translate = `${selElemPrevPos.x + dX}px ${selElemPrevPos.y + dY}px`;
        }

        function endMovement() {
            let wdUserDocument = document.getElementById("display-frame").contentDocument;

            wdUserDocument.onmouseup = function () { };
            wdUserDocument.onmousemove = function () { };
        }

        function dragActionTool_controlHandler() {
            controlMode = "drag-and-drop";

            if (wdSelectedElement == null) return;

            wdSelectedElement.onmousedown = function (initEvent) {
                initDrop(initEvent);
            };
        }

        function initDrop(initEvent) {
            let prevCurPosX = initEvent.clientX;
            let prevCurPosY = initEvent.clientY;

            let selElemPrevPos = wdSelectedElement.getBoundingClientRect();
            let selElemDescendants = [...wdSelectedElement.querySelectorAll('.wd-component')];

            detachSelector(fixSelector);

            let wdUserDocument = document.getElementById("display-frame").contentDocument;

            [...wdUserDocument.getElementsByClassName("wd-component")].forEach(eachComp => {
                if (eachComp != wdSelectedElement && selElemDescendants.indexOf(eachComp) == -1) {
                    eachComp.onmouseover = function (mouseOverEvent) {
                        attachSelector(eachComp, varSelector);

                        landingElement = eachComp;

                        mouseOverEvent.stopPropagation();
                    };

                    eachComp.onmouseleave = function () {
                        detachSelector(varSelector);

                        landingElement = null;
                    };
                }
            });

            let dragPreviewComp = setupDragPreview(selElemPrevPos);

            wdUserDocument.onmousemove = function (detectEvent) {
                detectDrop(detectEvent, prevCurPosX, prevCurPosY, dragPreviewComp);
            };

            wdUserDocument.onmouseup = function () {
                endDrop(dragPreviewComp, selElemDescendants);
            };
        }

        function detectDrop(detectEvent, prevCurPosX, prevCurPosY, dragPreviewComp) {
            let currCurPosX = detectEvent.clientX;
            let currCurPosY = detectEvent.clientY;

            let dX = currCurPosX - prevCurPosX;
            let dY = currCurPosY - prevCurPosY;

            dragPreviewComp.style.translate = `${dX}px ${dY}px`;
        }

        function endDrop(dragPreviewComp, selElemDescendants) {
            if (landingElement != null) {
                landingElement.prepend(wdSelectedElement);
                landingElement = null;

                wdSelectedElement.style.translate = `0px 0px`;

                detachSelector(varSelector);
            }

            attachSelector(wdSelectedElement, fixSelector);

            let wdUserDocument = document.getElementById("display-frame").contentDocument;

            [...wdUserDocument.getElementsByClassName("wd-component")].forEach(eachComp => {
                if (eachComp != wdSelectedElement && selElemDescendants.indexOf(eachComp) == -1) {
                    eachComp.onmouseover = function () { };
                    eachComp.onmouseleave = function () { };
                }
            });

            dragPreviewComp.remove();

            wdUserDocument.onmouseup = function () { };
            wdUserDocument.onmousemove = function () { };
        }

        function setupDragPreview(selElemPrevPos) {
            let previewComp = wdSelectedElement.cloneNode(true);

            previewComp.style.opacity = "0.375";
            previewComp.style.zIndex = "1000";
            previewComp.style.position = "absolute";
            previewComp.style.pointerEvents = "none";
            previewComp.style.top = `${selElemPrevPos.y}px`;
            previewComp.style.left = `${selElemPrevPos.x}px`;
            previewComp.style.translate = "0px 0px";

            let wdUserDocument = document.getElementById("display-frame").contentDocument;
            wdUserDocument.body.prepend(previewComp);

            return previewComp;
        }

        function resizeActionTool_controlHandler() {
            controlMode = "resize";

            if (wdSelectedElement == null) return;

            activateResizer();
            resizer.onmousedown = function (initEvent) {
                initResize(initEvent);
            };
        }

        function initResize(initEvent) {
            let prevCurPosX = initEvent.clientX;
            let prevCurPosY = initEvent.clientY;

            let selElemStyle = window.getComputedStyle(wdSelectedElement);
            let selElemPrevHeight = parseInt(selElemStyle.height, 10);
            let selElemPrevWidth = parseInt(selElemStyle.width, 10);
            let selElemPrevCompPos = [parseInt(selElemStyle.top, 10), parseInt(selElemStyle.left, 10)];

            let fixSelecStyle = window.getComputedStyle(fixSelector);
            let fixSelecPrevHeight = parseInt(fixSelecStyle.height, 10);
            let fixSelecPrevWidth = parseInt(fixSelecStyle.width, 10);

            let resizerStyle = window.getComputedStyle(resizer);
            let minHeight = parseInt(resizerStyle.height, 10) + parseInt(resizerStyle.borderTop, 10) + parseInt(resizerStyle.borderBottom, 10);
            let minWidth = parseInt(resizerStyle.width, 10) + parseInt(resizerStyle.borderLeft, 10) + parseInt(resizerStyle.borderRight, 10);

            let wdUserDocument = document.getElementById("display-frame").contentDocument;

            wdUserDocument.onmousemove = function (detectEvent) {
                detectResize(detectEvent, prevCurPosX, prevCurPosY, selElemPrevHeight, selElemPrevWidth, selElemPrevCompPos, fixSelecPrevHeight, fixSelecPrevWidth, minHeight, minWidth);
            };

            wdUserDocument.onmouseup = function () {
                endResize();
            };
        }

        function detectResize(detectEvent, prevCurPosX, prevCurPosY, selElemPrevHeight, selElemPrevWidth, selElemPrevCompPos, fixSelecPrevHeight, fixSelecPrevWidth, minHeight, minWidth) {
            let currCurPosX = detectEvent.clientX;
            let currCurPosY = detectEvent.clientY;

            let dX = currCurPosX - prevCurPosX;
            let dY = currCurPosY - prevCurPosY;

            let selElemCurrHeight = selElemPrevHeight + dY;
            let selElemCurrWidth = selElemPrevWidth + dX;

            if (selElemCurrHeight >= minHeight) {
                wdSelectedElement.style.height = `${selElemCurrHeight}px`;
                fixSelector.style.height = `${fixSelecPrevHeight + dY}px`;
            } else {
                wdSelectedElement.style.height = `${minHeight}px`;
                fixSelector.style.height = `${fixSelecPrevHeight + minHeight - selElemPrevHeight}px`;
            }

            if (selElemCurrWidth >= minWidth) {
                wdSelectedElement.style.width = `${selElemCurrWidth}px`;
                fixSelector.style.width = `${fixSelecPrevWidth + dX}px`;
            } else {
                wdSelectedElement.style.width = `${minWidth}px`;
                fixSelector.style.width = `${fixSelecPrevWidth + minWidth - selElemPrevWidth}px`;
            }

            wdSelectedElement.style.top = `${selElemPrevCompPos[0]}px`;
            wdSelectedElement.style.left = `${selElemPrevCompPos[1]}px`;
        }

        function endResize() {
            let wdUserDocument = document.getElementById("display-frame").contentDocument;

            wdUserDocument.onmouseup = function () { };
            wdUserDocument.onmousemove = function () { };
        }

        function activateResizer() {
            resizer.style.pointerEvents = "auto";
            resizer.style.cursor = "nw-resize";
        }

        function deactivateResizer() {
            resizer.style.pointerEvents = "none";
            resizer.style.cursor = "auto";
        }

        // function addEditContentHandler() {
        //     controlMode = "edit-content";

        //     if (selectedElement == null) return;

        //     selectedElement.contentEditable = true;
        // }

        function btfActionTool_controlHandler() {
            controlMode = "bring-to-front";

            if (wdSelectedElement == null) return;

            if (wdSelectedElement.style.zIndex == "auto") wdSelectedElement.style.zIndex = "0";
            wdSelectedElement.style.zIndex = `${parseInt(wdSelectedElement.style.zIndex) + 1}`;
        }

        function stbActionTool_controlHandler() {
            controlMode = "send-to-back";

            if (wdSelectedElement == null) return;

            if (wdSelectedElement.style.zIndex == "auto") wdSelectedElement.style.zIndex = "0";
            wdSelectedElement.style.zIndex = `${parseInt(wdSelectedElement.style.zIndex) - 1}`;
        }

        function actionToolControl_reset() {
            controlMode = "none";

            let propertyTool = document.getElementById("property-tool");

            propertyTool.classList.remove("action-tool-option-active");
            propertyTool.classList.add("action-tool-option-inactive");

            detachSelector(fixSelector);
            wdSelectedElement = null;
        }

        function actionToolControl_remove() {
            if (controlMode == "selection") {
                let wdUserDocument = document.getElementById("display-frame").contentDocument;

                [...wdUserDocument.getElementsByClassName("wd-component")].forEach(eachComp => {
                    eachComp.onmouseover = function () { };
                    eachComp.onmouseleave = function () { };
                    eachComp.onclick = function () { };
                });
            }

            if (wdSelectedElement == null) return;

            if (controlMode == "movement") {
                wdSelectedElement.onmousedown = function () { };
            }

            if (controlMode == "drag-and-drop") {
                wdSelectedElement.onmousedown = function () { };
            }

            if (controlMode == "resize") {
                deactivateResizer();
                resizer.onmousedown = function () { };
            }

            // if (controlMode == "edit-content") {
            //     wdSelectedElement.contentEditable = false;
            // }
        }

        function actionToolBarHandler() {
            let selectedActionToolOption = null;

            function turnOffActionToolOption() {
                if (selectedActionToolOption != null) {
                    selectedActionToolOption.classList.remove("action-tool-option-pressed");
                    selectedActionToolOption.classList.add("action-tool-option-active");
                }
            }

            function turnOnActionToolOption(anyActionToolOption) {
                selectedActionToolOption = anyActionToolOption;

                selectedActionToolOption.classList.add("action-tool-option-pressed");
                selectedActionToolOption.classList.remove("action-tool-option-active");
            }

            [...document.querySelectorAll("#action-tool-preprocessing-options .action-tool-option")].forEach((actionToolOption, actionToolOptionIdx) => {
                actionToolOption.onclick = function () {
                    turnOffActionToolOption();
                    turnOnActionToolOption(actionToolOption);

                    let wdUserDocument = document.getElementById("display-frame").contentDocument;

                    varSelector = wdUserDocument.getElementById("wd-support-selectable");
                    fixSelector = wdUserDocument.getElementById("wd-support-selected");
                    resizer = wdUserDocument.getElementById("wd-support-resizer");

                    actionToolControl_remove();

                    if (actionToolOptionIdx == 0) selectActionTool_controlHandler();
                    else if (actionToolOptionIdx == 1) moveActionTool_controlHandler();
                    else if (actionToolOptionIdx == 2) dragActionTool_controlHandler();
                    else if (actionToolOptionIdx == 3) resizeActionTool_controlHandler();
                    else if (actionToolOptionIdx == 4) {
                        btfActionTool_controlHandler();
                        turnOffActionToolOption();
                    } else if (actionToolOptionIdx == 5) {
                        stbActionTool_controlHandler();
                        turnOffActionToolOption();
                    } else {
                        actionToolControl_reset();
                        turnOffActionToolOption();
                    }
                }
            });
        }

        actionToolBarHandler();
    }

    function processActionTool_controlHandler() {
        let tempComp;
        let componentToolButton = document.getElementById("component-tool");
        let propertyToolButton = document.getElementById("property-tool");

        document.getElementById("component-tool").onclick = function (e) {
            let outputAreaPrevW = parseInt(window.getComputedStyle(outputArea).width, 10);
            let codeAreaPrevW = parseInt(window.getComputedStyle(codeArea).width, 10);

            if (componentToolButton.classList.contains("action-tool-option-pressed")) {
                componentPane.style.width = "0rem";
                controlPane.style.width = "5.125rem";

                tempComp = null;

                componentToolButton.classList.remove("action-tool-option-pressed");
                componentToolButton.classList.add("action-tool-option-active");

                outputArea.style.width = `calc(${outputAreaPrevW + 1}px + 12.5rem)`;
            } else {
                if (tempComp != null) {
                    propertyPane.style.width = "0rem";
                    controlPane.style.width = "5.125rem";

                    propertyToolButton.classList.remove("action-tool-option-pressed");
                    propertyToolButton.classList.add("action-tool-option-active");

                    outputArea.style.width = `calc(${outputAreaPrevW + 1}px + 18rem)`;
                }

                componentPane.style.width = "12.5rem";
                controlPane.style.width = "17.825rem";

                tempComp = controlPane;

                componentToolButton.classList.add("action-tool-option-pressed");
                componentToolButton.classList.remove("action-tool-option-active");

                let dX = outputAreaPrevW - parseInt(window.getComputedStyle(componentPane).width, 10);

                if (dX >= 0) {
                    outputArea.style.width = `${dX}px`;
                } else {
                    outputArea.style.width = "0%";
                    codeArea.style.width = `${codeAreaPrevW + dX + 1}px`;
                }
            }

            outputArea.style.transition = "width 0.4s";
            codeArea.style.transition = "width 0.4s";

            setTimeout(() => {
                outputArea.style.transition = "none";
                codeArea.style.transition = "none";
            }, 400);
        };

        document.getElementById("property-tool").onclick = function (e) {
            let outputAreaPrevW = parseInt(window.getComputedStyle(outputArea).width, 10);
            let codeAreaPrevW = parseInt(window.getComputedStyle(codeArea).width, 10);

            if (propertyToolButton.classList.contains("action-tool-option-pressed")) {
                propertyPane.style.width = "0rem";
                controlPane.style.width = "5.125rem";

                tempComp = null;

                propertyToolButton.classList.remove("action-tool-option-pressed");
                propertyToolButton.classList.add("action-tool-option-active");

                outputArea.style.width = `calc(${outputAreaPrevW + 1}px + 18rem)`;
            } else {
                if (tempComp != null) {
                    componentPane.style.width = "0rem";
                    controlPane.style.width = "5.125rem";

                    tempComp = null;

                    componentToolButton.classList.remove("action-tool-option-pressed");
                    componentToolButton.classList.add("action-tool-option-active");

                    outputArea.style.width = `calc(${outputAreaPrevW + 1}px + 12.5rem)`;
                }

                propertyPane.style.width = "18rem";
                controlPane.style.width = "23.325rem";

                tempComp = propertyPane;

                propertyToolButton.classList.add("action-tool-option-pressed");
                propertyToolButton.classList.remove("action-tool-option-active");

                let dX = outputAreaPrevW - parseInt(window.getComputedStyle(propertyPane).width, 10);

                if (dX >= 0) {
                    outputArea.style.width = `${dX}px`;
                } else {
                    outputArea.style.width = "0%";
                    codeArea.style.width = `${codeAreaPrevW + dX + 1}px`;
                }
            }

            outputArea.style.transition = "width 0.4s";
            codeArea.style.transition = "width 0.4s";

            setTimeout(() => {
                outputArea.style.transition = "none";
                codeArea.style.transition = "none";
            }, 400);
        };
    }

    function postProcessActionTool_controlHandler() {

    }

    preProcessActionTool_controlHandler();
    processActionTool_controlHandler();
    postProcessActionTool_controlHandler();
}

function actionMenu_controlHandler() {
    let actionMenu = document.getElementById('action-menu-logo');

    actionMenu.onclick = function () {
        let actionMenuActive = actionMenu.classList.contains("menu-active");

        [...document.getElementsByClassName('action-menu-option')].forEach((actionMenuItem, actionMenuItemIdx) => {
            if (actionMenuActive) {
                actionMenuItem.classList.add('menu-option-inactive');
                actionMenuItem.style.left = "0.6125rem";
            } else {
                actionMenuItem.classList.remove('menu-option-inactive');
                actionMenuItem.style.left = `${5.375 + (actionMenuItemIdx * 4.125)}rem`;
            }
        });

        if (actionMenuActive) {
            actionMenu.classList.remove('menu-active');
        } else {
            actionMenu.classList.add('menu-active');
        }
    };
}

actionToolbar_controlHandler();
actionMenu_controlHandler();