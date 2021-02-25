'use strict';

const { expect, should } = require('chai');
const loanEntity = require('../loan/loans');

describe('loan command handler receiving a createLoan', () => {
  it('should return an AddedLoan message with the loan id', () => {
    const command = {
      user_id: 'testuser',
      loan: {
        loan_id: 'loan1',
        principal: 200000,
        rate: .03,
        months: 3600,
        monthly_addl: 0
      }
    };
    const result = loanEntity.createLoan(command,{},{});
    expect(result).to.eql({ loan_id: 'loan1' })
  });
});

describe('loan command handler receiving a getLoan', () => {
  it('should return loan data for the loan and user id', () => {
    const command = {

    }
  });
});