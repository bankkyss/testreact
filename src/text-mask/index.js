import React, { Component } from 'react';
import Example from '../example';
// import MaskedInput from 'react-text-mask';


export default class TextMask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      amount: 'New Postpaid Personal',
      MSISDN:'',
      selectedDateTime: new Date().toISOString().substr(0, 16),
      selectedDate: new Date().toISOString().split('T')[0],
      isChecked: false,
    };
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.dateTimeChangeHandler = this.dateTimeChangeHandler.bind(this);
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.MSISDNChangeHandler = this.MSISDNChangeHandler.bind(this);  
  }

  changeHandler(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  emailChangeHandler(e) {
    this.setState({
      email: e.target.value,
    });
  }

  dateTimeChangeHandler(e) {
    this.setState({
      selectedDateTime: e.target.value,
    });
  }

  dateChangeHandler(e) {
    this.setState({
      selectedDate: e.target.value,
    });
  }
  handleCheckboxChange(e) {
    this.setState({
      isChecked: e.target.checked, 
    });
  }

  MSISDNChangeHandler(e) {
    this.setState({
      MSISDN: e.target.value, 
    });
  }

  handleSubmit() {
    const { email, amount, MSISDN, selectedDateTime, selectedDate, isChecked } = this.state;

    // Check if any of the fields are empty
    if (!email || !amount || !MSISDN || !selectedDateTime || !selectedDate ) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log('Form submitted');
    console.log('state:', this.state);

    // Create an object with the form data and type
    const formData = {
      data: {
        '2e0406cb-5b40-4326-996a-b1ea35044852': this.state.email,
        "1b63822f-638b-43b1-8867-faf8ca7e84fa": 'test',
        "6eea333f-ab40-4fcd-994e-883dc5bc67a9": this.state.amount,
        "5352c8b0-7e7f-419a-ab72-857cd7eaed8a": this.state.MSISDN,
        "98fdf7e1-81c2-4022-9c9e-9c03d4f92eaf": this.state.selectedDateTime,
        "0d8b90fe-dcab-4dd7-8cc5-b6c3f3d3ce1f": this.state.selectedDate,
        "c48ebba2-7d8b-11ee-bed4-66c0cf2a8772": this.state.isChecked,
      },
      type: 'UUID',
    };

    // Make a POST request using the fetch API
    fetch('https://api.onefence.co/consentv2/portal/sdk/ad0a7af4-7d8e-11ee-b95a-b27c604bd950', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('POST request successful', data);
        // Handle the response from the server if needed
      })
      .catch(error => {
        console.error('Error making POST request', error);
        // Handle errors if necessary
      });
  }
  

  render() {
    return (
      <div className='allbox'>
        <Example title="ยืนยันการทำรายการ">
          <div className='inline'>
            <div  className='box'>
              <label>E-mail</label>
              <input
                type="text"
                className="form-control"
                guide={false}
                value={this.state.email}
                onChange={this.emailChangeHandler}
              />
            </div>
            <div className='box'>
              <label>ประเภทคำสั่งซื้อ(Order Type)</label>
              <select
                className="form-control"
                value={this.state.amount}
                onChange={this.changeHandler}
              >
                <option value="New Postpaid Personal">New Postpaid Personal</option>
                <option value="New Postpaid Personal 1">New Postpaid Personal 1</option>
                <option value="New Postpaid Personal 2">New Postpaid Personal 2</option>
              </select>
            </div>
            

          </div>
          <div  className='inline'>
            <div  className='box'>
              <label>วันที่ทำรายการ(Create Date)</label>
              <input
                type="datetime-local"
                className="form-control"
                value={this.state.selectedDateTime}
                onChange={this.dateTimeChangeHandler}
              />
            </div>
            <div className='box'>
            <label>วันที่มีผล(Effective Date)</label>
            <input
              type="date"
              className="form-control"
              value={this.state.selectedDate}
              onChange={this.dateChangeHandler}
            />
            </div>
          </div>
          <div  className='inline'>
            <div  className='box' style={{width:"50%"}}>
              <label>หมายเลข(MSISDN)</label>
              <input
                type="text"
                className="form-control"
                guide={false}
                value={this.state.MSISDN}
                onChange={this.MSISDNChangeHandler}
              />
            </div>
          </div>
            <div className='inline_ignor' style={{ display: 'flex'}}>
              <input
              type="checkbox"
              className="checkbox-control"
              checked={this.state.isChecked}
              onChange={this.handleCheckboxChange}
              />
              <label className='text-label' >ยินยอมการเปิดเผยข้อมูลของลูกค้า</label>
          </div>

        <div style={{ marginTop: 20 }}>
          <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
        </Example>
      </div>
      
    );
  }
}