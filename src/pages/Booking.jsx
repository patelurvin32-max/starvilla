import { useState } from "react";

const Booking = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
    roomType: "Deluxe Room",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "guests") {
      const guests = Number(value);
      const rooms = Math.ceil(guests / 3); // 1 room = 3 guests
      setForm({ ...form, guests, rooms });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking request submitted successfully!");
    console.log(form);
  };

  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header booking-header text-white">
        <div className="container">
         <h1 className="fw-bold text-shadow">Book Your Stay</h1>
<p className="text-white-50">

            Experience luxury & comfort at Patel Villa Resort
          </p>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="booking-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="booking-card shadow-lg p-4">
                <h3 className="text-center font-serif mb-4">
                  Reservation Details
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Name */}
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>

                    {/* Room Type */}
                    <div className="col-md-6">
                      <label className="form-label">Room Type</label>
                      <select
                        name="roomType"
                        className="form-select"
                        value={form.roomType}
                        onChange={handleChange}
                      >
                        <option>Deluxe Room</option>
                        <option>Super Deluxe</option>
                        <option>Royal Suite</option>
                      </select>
                    </div>

                    {/* Check In */}
                    <div className="col-md-6">
                      <label className="form-label">Check-In Date</label>
                      <input
                        type="date"
                        name="checkIn"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>

                    {/* Check Out */}
                    <div className="col-md-6">
                      <label className="form-label">Check-Out Date</label>
                      <input
                        type="date"
                        name="checkOut"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>

                    {/* Guests */}
                    <div className="col-md-6">
                      <label className="form-label">Guests</label>
                      <select
                        name="guests"
                        className="form-select"
                        value={form.guests}
                        onChange={handleChange}
                      >
                        {[...Array(16)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Rooms (Auto) */}
                    <div className="col-md-6">
                      <label className="form-label">Rooms</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form.rooms}
                        disabled
                      />
                      <small className="text-muted">
                        * 1 room accommodates up to 3 guests
                      </small>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-gold btn-lg px-5">
                      Confirm Booking
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;










// import { useState } from "react";

// /* ================= ROOM PRICES ================= */
// const ROOM_PRICES = {
//   "Deluxe Room": 3500,
//   "Super Deluxe": 4500,
//   "Royal Suite": 7000,
// };

// /* ================= NIGHTS CALCULATION ================= */
// const calculateNights = (checkIn, checkOut) => {
//   if (!checkIn || !checkOut) return 0;
//   const inDate = new Date(checkIn);
//   const outDate = new Date(checkOut);
//   const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
//   return diff > 0 ? diff : 0;
// };

