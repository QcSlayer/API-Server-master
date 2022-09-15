//Fait par Simon Huet
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
const { threadId } = require('worker_threads');
module.exports =
    class ContactsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        get() {
            if (this.HttpContext.path.queryString == '?') {
                //Send helppage
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);

            }
            else {
                if (Object.keys(this.HttpContext.path.params).length > 3) {
                    this.HttpContext.path.params.error = ("Too many params");

                }
                else if (this.HttpContext.path.params.X || this.HttpContext.path.params.Y)
                    this.HttpContext.path.params.error = ("Invalid Param");
                else {
                    if (this.HttpContext.path.params.op || this.HttpContext.path.params.op == "") {
                        if (this.HttpContext.path.params.n) {
                            let n = parseInt(this.HttpContext.path.params.n);

                            if (this.HttpContext.path.params.op == "!") {
                                if (n >= 0) {
                                    let fin = factorial(n);
                                    console.log("Factorial of " + n + " is " + fin)
                                    this.HttpContext.path.params.value = (fin);
                                }
                                else
                                    this.HttpContext.path.params.error = ("Factorial of negative number doesn't exist");//pleaseCommit
                            }
                            if (this.HttpContext.path.params.op == "p") {
                                if (n < 0) {
                                    console.log("un nombre négatif ne peut pas être premier");
                                }
                                else {

                                    let nbPremier = isPrime(n)

                                    console.log(n + " est premier? " + nbPremier);
                                    this.HttpContext.path.params.value = nbPremier;

                                }
                            }
                            if (this.HttpContext.path.params.op == "np") {
                                let prime = findPrime(n);
                                console.log("Le enieme 1er est : " + prime);

                                this.HttpContext.path.params.value = prime;
                            }
                        }
                        else {
                            let x = parseInt(this.HttpContext.path.params.x);
                            let y = parseInt(this.HttpContext.path.params.y);
                            if (this.HttpContext.path.params.X) {
                                x = parseInt(this.HttpContext.path.params.X)
                            }
                            if (this.HttpContext.path.params.Y) {
                                y = parseInt(this.HttpContext.path.params.Y)
                            }
                            if (this.HttpContext.path.params.op == "%") {
                                if (y == 0) {
                                    this.HttpContext.path.params.error = "You cannot do modulo of 0";
                                    this.HttpContext.path.params.value = ("NaN");
                                }
                                else {
                                    console.log(x % y);
                                    this.HttpContext.path.params.value = (x % y);
                                }

                            }
                            //console.log(eval(this.HttpContext.path.params.x + this.HttpContext.path.params.op + this.HttpContext.path.params.y));
                            else if (this.HttpContext.path.params.op == " " || this.HttpContext.path.params.op == "") {
                                this.HttpContext.path.params.op = "+";
                                console.log(x + y);
                                this.HttpContext.path.params.value = (x + y);
                            }
                            else if (this.HttpContext.path.params.op == "-") {
                                console.log(x - y);
                                this.HttpContext.path.params.value = (x - y);
                            }
                            else if (this.HttpContext.path.params.op == "/") {

                                if (y != 0) {
                                    console.log(x / y);
                                    this.HttpContext.path.params.value = (x / y);
                                }
                                else {
                                    this.HttpContext.path.params.error = "You cannot divide by 0";
                                    this.HttpContext.path.params.value = ("NaN");
                                    console.log("You cannot divide by 0");
                                }
                            }
                            else if (this.HttpContext.path.params.op == "*") {
                                console.log(x * y);
                                this.HttpContext.path.params.value = (x * y);

                            }
                        }



                    } else {
                        this.HttpContext.path.params.error = "parameter 'op' is missing";
                    }
                }


            }
            this.HttpContext.response.JSON(this.HttpContext.path.params);
        }
    }
//http://localhost:5000/api/math?x=20&y=30&op=+
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n) {
    let primeNumer = 0;
    for (let i = 0; i < n; i++) {
        primeNumer++;
        while (!isPrime(primeNumer)) {
            primeNumer++;
        }
    }
    return primeNumer;
}