'use strict';

const { expect, should } = require('chai');
const loanEntity = require('../loan/loans');

function mockContext() {
    return {
      failures: [],
      events: [],
      fail(failure) {
        this.failures.push(failure);
      },
      emit(event) {
        this.events.push(event);
      },
    };
  }

describe('loan command handler receiving a createLoan', () => {
  it('should return an AddedLoan message with the loan id', () => {
    const command = {
      user_id: 'testuser',
      loan: {
        loanId: 'loan1',
        principal: 200000,
        rate: .03,
        months: 3600,
        monthlyAddl: 0
      }
    };
    const result = loanEntity.createLoan(command,{},mockContext());
    expect(result.loanId).to.eql("loan1");
  });
});

describe('loan command handler receiving a getLoan', () => {
  it('should return loan data for the loan and user id', () => {
    const command = {
        userId: 'testuser',
        loanId: 'loan1'
    }

    const state = {
        loans: [
            {        
                loanId: 'loan1',
                principal: 200000,
                rate: .03,
                months: 3600,
                monthlyAddl: 0
            },
            {        
                loanId: 'loan2',
                principal: 300000,
                rate: .025,
                months: 3600,
                monthlyAddl: 100
            },
        ]
    }

    const result = loanEntity.getLoan(command,state,mockContext());
    expect(result.loanId).to.eql("loan1");
    expect(result.principal).to.eql(200000);

  });
});
