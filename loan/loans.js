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
    console.log(createLoanDetails); // Note, this will reveal that the details come in as loanId and monthlyAddl
    const loan = createLoanDetails.loan;
    const addedLoan = Loan.create( {
        loanId: loan.loanId, // loan.loan_id does NOT work here.
        principal: loan.principal,
        rate: loan.rate,
        months: loan.months,
        monthlyAddl: loan.monthlyAddl
    });
    const loanCreated = LoanCreated.create( {
        loanId: loan.loanId
    });
    console.log(loanCreated);
    //ctx.emit(addedLoan);
    return loanCreated;
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