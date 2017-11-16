const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', ()=>{

  it('should reject non string values',()=>{
    var str = 23;
    var test = isRealString(str);
    expect(test).toBe(false);
  })
  it('should reject strings with only spaces', ()=>{
    var str = '    ';
    var test = isRealString(str);
    expect(test).toBe(false);
  })
  it('should allow strings with non space characters', ()=>{
    var str = 'string';
    var test = isRealString(str);
    expect(test).toBe(true);
  })
})
