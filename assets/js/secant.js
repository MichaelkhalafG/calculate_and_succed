$(document).ready(function () {
    AOS.init();
    $("#Ndiv").addClass("d-none");
    let calc_buttons = [
        {
            name: "pow",
            symbol: "pow(",
            fourmla: "**(",
        }
        ,
        {
            name: "sqrt",
            symbol: "sqrt(",
            fourmla: "*Math.sqrt(",
        }
        ,
        {
            name: "sqrt3",
            symbol: "sqrt3(",
            fourmla: "*math.cbrt(",
        }
        ,
        {
            name: "X",
            symbol: "X",
            fourmla: "*X",
        }
        ,
        {
            name: "sqrt4",
            symbol: "sqrt4(",
            fourmla: "*math.nthRoot(",
        }
        ,
        {
            name: "ln",
            symbol: "ln(",
            fourmla: "*Math.log2(",
        }
        ,
        {
            name: "log",
            symbol: "log(",
            fourmla: "*Math.log10(",
        }
        ,
        {
            name: "y",
            symbol: "y",
            fourmla: "*y",
        }
        ,
        {
            name: "cos",
            symbol: "cos(",
            fourmla: "*Math.cos(",
        }
        ,
        {
            name: "sin",
            symbol: "sin(",
            fourmla: "*Math.sin(",
        }
        ,
        {
            name: "tan",
            symbol: "tan(",
            fourmla: "*Math.tan(",
        }
        ,
        {
            name: "pi",
            symbol: "pi",
            fourmla: "Math.PI",
        }
        ,
        {
            name: "e",
            symbol: "e(",
            fourmla: "math.exp(",
        }
        ,
        {
            name: "(",
            symbol: "(",
            fourmla: "*(",
        }
        ,
        {
            name: ")",
            symbol: ")",
            fourmla: ")",
        }
        ,
        {
            name: "+",
            symbol: "+",
            fourmla: "+",
        }
        ,
        {
            name: "1",
            symbol: "1",
            fourmla: 1,
        }
        ,
        {
            name: "2",
            symbol: "2",
            fourmla: 2,
        }
        ,
        {
            name: "3",
            symbol: "3",
            fourmla: 3,
        }
        ,
        {
            name: "-",
            symbol: "-",
            fourmla: "-",
        }
        ,
        {
            name: "4",
            symbol: "4",
            fourmla: 4,
        }
        ,
        {
            name: "5",
            symbol: "5",
            fourmla: 5,
        }
        ,
        {
            name: "6",
            symbol: "6",
            fourmla: 6,
        }
        ,
        {
            name: "*",
            symbol: "*",
            fourmla: "*",
        }
        ,
        {
            name: "7",
            symbol: "7",
            fourmla: 7,
        }
        ,
        {
            name: "8",
            symbol: "8",
            fourmla: 8,
        }
        ,
        {
            name: "9",
            symbol: "9",
            fourmla: 9,
        }
        ,
        {
            name: "/",
            symbol: "/",
            fourmla: "/",
        }
        ,
        {
            name: "0",
            symbol: "0",
            fourmla: 0,
        }
        ,
        {
            name: ".",
            symbol: ".",
            fourmla: ".",
        }
        ,
        {
            name: "-(",
            symbol: "-(",
            fourmla: "-(",
        }
        ,
        {
            name: "delete",
            symbol: "delete",
            fourmla: "delete",
        }
        ,
    ];
    let fx = "";
    let xl;
    let xu;
    let E = 0;
    let N;
    let contaner_to_xu = 0;
    let counter = 1;
    let EorN = true;
    let values = [];
    if (counter == 1) {
        $('#pin4').addClass('d-none');
        $('#pin5').addClass('d-none');
        $('#pin3').addClass('d-none');
        $('#pin2').addClass('d-none');
    }
    let fxa = {
        operation: [],
        fourmla: []
    };
    let xla = {
        operation: [],
        fourmla: []
    };
    let xua = {
        operation: [],
        fourmla: []
    };
    let Ea = {
        operation: [],
        fourmla: []
    };
    let Na = {
        operation: [],
        fourmla: []
    };
    function calculate(button) {
        if (button.name != "delete") {
            if (counter == 1) {
                fxa.operation.push(button.symbol);
                fxa.fourmla.push(button.fourmla);
            } else if (counter == 2) {
                xla.operation.push(button.symbol);
                xla.fourmla.push(button.fourmla);
            } else if (counter == 3) {
                xua.operation.push(button.symbol);
                xua.fourmla.push(button.fourmla);
            } else {
                if (EorN) {
                    Ea.operation.push(button.symbol);
                    Ea.fourmla.push(button.fourmla);
                } else {
                    Na.operation.push(button.symbol);
                    Na.fourmla.push(button.fourmla);
                }
            }
        } else {
            if (counter == 1) {
                fxa.operation.pop();
                fxa.fourmla.pop();
            } else if (counter == 2) {
                xla.operation.pop();
                xla.fourmla.pop();
            } else if (counter == 3) {
                xua.operation.pop();
                xua.fourmla.pop();
            } else {
                if (EorN) {
                    Ea.operation.pop();
                    Ea.fourmla.pop();
                } else {
                    Na.operation.pop();
                    Na.fourmla.pop();
                }
            }
        }
    };

    let buttons = document.querySelector(".input_buttons");
    calc_buttons.forEach(button => {
        if (button.name.length > 5) {
            buttons.innerHTML += `<button type="button" class="btn btn-danger rounded-0 col-3" id=${button.name}>${button.symbol}</button>`;
        } else if (button.name == "X" || button.name == "y" || button.name == "*" || button.name == "/" || button.name == "+" || button.name == "-") {
            buttons.innerHTML += `<button type="button" class="btn btn-outline-dark text-light bg-color2  rounded-0 col-3" id=${button.name}>${button.symbol}</button>`;
        } else {
            buttons.innerHTML += `<button type="button" class="btn btn-dark bg-color2 rounded-0 col-3" id=${button.name}>${button.symbol}</button>`;
        }
    });
    buttons.addEventListener("click", event => {
        const target_button = event.target;
        calc_buttons.forEach(button => {
            if (button.name == target_button.id) {
                calculate(button);
                if (counter == 1) {
                    document.querySelector("#fx").innerHTML = fxa.operation.join("");
                    fx = fxa.fourmla.join("");
                } else if (counter == 2) {
                    document.querySelector("#xl").innerHTML = xla.operation.join("");
                    if (xla.fourmla.length > 0) {
                        xl = xla.fourmla.join("");
                    } else {
                        xl = null;
                    }
                } else if (counter == 3) {
                    document.querySelector("#xu").innerHTML = xua.operation.join("");
                    if (xua.fourmla.length > 0) {
                        xu = xua.fourmla.join("");
                    } else {
                        xu = null;
                    }
                } else {
                    if (EorN) {
                        document.querySelector("#E").innerHTML = Ea.operation.join("");
                        if (Ea.fourmla.length > 0) {
                            E = Ea.fourmla.join("");
                        } else {
                            E = null;
                        }
                    } else {
                        document.querySelector("#N").innerHTML = Na.operation.join("");
                        if (Na.fourmla.length > 0) {
                            N = Na.fourmla.join("");
                        } else {
                            N = null;
                        }
                    }
                }
            }
        })
    });
    let table_body = document.querySelector(".table_body");
    let root = document.querySelector(".root");
    $("#next").click(function () {
        if (counter == 1) {
            $('#pin2').removeClass('d-none');
            $('#pin1').addClass('d-none');
            $('#pin3').addClass('d-none');
            $('#pin4').addClass('d-none');
            $('#pin5').addClass('d-none');
        } else if (counter == 2) {
            $('#pin3').removeClass('d-none');
            $('#pin2').addClass('d-none');
            $('#pin1').addClass('d-none');
            $('#pin4').addClass('d-none');
            $('#pin5').addClass('d-none');
        } else if (counter == 3) {
            $('#pin4').removeClass('d-none');
            $('#pin5').removeClass('d-none');
            $('#pin3').addClass('d-none');
            $('#pin2').addClass('d-none');
            $('#pin1').addClass('d-none');
        } else if (counter == 4) {
            $('#pin1').removeClass('d-none');
            $('#pin4').addClass('d-none');
            $('#pin5').addClass('d-none');
            $('#pin3').addClass('d-none');
            $('#pin2').addClass('d-none');
        }
        if (counter == 4) {
            counter = 1;
        } else { counter++; }
    });
    $("#clear").click(function () {
        do {
            xla.operation.pop();
        } while (xla.operation.length > 0);
        do {
            xla.fourmla.pop();
        } while (xla.fourmla.length > 0);
        do {
            xua.operation.pop();
        } while (xua.operation.length > 0);
        do {
            xua.fourmla.pop();
        } while (xua.fourmla.length > 0);
        do {
            fxa.operation.pop();
        } while (fxa.operation.length > 0);
        do {
            fxa.fourmla.pop();
        } while (fxa.fourmla.length > 0);
        do {
            Ea.operation.pop();
        } while (Ea.operation.length > 0);
        do {
            Ea.fourmla.pop();
        } while (Ea.fourmla.length > 0);
        do {
            Na.operation.pop();
        } while (Na.operation.length > 0);
        do {
            Na.fourmla.pop();
        } while (Na.fourmla.length > 0);
        document.querySelector("#fx").innerHTML = fxa.operation.join("");
        document.querySelector("#xl").innerHTML = xla.operation.join("");
        document.querySelector("#xu").innerHTML = xua.operation.join("");
        document.querySelector("#E").innerHTML = Ea.operation.join("");
        document.querySelector("#N").innerHTML = Ea.operation.join("");
        table_body.innerHTML = ``;
        root.innerHTML = ``;
        counter = 1;
        $('#pin1').removeClass('d-none');
        $('#pin4').addClass('d-none');
        $('#pin5').addClass('d-none');
        $('#pin3').addClass('d-none');
        $('#pin2').addClass('d-none');
    });
    $("#back").click(function () {
        if (counter == 1) {
            $('#pin4').removeClass('d-none');
            $('#pin5').removeClass('d-none');
            $('#pin1').addClass('d-none');
            $('#pin3').addClass('d-none');
            $('#pin2').addClass('d-none');
        } else if (counter == 2) {
            $('#pin1').removeClass('d-none');
            $('#pin2').addClass('d-none');
            $('#pin3').addClass('d-none');
            $('#pin4').addClass('d-none');
            $('#pin5').addClass('d-none');
        } else if (counter == 3) {
            $('#pin2').removeClass('d-none');
            $('#pin3').addClass('d-none');
            $('#pin4').addClass('d-none');
            $('#pin5').addClass('d-none');
            $('#pin1').addClass('d-none');
        } else if (counter == 4) {
            $('#pin3').removeClass('d-none');
            $('#pin4').addClass('d-none');
            $('#pin5').addClass('d-none');
            $('#pin1').addClass('d-none');
            $('#pin2').addClass('d-none');
        }
        if (counter == 1) {
            counter = 4;
        } else { counter--; }
    });
    let row_num = 0;
    let error = [];
    let fxl = 0;
    let fxu = 0;
    let Eb = 100;
    let EorNcon;
    $("#NorE").click(function () {
        EorN = !EorN;
        if (EorN) {
            $("#Ndiv").addClass("d-none");
            $("#Ediv").removeClass("d-none");
        } else {
            $("#Ediv").addClass("d-none");
            $("#Ndiv").removeClass("d-none");
        }
    });
    $("#solv_secant").click(function () {
        table_body.innerHTML = ``;
        root.innerHTML = ``;
        if (EorN) {
            EorNcon = E;
        } else {
            EorNcon = N;
        }
        if (fx.includes("X") && xl != null && xu != null && EorNcon != null && xl < xu) {
            do {
                xl = eval(xl);
                xu = eval(xu);
                if (EorN) {
                    E = eval(E);
                } else {
                    N = eval(N);
                }
                if (fx.startsWith("*(")) {
                    fx = fx.replace("*(", "(").replaceAll("+*X", "+X").replaceAll("-*X", "-X").replaceAll("**X", "*X").replaceAll("/*X", "/X").replaceAll("(*X", "(X");
                } else if (fx.startsWith("*X")) {
                    fx = fx.replace("*X", "X").replaceAll("+*X", "+X").replaceAll("-*X", "-X").replaceAll("**X", "*X").replaceAll("/*X", "/X").replaceAll("(*X", "(X");
                } else {
                    fx = fx.replaceAll("+*X", "+X").replaceAll("-*X", "-X").replaceAll("**X", "*X").replaceAll("/*X", "/X").replaceAll("(*X", "(X");
                };
                if (fx.startsWith("*Math")) {
                    fx = fx.replace("*Math", "Math");
                }
                if (fx.startsWith("*math")) {
                    fx = fx.replace("*math", "math");
                }
                if (xl < 0) {
                    fxl = eval(fx.replaceAll("X", "(" + xl + ")"));
                } else {
                    fxl = eval(fx.replaceAll("X", xl));
                }
                if (xu < 0) {
                    fxu = eval(fx.replaceAll("X", "(" + xu + ")"));
                } else {
                    fxu = eval(fx.replaceAll("X", xu));
                }
                Eb = math.abs(((xu - xl) / xu) * 100);
                if (row_num >= 0) {
                    values.push(
                        {
                            "xl": xl,
                            "f(xl)": fxl,
                            "xu": xu,
                            "f(xu)": fxu,
                            "E%": Eb
                        })
                        ;
                    table_body.innerHTML += `<tr>
                                <th scope="row">${row_num}</th>
                                <td class="xl">${xl}</td>
                                <td class="fxl">${fxl}</td>
                                <td class="xu">${xu}</td>
                                <td class="fxu">${fxu}</td>
                                <td class="xl">${Eb}%</td>
                            </tr>`;
                    contaner_to_xu = xu;
                    xu = xu - ((fxu * (xl - xu)) / (fxl - fxu));
                    xl = contaner_to_xu;
                    row_num++;
                } else {
                    error.push(". There is no solution to this equation");
                    break;
                }
                if (row_num == N) {
                    root.innerHTML += `<h4 class="m-2">the root = ${fxu}</h4>`
                    break;
                }
            } while (E <= Eb);
            if (E >= Eb) {
                root.innerHTML += `<h4 class="m-2">the root = ${fxu}</h4>`
            }
            row_num = 0;
            Eb = 100;
            xl = eval(xla.fourmla.join(""));
            xu = eval(xua.fourmla.join(""));
            if (EorN) {
                E = eval(Ea.fourmla.join(""));
            } else {
                N = eval(Na.fourmla.join(""));
            }
        } else if (xl == null || xu == null || E == null) {
            if (xl == null) {
                error.push(". Enter a valed value in xl field");
            };
            if (xu == null) {
                error.push(". Enter a valed value in xu field");
            };
            if (E == null || N == null) {
                if (EorN) {
                    error.push(". Enter a valed value in E field");
                } else {
                    error.push(". Enter a valed value in N field");
                }
            };
            if (!fx.includes("X")) {
                error.push(". The f(x) must have ' x ' on it !!");
            }
        } else if (xl >= xu) {
            error.push(". xl => must be the lower value , xu => must be the uper value");
            error.push(". Enter a new xl , xu");
        } else {
            error.push(". The f(x) must have ' x ' on it !!");
        };
        if (error.length > 0) {
            document.querySelector("#erorr").innerHTML = `<h5 class="text-danger border rounded-2 border-danger m-1 p-2 bg-danger-subtle">${error.join("<br>")}</h5>`;
            error = [];
        } else if (error.length == 0) {
            document.querySelector("#erorr").innerHTML = ` `;
        }
    });
});