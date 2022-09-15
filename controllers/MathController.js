const path = require('path');
const fs = require('fs');
const { Console } = require('console');
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
            } else {
                if (this.HttpContext.path.params.op) {
                    if (this.HttpContext.path.params.n) {
                        let n = parseInt(this.HttpContext.path.params.n);

                        if (this.HttpContext.path.params.op == "!") {
                            if (n >= 0) {
                                let fin = factorial(n);
                                console.log("Factorial of " + n + " is " + fin)
                            }
                            else
                                console.log("Factorial of negative number doesn't exist");
                        }
                        if (this.HttpContext.path.params.op == "p") {
                            if (n < 0) {
                                console.log("un nombre négatif ne peut pas être premier");
                            }
                            else{
                                let nbPremier = isPrime(n)

                                console.log(n + " est premier? " + nbPremier);

                               let prime = findPrime(n);
                               console.log("Le enieme 1er est : " + prime);
                            }

                            
                        }
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        /* else{
                             for(var i = 2; i < n; i++) {
                                 if(n % i === 0) {
                                     return false;
                                 }
                             }
                             return n > 1;
                         }
                         }*/
                    }
                    else {
                        let x = parseInt(this.HttpContext.path.params.x);
                        let y = parseInt(this.HttpContext.path.params.y);

                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        if (this.HttpContext.path.params.op == "%") {
                            console.log(x % y);
                        }
                        //console.log(eval(this.HttpContext.path.params.x + this.HttpContext.path.params.op + this.HttpContext.path.params.y));
                        else if (this.HttpContext.path.params.op == " ") {
                            console.log(x + y);
                        }
                        else if (this.HttpContext.path.params.op == "-") {
                            console.log(x - y);
                        }
                        else if (this.HttpContext.path.params.op == "/") {

                            if (y != 0)
                                console.log(x / y);
                            else {
                                this.HttpContext.path.params.error = "You cannot divide by 0";
                                console.log("You cannot divide by 0");
                            }
                        }
                        else if (this.HttpContext.path.params.op == "*") {
                            console.log(x * y);
                        }
                    }


                } else {
                    this.HttpContext.path.params.error = "parameter 'op' is missing";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }

            }
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
function findPrime(n){
    let primeNumer = 0;
    for ( let i=0; i < n; i++){
        primeNumer++;
        while (!isPrime(primeNumer)){
            primeNumer++;
        }
    }
    return primeNumer;
}