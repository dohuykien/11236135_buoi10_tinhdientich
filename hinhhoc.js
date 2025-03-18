
function updateInputs() {
    let shape = document.getElementById("shape").value;
    let inputsDiv = document.getElementById("inputs");
    inputsDiv.innerHTML = "";

    if (shape === "rectangle") {
        inputsDiv.innerHTML = '<input type="text" id="length" placeholder="Nhập chiều dài">' +
                                '<input type="text" id="width" placeholder="Nhập chiều rộng">';
    } else if (shape === "square") {
        inputsDiv.innerHTML = '<input type="text" id="side" placeholder="Nhập cạnh">';
    } else if (shape === "circle") {
        inputsDiv.innerHTML = '<input type="text" id="radius" placeholder="Nhập bán kính">';
    } else if (shape === "triangle") {
        inputsDiv.innerHTML = '<input type="text" id="a" placeholder="Nhập cạnh a">' +
                                '<input type="text" id="b" placeholder="Nhập cạnh b">' +
                                '<input type="text" id="c" placeholder="Nhập cạnh c">';
    } else if (shape === "trapezoid") {
        inputsDiv.innerHTML = '<input type="text" id="base1" placeholder="Nhập đáy lớn">' +
                                '<input type="text" id="base2" placeholder="Nhập đáy nhỏ">' +
                                '<input type="text" id="height" placeholder="Nhập chiều cao">';
    } else if (shape === "rhombus") {
        inputsDiv.innerHTML = '<input type="text" id="d1" placeholder="Nhập đường chéo 1">' +
                                '<input type="text" id="d2" placeholder="Nhập đường chéo 2">' +
                                '<input type="text" id="side" placeholder="Nhập cạnh">';
    }
}

function validateInput(value, name) {
    let num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
        alert(`${name} phải là số dương!`);
        return false;
    }
    return num;
}

function calculate() {
    let shape = document.getElementById("shape").value;
    let resultDiv = document.getElementById("result");
    let area, perimeter;

    try {
        if (shape === "rectangle") {
            let length = validateInput(document.getElementById("length").value, "Chiều dài");
            let width = validateInput(document.getElementById("width").value, "Chiều rộng");
            if (!length || !width) return;
            if (length < width) {
                alert("Chiều dài phải lớn hơn hoặc bằng chiều rộng!");
                return;
            }
            area = length * width;
            perimeter = 2 * (length + width);
        } else if (shape === "square") {
            let side = validateInput(document.getElementById("side").value, "Cạnh");
            if (!side) return;
            area = side * side;
            perimeter = 4 * side;
        } else if (shape === "circle") {
            let radius = validateInput(document.getElementById("radius").value, "Hình tròn");
            if (!radius) return;
            area = Math.PI * radius * radius;
            perimeter = 2 * Math.PI * radius;
        } else if (shape === "triangle") {
            let a = validateInput(document.getElementById("a").value, "Cạnh 1");
            let b = validateInput(document.getElementById("b").value, "Cạnh 2");
            let c = validateInput(document.getElementById("c").value, "Cạnh 3");
            if (a + b <= c || a + c <= b || b + c <= a) {
                alert("Ba cạnh không tạo thành tam giác!");
                return;
            }
            let s = (a + b + c) / 2;
            area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            perimeter = a + b + c;
        } else if (shape === "trapezoid") {
            let base1 = validateInput(document.getElementById("base1").value, "Đáy lớn");
            let base2 = validateInput(document.getElementById("base2").value, "Đáy nhỏ");
            let height = validateInput(document.getElementById("height").value, "Chiều cao");
            if (!base1 || !base2 || !height) return;

            area = ((base1 + base2) * height) / 2;

            let side = Math.sqrt(Math.pow((base1 - base2) / 2, 2) + Math.pow(height, 2)).toFixed(2);

            perimeter = base1 + base2 + 2 * parseFloat(side);

            resultDiv.innerHTML = `Diện tích: ${area.toFixed(2)} <br> 
                                Chu vi: ${perimeter.toFixed(2)} <br>
                                Cạnh bên: ${side} (tính tự động)`;
        } else if (shape === "rhombus") {
            let d1 = validateInput(document.getElementById("d1").value, "Đường chéo 1");
            let d2 = validateInput(document.getElementById("d2").value, "Đường chéo 2");
            if (!d1 || !d2) return;
            area = (d1 * d2) / 2;

            let side = document.getElementById("side").value;
            if (side) {
                side = validateInput(side, "Cạnh");
                if (!side) return;
                perimeter = 4 * side;
            } else {
                let autoSide = Math.sqrt((d1 / 2) ** 2 + (d2 / 2) ** 2);
                perimeter = 4 * autoSide.toFixed(2) + " (tính tự động)";
            }
        }

        resultDiv.innerHTML = `Diện tích: ${area.toFixed(2)} <br> Chu vi: ${perimeter.toFixed(2)}`;
    } catch (error) {
        alert("Lỗi! Vui lòng kiểm tra lại dữ liệu.");
    }
}

updateInputs();