// const Booking = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     checkIn: "",
//     checkOut: "",
//     guests: 1,
//     rooms: 1,
//     roomType: "Deluxe Room",
//   });

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "guests") {
//       const guests = Number(value);
//       const rooms = Math.ceil(guests / 3); // 1 room = 3 guests
//       setForm({ ...form, guests, rooms });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   /* ================= HANDLE PAYMENT ================= */
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const nights = calculateNights(form.checkIn, form.checkOut);
//     if (nights === 0) {
//       alert("Please select valid check-in and check-out dates");
//       return;
//     }

//     const roomPrice = ROOM_PRICES[form.roomType];
//     const totalAmount = roomPrice * form.rooms * nights;

//     const options = {
//       key: "rzp_test_XXXXXXXXXX", // 🔴 Replace with your Razorpay Test Key
//       amount: totalAmount * 100, // in paise
//       currency: "INR",
//       name: "Star Villa Resort",
//       description: `${form.roomType} | ${nights} Night(s)`,
//       handler: function (response) {
//         alert("Payment Successful ✅");
//         console.log("Payment ID:", response.razorpay_payment_id);
//         console.log("Booking Details:", {
//           ...form,
//           nights,
//           totalAmount,
//         });
//       },
//       prefill: {
//         name: form.name,
//         email: form.email,
//         contact: form.phone,
//       },
//       theme: {
//         color: "#000000",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const nights = calculateNights(form.checkIn, form.checkOut);
//   const totalAmount =
//     nights > 0
//       ? ROOM_PRICES[form.roomType] * form.rooms * nights
//       : 0;

//   return (
//     <>
//       {/* PAGE HEADER */}
//       <section className="page-header booking-header text-white">
//         <div className="container">
//           <h1 className="fw-bold text-shadow">Book Your Stay</h1>
//           <p className="text-white-50">
//             Experience luxury & comfort at Star Villa Resort
//           </p>
//         </div>
//       </section>

//       {/* BOOKING FORM */}
//       <section className="booking-section py-5">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-8">
//               <div className="booking-card shadow-lg p-4">
//                 <h3 className="text-center font-serif mb-4">
//                   Reservation Details
//                 </h3>

//                 <form onSubmit={handleSubmit}>
//                   <div className="row g-3">
//                     {/* Name */}
//                     <div className="col-md-6">
//                       <label className="form-label">Full Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         className="form-control"
//                         required
//                         onChange={handleChange}
//                       />
//                     </div>

//                     {/* Email */}
//                     <div className="col-md-6">
//                       <label className="form-label">Email Address</label>
//                       <input
//                         type="email"
//                         name="email"
//                         className="form-control"
//                         required
//                         onChange={handleChange}
//                       />
//                     </div>

//                     {/* Phone */}
//                     <div className="col-md-6">
//                       <label className="form-label">Phone Number</label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         className="form-control"
//                         required
//                         onChange={handleChange}
//                       />
//                     </div>

//                     {/* Room Type */}
//                     <div className="col-md-6">
//                       <label className="form-label">Room Type</label>
//                       <select
//                         name="roomType"
//                         className="form-select"
//                         value={form.roomType}
//                         onChange={handleChange}
//                       >
//                         <option>Deluxe Room</option>
//                         <option>Super Deluxe</option>
//                         <option>Royal Suite</option>
//                       </select>
//                     </div>

//                     {/* Check In */}
//                     <div className="col-md-6">
//                       <label className="form-label">Check-In Date</label>
//                       <input
//                         type="date"
//                         name="checkIn"
//                         className="form-control"
//                         required
//                         onChange={handleChange}
//                       />
//                     </div>

//                     {/* Check Out */}
//                     <div className="col-md-6">
//                       <label className="form-label">Check-Out Date</label>
//                       <input
//                         type="date"
//                         name="checkOut"
//                         className="form-control"
//                         required
//                         onChange={handleChange}
//                       />
//                     </div>

//                     {/* Guests */}
//                     <div className="col-md-6">
//                       <label className="form-label">Guests</label>
//                       <select
//                         name="guests"
//                         className="form-select"
//                         value={form.guests}
//                         onChange={handleChange}
//                       >
//                         {[...Array(16)].map((_, i) => (
//                           <option key={i + 1} value={i + 1}>
//                             {i + 1}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Rooms */}
//                     <div className="col-md-6">
//                       <label className="form-label">Rooms</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={form.rooms}
//                         disabled
//                       />
//                       <small className="text-muted">
//                         * 1 room accommodates up to 3 guests
//                       </small>
//                     </div>
//                   </div>

//                   {/* PRICE SUMMARY */}
//                   {nights > 0 && (
//                     <div className="alert alert-light border mt-4">
//                       <p className="mb-1">
//                         <strong>Room Price:</strong> ₹
//                         {ROOM_PRICES[form.roomType]} / night
//                       </p>
//                       <p className="mb-1">
//                         <strong>Nights:</strong> {nights}
//                       </p>
//                       <p className="mb-1">
//                         <strong>Rooms:</strong> {form.rooms}
//                       </p>
//                       <h5 className="fw-bold mt-2">
//                         Total Amount: ₹{totalAmount}
//                       </h5>
//                     </div>
//                   )}

//                   {/* SUBMIT */}
//                   <div className="text-center mt-4">
//                     <button type="submit" className="btn btn-gold btn-lg px-5">
//                       Pay & Confirm Booking
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Booking;
