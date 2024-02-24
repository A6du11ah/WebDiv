const color = document.getElementById("color-Picker");
const result = document.getElementById("result");

color.addEventListener("input", ()=>{
    result.textContent = color.value.toUpperCase();
    result.style.color = color.value;
})

const colortxt = document.getElementById("color-Picker-txt");
const resulttxt = document.getElementById("result-txt");

colortxt.addEventListener("input", ()=>{
    resulttxt.textContent = colortxt.value.toUpperCase();
    resulttxt.style.color = colortxt.value;
})

const colorborder = document.getElementById("color-Picker-border");
const resultborder = document.getElementById("result-border");

colorborder.addEventListener("input", ()=>{
    resultborder.textContent = colorborder.value.toUpperCase();
    resultborder.style.color = colorborder.value;
})

/////////////////////////////////////////////////

let wdSelectedElement;

document.getElementById("save-text-property").onclick = function(){
    let letter_space_val = document.getElementById("letter-space").value;
    let letter_space_unit = document.getElementById("letter-space-unit").value;
    let word_space_val = document.getElementById("word-space").value;
    let word_space_unit = document.getElementById("word-space-unit").value;
    let line_height_val = document.getElementById("line-height").value;
    let line_height_unit = document.getElementById("line-height-unit").value;
    let text_transform = document.getElementById("text-transform").value;
    let text_alignment = document.getElementById("text-alignment").value;


    wdSelectedElement.style.letterSpacing = `${letter_space_val}` + letter_space_unit;
    wdSelectedElement.style.wordSpacing = `${word_space_val}` + word_space_unit;
    wdSelectedElement.style.lineHeight = `${line_height_val}` + line_height_unit;
    wdSelectedElement.style.textAlign = text_alignment;
    wdSelectedElement.style.textTransform = text_transform;
}

document.getElementById("save-font-property").onclick = function(){
    let font_weight_val = document.getElementById("font-weight").value;
    let font_weight_unit = document.getElementById("font-weight-unit").value;
    let font_size_val = document.getElementById("font-size").value;
    let font_size_unit = document.getElementById("font-size-unit").value;
    let font_style = document.getElementById("font-style").value;
    let font_family = document.getElementById("font-family").value;

    wdSelectedElement.style.fontWidth = `${font_weight_val}` + font_weight_unit;
    wdSelectedElement.style.fontRadius = `${font_size_val}` + font_size_unit;
    wdSelectedElement.style.fontStyle = font_style;
    wdSelectedElement.style.fontFamily = font_family;
}


document.getElementById("save-bg-property").onclick = function(){
    let bg_size_val = document.getElementById("font-weight").value;
    let bg_size_unit = document.getElementById("font-weight-unit").value;
    let bg_position_val = document.getElementById("font-size").value;
    let bg_position_unit = document.getElementById("font-size-unit").value;
    let bg_color = document.getElementById("color-Picker").value;

    wdSelectedElement.style.backgroundSize = `${bg_size_val}` + bg_size_unit;
    wdSelectedElement.style.backgroundPosition = `${bg_position_val}` + bg_position_unit;
    wdSelectedElement.style.backgroundColor = bg_color;
}

document.getElementById("save-dimension-property").onclick = function(){
    let width_val = document.getElementById("width").value;
    let width_unit = document.getElementById("width-unit").value;
    let min_width_val = document.getElementById("min-width").value;
    let min_width_unit = document.getElementById("min-width-unit").value;
    let max_width_val = document.getElementById("max-width").value;
    let max_width_unit = document.getElementById("max-width-unit").value;

    let height_val = document.getElementById("height").value;
    let height_unit = document.getElementById("height-unit").value;
    let min_height_val = document.getElementById("min-height").value;
    let min_height_unit = document.getElementById("min-height-unit").value;
    let max_height_val = document.getElementById("max-height").value;
    let max_height_unit = document.getElementById("max-height-unit").value;


    wdSelectedElement.style.width = `${width_val}` + width_unit;
    wdSelectedElement.style.minWidth = `${min_width_val}` + min_width_unit;
    wdSelectedElement.style.maxWidth = `${max_width_val}` + max_width_unit;
    wdSelectedElement.style.height = `${height_val}` + height_unit;
    wdSelectedElement.style.minHeight = `${min_height_val}` + min_height_unit;
    wdSelectedElement.style.maxHeight = `${max_height_val}` + max_height_unit;
}

