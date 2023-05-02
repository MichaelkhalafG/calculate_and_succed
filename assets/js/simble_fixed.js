$(document).ready(function () {
    AOS.init();
    let calc_buttons = [
        {
            name: "pow",
            symbol: "pow(",
            fourmla: "^(",
        }
        ,
        {
            name: "sqrt",
            symbol: "sqrt(",
            fourmla: "*Math.sqrt(",
        }
        ,
        {
            name: "log",
            symbol: "log(",
            fourmla: "*Math.log10(",
        }
        ,
        {
            name: "X",
            symbol: "X",
            fourmla: "*X",
        }
        ,
        {
            name: "ln",
            symbol: "ln(",
            fourmla: "*Math.log2(",
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
            name: "y",
            symbol: "y",
            fourmla: "*y",
        }
        ,
        {
            name: "tan",
            symbol: "tan(",
            fourmla: "*Math.tan(",
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
    let x0;
    let E = 0;
    let counter = 1;
    let values = [];
    let fxa = {
        operation: [],
        fourmla: []
    };
    let x0a = {
        operation: [],
        fourmla: []
    };
    let Ea = {
        operation: [],
        fourmla: []
    };
    function calculate(button) {
        if (button.name != "delete") {
            if (counter == 1) {
                fxa.operation.push(button.symbol);
                fxa.fourmla.push(button.fourmla);
            } else if (counter == 2) {
                x0a.operation.push(button.symbol);
                x0a.fourmla.push(button.fourmla);
            } else {
                Ea.operation.push(button.symbol);
                Ea.fourmla.push(button.fourmla);
            }
        } else {
            if (counter == 1) {
                fxa.operation.pop();
                fxa.fourmla.pop();
            } else if (counter == 2) {
                x0a.operation.pop();
                x0a.fourmla.pop();
            } else {
                Ea.operation.pop();
                Ea.fourmla.pop();
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
                    document.querySelector("#x0").innerHTML = x0a.operation.join("");
                    if (x0a.fourmla.length > 0) {
                        x0 = x0a.fourmla.join("");
                    } else {
                        x0 = null;
                    }
                } else {
                    document.querySelector("#E").innerHTML = Ea.operation.join("");
                    if (Ea.fourmla.length > 0) {
                        E = Ea.fourmla.join("");
                    } else {
                        E = null;
                    }
                }
            }
        })
    });
    let table_body = document.querySelector(".table_body");
    let root = document.querySelector(".root");
    $("#next").click(function () {
        if (counter == 3) {
            counter = 1;
        } else { counter++; }
    });
    $("#clear").click(function () {
        do {
            x0a.operation.pop();
        } while (x0a.operation.length > 0);
        do {
            x0a.fourmla.pop();
        } while (x0a.fourmla.length > 0);
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
        document.querySelector("#fx").innerHTML = fxa.operation.join("");
        document.querySelector("#x0").innerHTML = x0a.operation.join("");
        document.querySelector("#E").innerHTML = Ea.operation.join("");
        table_body.innerHTML = ``;
        root.innerHTML = ``;
        counter = 1;
    });
    $("#back").click(function () {
        if (counter == 1) {
            counter = 3;
        } else { counter--; }
    });
    let error = [];
    let Eb = 100;
    $("#solv_simple_fixed").click(function () {
        table_body.innerHTML = ``;
        root.innerHTML = ``
        if (fx.includes("X") && x0 != null && E != null) {
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
            fixedPointIteration(x0, fx, E);
            function fixedPointIteration(x0, fx, E) {
                console.log(x0, fx, E);
                let xi = x0;
                let xiPlusOne;
                let i = 0;
                Eb = 100;
                do {
                    if (xi < 0) {
                        xiPlusOne = eval(fx.replaceAll("X", "(" + xi + ")"));
                    } else {
                        xiPlusOne = eval(fx.replaceAll("X", xi));
                    }
                    table_body.innerHTML += `<tr>
                                <th scope="row">${i}</th>
                                <td class="x0">${xi}</td>
                                <td class="fx0">${xiPlusOne}</td>
                                <td class="xl">${Eb}%</td>
                            </tr>`;
                    Eb = Math.abs((xiPlusOne - xi) / xiPlusOne) * 100;
                    xi = xiPlusOne;
                    i++;
                } while (Eb > E);
                table_body.innerHTML += `<tr>
                                <th scope="row">${i}</th>
                                <td class="x0">${xi}</td>
                                <td class="fx0">${xiPlusOne}</td>
                                <td class="xl">${Eb}%</td>
                            </tr>`;
                root.innerHTML += `<h4 class="m-2">the root = ${xiPlusOne}</h4>`;
            }
        } else if (x0 == null || E == null) {
            if (x0 == null) {
                error.push(". Enter a valed value in x0 field");
            };
            if (E == null) {
                error.push(". Enter a valed value in E field");
            };
            if (!fx.includes("X")) {
                error.push(". The f(x) must have ' x ' on it !!");
            }
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
    $("#solv_newton_low").click(function () {
        table_body.innerHTML = ``;
        root.innerHTML = ``
        if (fx.includes("X") && x0 != null && E != null) {
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
            let fpx = getDerivative(fx);
            newtonMethod(x0, fx, fpx, E);
            function newtonMethod(x0, fx, fpx, E) {
                let xi = x0;
                let i = 1;
                let fxi = fx;
                let fpxi = fpx;
                let xiPlusOne;
                let Eb = 100;
                while (Eb > E) {
                    if (xi < 0) {
                        fxi = eval(fxi.replaceAll("X", "(" + xi + ")"));
                        fpxi = eval(fpxi.replaceAll("X", "(" + xi + ")"));
                    } else {
                        fxi = eval(fxi.replaceAll("X", xi));
                        fpxi = eval(fpxi.replaceAll("X", xi));
                    }
                    table_body.innerHTML += `<tr>
                                <th scope="row">${i}</th>
                                <td class="x0">${xi}</td>
                                <td class="fx0">${fxi}</td>
                                <td class="fpx0">${fpxi}</td>
                                <td class="xl">${Eb}%</td>
                            </tr>`;
                    xiPlusOne = (xi - (fxi / fpxi));
                    console.log(xiPlusOne, ",", xi);
                    Eb = Math.abs(((xiPlusOne - xi) / xiPlusOne) * 100);
                    xi = xiPlusOne;
                    i++;
                    if (i == 5) {
                        break;
                    }
                };
                root.innerHTML += `<h4 class="m-2">the root = ${xi}</h4>`;
            };
        } else if (x0 == null || E == null) {
            if (x0 == null) {
                error.push(". Enter a valed value in x0 field");
            };
            if (E == null) {
                error.push(". Enter a valed value in E field");
            };
            if (!fx.includes("X")) {
                error.push(". The f(x) must have ' x ' on it !!");
            }
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
    function getDerivative(fx) {
        let operators = fx.match(/[+\-]/g);
        let terms = fx.split(/[+\-]/);
        let derivatives = terms.map(term => math.derivative(term, 'X').toString());
        let result = "";
        for (let i = 0; i < terms.length; i++) {
            result += derivatives[i];
            if (i < operators.length) {
                result += operators[i];
            }
        }
        console.log(result);
        return result;
    }
    // function decimalPlaces(number) {
    //     var numberOfPlaces = 0;
    //     var foundFirstZero = false;
    //     var foundDot = false;

    //     for (var i = 0; i < number.toString().length; i++) {
    //         if (number.toString()[i] == "0" && !foundFirstZero) {
    //             foundFirstZero = true;
    //         } else if (number.toString()[i] == ".") {
    //             foundDot = true;
    //         } else if (number.toString()[i].match(/\d+/g) != null && foundDot) {
    //             numberOfPlaces++;
    //         }
    //     }

    //     return numberOfPlaces;
    // }

    // function simplify(numerator, denominator) {
    //     var fraction = {
    //         numerator: numerator,
    //         denominator: denominator
    //     };

    //     for (var i = fraction.denominator; i > 0; i--) {
    //         if (fraction.denominator % i == 0 && fraction.numerator % i == 0) {
    //             fraction.numerator /= i;
    //             fraction.denominator /= i;
    //         }
    //     }

    //     return fraction;
    // }

    // function changeAnswer(ds) {
    //     let decimal = ds;
    //     var ans = simplify(decimal.toString().substring(2), Math.pow(10, decimalPlaces(decimal)));
    //     return (ans.numerator + '/' + ans.denominator);
    // }
});
