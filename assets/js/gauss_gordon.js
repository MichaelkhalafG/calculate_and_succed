$(document).ready(function () {
    AOS.init();
    // e is the equation number and x is the variable number and a is the result number
    const e1x1 = document.getElementById('e1x1');
    const e1x2 = document.getElementById('e1x2');
    const e1x3 = document.getElementById('e1x3');
    const e1a = document.getElementById('e1a');
    const e2x1 = document.getElementById('e2x1');
    const e2x2 = document.getElementById('e2x2');
    const e2x3 = document.getElementById('e2x3');
    const e2a = document.getElementById('e2a');
    const e3x1 = document.getElementById('e3x1');
    const e3x2 = document.getElementById('e3x2');
    const e3x3 = document.getElementById('e3x3');
    const e3a = document.getElementById('e3a');
    let error = [];
    let naninputs = 0;

    $('#solv').click(function () {
        document.getElementById('table_body').innerHTML = ``;
        let e1 = [parseFloat(e1x1.value), parseFloat(e1x2.value), parseFloat(e1x3.value)];
        let e2 = [parseFloat(e2x1.value), parseFloat(e2x2.value), parseFloat(e2x3.value)];
        let e3 = [parseFloat(e3x1.value), parseFloat(e3x2.value), parseFloat(e3x3.value)];
        let a = [parseFloat(e1a.value), parseFloat(e2a.value), parseFloat(e3a.value)];
        let matrix = [e1, e2, e3];
        error = [];
        naninputs = 0;
        matrix.forEach((element) => {
            element.forEach((element2) => {
                if (isNaN(element2)) {
                    naninputs++;
                }
            });
        });
        a.forEach((element) => {
            if (isNaN(element)) {
                naninputs++;
            }
        });
        if (naninputs > 0) {
            error.push(`Invalid ${naninputs} inputs. All inputs should be numbers.`);
        }
        if (error.length > 0) {
            document.querySelector("#erorr").innerHTML = `<h5 class="text-danger border rounded-2 border-danger m-1 p-2 bg-danger-subtle">${error.join("<br>")}</h5>`;
            document.querySelector('.table_head').innerHTML = ``;
        } else {
            document.querySelector("#erorr").innerHTML = ``;
            let { x, steps } = gaussGordon(matrix, a, 'table_body');
            document.querySelector('.table_head').innerHTML = `
        <tr>
            <h6 class="px-5 py-2">Solution:</h6>
        </tr>
        <tr>
            <h6 class="px-5 py-2">x1 = ${x[0]}</h6>
        </tr>
        <tr>
            <h6 class="px-5 py-2">x2 = ${x[1]}</h6>
        </tr>
        <tr>
            <h6 class="px-5 py-2">x3 = ${x[2]}</h6>
        </tr>
        `;

        };
        error = [];
        naninputs = 0;
    });

    function gaussGordon(A, b, outputDiv) {
        const n = b.length;
        let steps = [];

        // Step 1: partial pivoting
        for (let k = 0; k < n - 1; k++) {
            // find the row with the largest absolute value in column k
            let i_max = k;
            for (let i = k + 1; i < n; i++) {
                if (Math.abs(A[i][k]) > Math.abs(A[i_max][k])) {
                    i_max = i;
                }
            }

            // swap rows k and i_max
            if (i_max !== k) {
                [A[k], A[i_max]] = [A[i_max], A[k]];
                [b[k], b[i_max]] = [b[i_max], b[k]];
                steps.push({ matrix: A.map(row => [...row]), constants: [...b] });
            }

            // Step 2: elimination
            for (let i = k + 1; i < n; i++) {
                const factor = A[i][k] / A[k][k];
                for (let j = k; j < n; j++) {
                    A[i][j] -= factor * A[k][j];
                }
                b[i] -= factor * b[k];
            }
            steps.push({ matrix: A.map(row => [...row]), constants: [...b] });
        }

        // Step 3: back substitution
        const x = new Array(n).fill(0);
        x[n - 1] = b[n - 1] / A[n - 1][n - 1];
        for (let i = n - 2; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += A[i][j] * x[j];
            }
            x[i] = (b[i] - sum) / A[i][i];
        }

        // Output the steps to the specified div element
        const outputElement = document.getElementById(outputDiv);
        if (outputElement) {
            // Create a table for each step and append it to the output div
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];
                document.getElementById('table_body').innerHTML += `<h6>step : ${(i + 1)}<h6/>`;
                const table = document.createElement("table");
                table.classList.add("gauss-table"); // add a CSS class to the table
                for (let j = 0; j < n; j++) {
                    const row = document.createElement("tr");
                    row.classList.add("gauss-row"); // add a CSS class to the table rows
                    for (let k = 0; k < n; k++) {
                        const cell = document.createElement("td");
                        cell.classList.add("gauss-cell"); // add a CSS class to the table cells
                        cell.textContent = step.matrix[j][k].toFixed(2);
                        row.appendChild(cell);
                    }
                    const constantCell = document.createElement("td");
                    constantCell.classList.add("gauss-constant"); // add a CSS class to the constant cells
                    constantCell.textContent = step.constants[j].toFixed(2);
                    row.appendChild(constantCell);
                    table.appendChild(row);
                }
                outputElement.appendChild(table);
            }
        } else {
            console.log(steps);
        }

        return { x, steps };
    };

});