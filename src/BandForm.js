import React from "react";

import { useState } from 'react';
import moment from "moment";

function BandForm({ band }) {
  const [order, setOrder] = useState({
    band: band.id,
    firstName: "",
    lastName: "",
    address: "",
    ticketQty: {},
    ccNumber: "",
    ccExpiry: "",
    ccCvv: ""
  });

  const bandDate = moment().format("dddd, MMMM D");

  // Note this is a bad idea due to XSS vulnerability; but we are rendering our own data here.
  const blurb = {__html: band.description_blurb};

  function handleChange(e) {
    setOrder({...order, [e.target.name]: e.target.value});
  }

  function handleQtySelect(e) {
    setOrder({...order, ticketQty: {...order.ticketQty, [e.target.name]: e.target.value}})
  }

  function handleSubmit() {
    console.log(order);
    alert(JSON.stringify(order));
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1>{band.name}</h1>
          <div>
            <div id="calendar-ico"><img src="assets/images/calendar.jpg" /></div>
            <div id="concert-date">{bandDate}</div>
            <div id="location-ico"><img src="assets/images/calendar.jpg" /></div>
            <div id="concert-location">{band.location}</div>
          </div>
        </div>
        <div className="row gx-5">
          <div className="col-md-4">
            <div>
              <img className="img-thumbnail" src={band.imgUrl}></img>
              <div dangerouslySetInnerHTML={blurb}></div>
            </div>
          </div>
          <div className="col-md-8">
            <form>
              <h2>Select Tickets</h2>
              <ul>
                {band.ticketTypes.map((ticket) => (
                    <li key={ticket.type}>
                      <label>
                        <h4>{ticket.name} {ticket.id}</h4>
                        <div>{ticket.description}</div>
                        <div>${ticket.cost / 100}</div>
                      </label>
                      <input type="number" name={ticket.type} defaultValue={0} min={0} onChange={handleQtySelect}/>
                    </li>
                ))}
              </ul>
              <h2>Total</h2>
              <div>${band.ticketTypes.map((ticket) => (
                       order.ticketQty[ticket.type] ? order.ticketQty[ticket.type] * ticket.cost : 0
                   )).reduce((acc, val) => acc + val) / 100}
              </div>
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange}/>
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange}/>
              <input type="text" name="address" placeholder="Address" onChange={handleChange}/>
              <label>Payment Details</label>
              <input name="ccNumber" type="text" placeholder="0000 0000 0000 0000" onChange={handleChange}/>
              <input name="ccExpiry" type="text" placeholder="MM / YY" onChange={handleChange}/>
              <input name="ccCvv" placeholder="CVV" onChange={handleChange}/>
              <button onClick={handleSubmit}>Get Tickets</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BandForm;
