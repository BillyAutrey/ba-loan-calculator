const EventSourced = require('cloudstate').EventSourced;

const entity = new EventSourced(
    ['loan/proto/loan.proto'],
    "com.lightbend.loancalc.LoanService",
    {}
);
const package = 'com.lightbend.loancalc.';
const LoanState = entity.lookupType(package + "LoanState");
const Loan = entity.lookupType(package + "Loan");
const LumpSum = entity.lookupType(package + "LumpSum");
const LoanCreated = entity.lookupType(package + "LoanCreated");

entity.setInitial((userid) => LoanState.create({ loans: []}));

// command handlers
entity.createLoan = function (createLoanDetails, state, context) {
    const loan = createLoanDetails.loan;
    const addedLoan = Loan.create( {
        loanId: loan.loanId,
        principal: loan.principal,
        rate: loan.rate,
        months: loan.months,
        monthlyAddl: loan.monthlyAddl
    });

    const loanCreated = LoanCreated.create( {
        loanId: loan.loanId,
        loan: addedLoan
    });
    console.log("created loan " + loan.loanId);
    ctx.emit(loanCreated);
    return loanCreated;
};

entity.getLoan = function (getLoanDetails, state, context) {
    const existing = state.loans.find( loan => {
        console.log("found the loan");
        return loan.loanId === getLoanDetails.loanId
    });
    return existing;
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