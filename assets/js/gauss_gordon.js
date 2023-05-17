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
    let type = 1;
    $('#type1').click(function () {
        type = 1;
        $('#type1').addClass('bg-dark');
        $('#type1').removeClass('bg-color3');
        $('#type2').addClass('bg-color3');
        $('#type2').removeClass('bg-dark');
        $('#type3').addClass('bg-color3');
        $('#type3').removeClass('bg-dark');
    });
    $('#type2').click(function () {
        type = 2;
        $('#type2').addClass('bg-dark');
        $('#type2').removeClass('bg-color3');
        $('#type1').addClass('bg-color3');
        $('#type1').removeClass('bg-dark');
        $('#type3').addClass('bg-color3');
        $('#type3').removeClass('bg-dark');
    });
    $('#type3').click(function () {
        type = 3;
        $('#type3').addClass('bg-dark');
        $('#type3').removeClass('bg-color3');
        $('#type2').addClass('bg-color3');
        $('#type2').removeClass('bg-dark');
        $('#type1').addClass('bg-color3');
        $('#type1').removeClass('bg-dark');
    });

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
            if (type == 1) {
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
            } else if (type == 2) {
                let { x, steps } = gauss_with_partial_pivoting(matrix, a, 'table_body');
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
            } else {
                let x = luDecomposition(matrix, a, 'table_body');
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

        };
        error = [];
        naninputs = 0;
    });

    function gaussGordon(A, b, outputDiv) {
        const n = b.length;
        let steps = [];

        // Step 1: partial pivoting
        for (let k = 0; k < n - 1; k++) {
            // Step 1: elimination
            for (let i = k + 1; i < n; i++) {
                const factor = A[i][k] / A[k][k];
                for (let j = k; j < n; j++) {
                    A[i][j] -= factor * A[k][j];
                }
                b[i] -= factor * b[k];
            }
            steps.push({ matrix: A.map(row => [...row]), constants: [...b] });
        }

        // Step 2: back substitution
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
    function gauss_with_partial_pivoting(A, b, outputDiv) {
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
    function luDecomposition(A, b, outputDiv) {
        const n = b.length;
        let steps = [];

        // Step 1: initialize L and U
        const L = new Array(n).fill(0).map(() => new Array(n).fill(0));
        const U = new Array(n).fill(0).map(() => new Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            L[i][i] = 1;
        }

        // Step 2: perform LU decomposition
        for (let k = 0; k < n; k++) {
            // compute U[k][j] for j >= k
            for (let j = k; j < n; j++) {
                let sum = 0;
                for (let s = 0; s < k; s++) {
                    sum += L[k][s] * U[s][j];
                }
                U[k][j] = A[k][j] - sum;
            }

            // compute L[i][k] for i > k
            for (let i = k + 1; i < n; i++) {
                let sum = 0;
                for (let s = 0; s < k; s++) {
                    sum += L[i][s] * U[s][k];
                }
                L[i][k] = (A[i][k] - sum) / U[k][k];
            }

            steps.push({ A: A.map(row => [...row]), b: [...b], UX: [], LU: [] });

            // Step 3: solve Ly = b
            const y = new Array(n).fill(0);
            y[0] = b[0] / L[0][0];
            for (let i = 1; i < n; i++) {
                let sum = 0;
                for (let j = 0; j < i; j++) {
                    sum += L[i][j] * y[j];
                }
                y[i] = (b[i] - sum) / L[i][i];
            }

            // Step 4: solve Ux = y
            let x = new Array(n).fill(0);
            x[n - 1] = y[n - 1] / U[n - 1][n - 1];
            for (let i = n - 2; i >= 0; i--) {
                let sum = 0;
                for (let j = i + 1; j < n; j++) {
                    sum += U[i][j] * x[j];
                }
                x[i] = (y[i] - sum) / U[i][i];
            }

            // Add matrix UX to the current step
            for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let j = 0; j < n; j++) {
                    sum += U[i][j] * (j >= i ? x[j] : 0);
                }
                steps[steps.length - 1].UX.push(sum.toFixed(2));
            }

            // Add matrix LU to the current step
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    steps[steps.length - 1].LU.push((j <= i ? L[i][j] : U[i][j]).toFixed(2));
                }
            }
        }

        // Output the steps to the specified div element
        const outputElement = document.getElementById(outputDiv);
        if (outputElement) {
            // Create a table for each step and append it to the output div
            for (let i = 0; i < steps.length; i++) {
                let step = steps[i];
                let table = document.createElement("table");
                table.classList.add("gauss-table"); // add a CSS class to the table

                // Add matrix A to the current step
                let matrixARow = document.createElement("tr");
                matrixARow.classList.add("gauss-row");
                let matrixACell = document.createElement("td");
                matrixACell.classList.add("gauss-cell");
                matrixACell.setAttribute("colspan", n);
                matrixACell.textContent = "Matrix A";
                matrixARow.appendChild(matrixACell);
                table.appendChild(matrixARow);
                for (let j = 0; j < n; j++) {
                    let row = document.createElement("tr");
                    row.classList.add("gauss-row");
                    for (let k = 0; k < n; k++) {
                        let cell = document.createElement("td");
                        cell.classList.add("gauss-cell");
                        cell.textContent = step.A[j][k].toFixed(2);
                        row.appendChild(cell);
                    }
                    table.appendChild(row);
                }
                table.appendChild(document.createElement("br"));

                // Add vector b to the current step
                let vectorBRow = document.createElement("tr");
                vectorBRow.classList.add("gauss-row");
                let vectorBCell = document.createElement("td");
                vectorBCell.classList.add("gauss-cell");
                vectorBCell.setAttribute("colspan", n);
                vectorBCell.textContent = "Vector b";
                vectorBRow.appendChild(vectorBCell);
                table.appendChild(vectorBRow);
                let bRow = document.createElement("tr");
                bRow.classList.add("gauss-row");
                for (let j = 0; j < n; j++) {
                    let cell = document.createElement("td");
                    cell.classList.add("gauss-cell");
                    cell.textContent = step.b[j].toFixed(2);
                    bRow.appendChild(cell);
                }
                table.appendChild(bRow);
                table.appendChild(document.createElement("br"));

                // Add matrix UX to the current step
                let matrixUXRow = document.createElement("tr");
                matrixUXRow.classList.add("gauss-row");
                let matrixUXCell = document.createElement("td");
                matrixUXCell.classList.add("gauss-cell");
                matrixUXCell.setAttribute("colspan", n);
                matrixUXCell.textContent = "Matrix UX (U * x)";
                matrixUXRow.appendChild(matrixUXCell);
                table.appendChild(matrixUXRow);
                let UXRow = document.createElement("tr");
                UXRow.classList.add("gauss-row");
                for (let j = 0; j < n; j++) {
                    let cell = document.createElement("td");
                    cell.classList.add("gauss-cell");
                    cell.textContent = step.UX[j];
                    UXRow.appendChild(cell);
                }
                table.appendChild(UXRow);
                table.appendChild(document.createElement("br"));
                // Add matrix LU to the current step
                let matrixLURow = document.createElement("tr");
                matrixLURow.classList.add("gauss-row");
                let matrixLUCell = document.createElement("td");
                matrixLUCell.classList.add("gauss-cell");
                matrixLUCell.setAttribute("colspan", n);
                matrixLUCell.textContent = "Matrix LU (L * U)";
                matrixLURow.appendChild(matrixLUCell);
                table.appendChild(matrixLURow);
                for (let j = 0; j < n; j++) {
                    let row = document.createElement("tr");
                    row.classList.add("gauss-row");
                    for (let k = 0; k < n; k++) {
                        let cell = document.createElement("td");
                        cell.classList.add("gauss-cell");
                        cell.textContent = step.LU[j * n + k];
                        row.appendChild(cell);
                    }
                    table.appendChild(row);
                }
                outputElement.appendChild(table);
            }
        }

        // Return the solutions for x1, x2, and x3
        return x;
    }

});