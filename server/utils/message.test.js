const expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', ()=>{
  it('should generate the correct message object',()=>{
    //store response
    var from = 'Jen';
    var text = 'Some text';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeGreaterThan(1);
    expect(message.text).toContain('Some text');
  })
});