document.getElementById("save-border-property").onclick = function(){
    let border_color = document.getElementById("color-Picker-border").value;
    let border_width_val = document.getElementById("border-width").value;
    let border_width_unit = document.getElementById("border-width-unit").value;
    let border_radius_val = document.getElementById("border-radius").value;
    let border_radius_unit = document.getElementById("border-radius-unit").value;
    let border_style = document.getElementById("border-style").value;

    wdSelectedElement.style.borderColor = border_color;
    wdSelectedElement.style.borderWidth = `${border_width_val}` + border_width_unit;
    wdSelectedElement.style.borderRadius = `${border_radius_val}` + border_radius_unit;
    wdSelectedElement.style.borderStyle = border_style;
}


document.getElementById("save-mp-property").onclick = function(){
    let padding_left_val = document.getElementById("padding-left").value;
    let padding_left_unit = document.getElementById("padding-left-unit").value;
    let padding_right_val = document.getElementById("padding-right").value;
    let padding_right_unit = document.getElementById("padding-right-unit").value;
    let padding_bottom_val = document.getElementById("padding-bottom").value;
    let padding_bottom_unit = document.getElementById("padding-bottom-unit").value;
    let padding_top_val = document.getElementById("padding-top").value;
    let padding_top_unit = document.getElementById("padding-top-unit").value;

    let margin_left_val = document.getElementById("margin-left").value;
    let margin_left_unit = document.getElementById("margin-left-unit").value;
    let margin_right_val = document.getElementById("margin-right").value;
    let margin_right_unit = document.getElementById("margin-right-unit").value;
    let margin_bottom_val = document.getElementById("margin-bottom").value;
    let margin_bottom_unit = document.getElementById("margin-bottom-unit").value;
    let margin_top_val = document.getElementById("margin-top").value;
    let margin_top_unit = document.getElementById("margin-top-unit").value;


    wdSelectedElement.style.paddingLeft = `${padding_left_val}` + padding_left_unit;
    wdSelectedElement.style.paddingRight = `${padding_right_val}` + padding_right_unit;
    wdSelectedElement.style.paddingBottom = `${padding_bottom_val}` + padding_bottom_unit;
    wdSelectedElement.style.paddingTop = `${padding_top_val}` + padding_top_unit;

    wdSelectedElement.style.marginLeft = `${margin_left_val}` + margin_left_unit;
    wdSelectedElement.style.marginRight = `${margin_right_val}` + margin_right_unit;
    wdSelectedElement.style.marginBottom = `${margin_bottom_val}` + margin_bottom_unit;
    wdSelectedElement.style.marginTop = `${margin_top_val}` + margin_top_unit;
}

document.getElementById("save-mis-property").onclick = function(){
    let opacity_val = document.getElementById("opacity").value;

    let Cursor = document.getElementById("cursor").value;
    let Overflow = document.getElementById("overflow").value;
    let Visibility = document.getElementById("visibility").value;
    let Display = document.getElementById("display").value;
    let Position = document.getElementById("position").value;

    wdSelectedElement.style.cursor = Cursor;
    wdSelectedElement.style.overflow = Overflow;
    wdSelectedElement.style.visibility = Visibility;
    wdSelectedElement.style.height = Display;
    wdSelectedElement.style.display = Position;
    wdSelectedElement.style.position = opacity_val;
}

document.getElementById("save-img-property").onclick = function(){
    let img_src = document.getElementById("imgsrc");
    let img_alt = document.getElementById("imgalt");

    wdSelectedElement.src = img_src;
    wdSelectedElement.alt = img_alt;
}
