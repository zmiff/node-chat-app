const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

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

describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=>{
    //from, latitude, longitude
    var from = 'Admin';
    var longitude = 1;
    var latitude = 1;

    var positionMessage = generateLocationMessage('Admin', 1, 1);
    expect(positionMessage.createdAt).toBeGreaterThan(1510602386972);
    expect(positionMessage.from).toBe('Admin');
    expect(positionMessage.url).toBe('https://google.com/maps?q=1,1');

  });
});
