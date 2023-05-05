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
        let e1 = [parseFloat(e1x1.value), parseFloat(e1x2.value), parseFloat(e1x3.value), parseFloat(e1a.value)];
        let e2 = [parseFloat(e2x1.value), parseFloat(e2x2.value), parseFloat(e2x3.value), parseFloat(e2a.value)];
        let e3 = [parseFloat(e3x1.value), parseFloat(e3x2.value), parseFloat(e3x3.value), parseFloat(e3a.value)];
        let matrix = [e1, e2, e3];
        matrix.forEach((element) => {
            element.forEach((element2) => {
                if (isNaN(element2)) {
                    naninputs++;
                }
            });
        });
        if (naninputs > 0) {
            error.push(`Invalid ${naninputs} inputs. All inputs should be numbers.`);
        }
        solveEquationsWithCramersMethod(matrix);
        if (error.length > 0) {
            document.querySelector("#erorr").innerHTML = `<h5 class="text-danger border rounded-2 border-danger m-1 p-2 bg-danger-subtle">${error.join("<br>")}</h5>`;
        }
        error = [];
        naninputs = 0;
    });

    function solveEquationsWithCramersMethod(equations) {
        // Check if the input is valid
        if (equations.length !== 3 || equations[0].length !== 4) {
            error.push('Invalid input. The matrix should have 3 rows and 4 columns.');
            return;
        }

        // Extract the coefficients and constants from the equations
        const a1 = equations[0][0];
        const b1 = equations[0][1];
        const c1 = equations[0][2];
        const d1 = equations[0][3];
        const a2 = equations[1][0];
        const b2 = equations[1][1];
        const c2 = equations[1][2];
        const d2 = equations[1][3];
        const a3 = equations[2][0];
        const b3 = equations[2][1];
        const c3 = equations[2][2];
        const d3 = equations[2][3];

        // Calculate the determinant of the main matrix
        const mainMatrixDet = a1 * b2 * c3 + b1 * c2 * a3 + c1 * a2 * b3 - c1 * b2 * a3 - b1 * a2 * c3 - a1 * c2 * b3;

        // Calculate the determinant of the x matrix
        const xMatrixDet = d1 * b2 * c3 + b1 * c2 * d3 + c1 * d2 * b3 - c1 * b2 * d3 - b1 * d2 * c3 - d1 * c2 * b3;

        // Calculate the determinant of the y matrix
        const yMatrixDet = a1 * d2 * c3 + d1 * c2 * a3 + c1 * a2 * d3 - c1 * d2 * a3 - d1 * a2 * c3 - a1 * c2 * d3;

        // Calculate the determinant of the z matrix
        const zMatrixDet = a1 * b2 * d3 + b1 * d2 * a3 + d1 * a2 * b3 - d1 * b2 * a3 - b1 * a2 * d3 - a1 * d2 * b3;

        // Calculate the values of x, y, and z
        const x = xMatrixDet / mainMatrixDet;
        const y = yMatrixDet / mainMatrixDet;
        const z = zMatrixDet / mainMatrixDet;

        // Display the steps in a table
        const tableEl = document.getElementById('table');
        if (error.length > 0) {
            tableEl.innerHTML = `
            <div id="erorr">
            </div>
            `;
        } else {
            tableEl.innerHTML = `
                        <table>
                        <tr>
                            <td colspan="6">
                                <h5 class="px-5 py-2">Matrix :</h5>
                            </td>
                        </tr>
                        <tr class="border-end border-start border-2 border-dark">
                            <td scope="col">
                                <h6 class="px-5 py-2">${a1}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${b1}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${c1}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${d1}</h6>
                            </td>
                        </tr>
                        <tr class="border-end border-start border-2 border-dark">
                            <td scope="col">
                                <h6 class="px-5 py-2">${a2}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${b2}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${c2}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${d2}</h6>
                            </td>
                        </tr>
                        <tr class="border-end border-start border-2 border-dark">
                            <td scope="col">
                                <h6 class="px-5 py-2">${a3}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${b3}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${c3}</h6>
                            </td>
                            <td scope="col">
                                <h6 class="px-5 py-2">${d3}</h6>
                            </td>
                        </tr>
                    </table>
    <table>
    <tr>
        <td scope="col"><h4 class="px-5 py-2">Solution:</h4></td>
        <td scope="col"><h6 class="px-5 py-2">Det = ${mainMatrixDet}</h6></td>
    </tr>
    <tr>
        <td scope="col"><h6 class="px-5 py-2">x1 = ${x}</h6></td>
        <td scope="col"><h6 class="px-5 py-2">Det(x1) = ${xMatrixDet}</h6></td>
    </tr>
    <tr>
        <td scope="col"><h6 class="px-5 py-2">x2 = ${y}</h6></td>
        <td scope="col"><h6 class="px-5 py-2">Det(x2) = ${yMatrixDet}</h6></td>
    </tr>
    <tr>
        <td scope="col"><h6 class="px-5 py-2">x3 = ${z}</h6></td>
        <td scope="col"><h6 class="px-5 py-2">Det(x3) = ${zMatrixDet}</h6></td>
    </tr>
    </table>
`;
        };
    };

});