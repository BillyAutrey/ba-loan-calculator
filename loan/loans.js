const EventSourced = require('cloudstate').EventSourced;

const entity = new EventSourced(
    ['proto/loan.proto'],
    "com.lightbend.loancalc.LoanService",
    {}
);
const package = 'com.lightbend.loancalc';
const LoanState = entity.lookupType(package + "LoanState");
const Loan = entity.lookupType(package + "Loan");
const LumpSum = entity.lookupType(package + "LumpSum");
const LoanCreated = entity.lookupType(package + "LoanCreated");

entity.setInitial((userid) => LoanState.create({ loans: []}));

// command handlers
entity.createLoan = function (loandetails, state, context) {
    const loan = loandetails.loan;
    const addedLoan = Loan.create( {
        loan_id: loan.loan_id,
        principal: loan.principal,
        rate: loan.rate,
        months: loan.months,
        monthly_addl: loan.monthly_addl
    });
    //ctx.emit(addedLoan);
    return { addedLoan.loan_id };
};

entity.getLoan = function (command, state, context) {
    return {};
}

// Behavior
entity.setBehavior((state) => {
    return {
        commandHandlers: {
            CreateLoan: entity.createLoan,
            GetLoan: entity.getLoan
        }
    };
});

module.exports = entity;