import React from "react";

const VehiclePanel = (props) => {
  return (
    <div className="relative pb-6 px-2">
      {/* ------------------------------------------------------------------ */}
      {/* TOP SLIDE-DOWN HANDLE (UX cue to close the sheet)                 */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="w-full flex justify-center mb-5 cursor-pointer"
        onClick={() => props.setvehiclePanel(false)}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-4 px-2">Choose a Ride</h3>

      {/* ------------------------------------------------------------------ */}
      {/* VEHICLE OPTIONS LIST — mapped from static array for now            */}
      {/* Future: Will be replaced with dynamic data from backend            */}
      {/* ------------------------------------------------------------------ */}
      {[
        {
          name: "Cab",
          seats: 4,
          eta: "10 mins away",
          desc: "Affordable compact rides",
          price: "₹193",
          img: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n",
        },
        {
          name: "Moto",
          seats: 1,
          eta: "5 mins away",
          desc: "Affordable Moto rides",
          price: "₹60",
          img: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mY2RkZWNhYS0yZWVlLTQ4ZmUtODdmMC02MTRhYTdjZWU3ZDMucG5n",
        },
        {
          name: "Auto",
          seats: 3,
          eta: "3 mins away",
          desc: "Affordable Auto rides",
          price: "₹100",
          img: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n",
        },
      ].map((veh, idx) => (
        
        /* -------------------------------------------------------------- */
        /* EACH VEHICLE CARD                                             */
        /* - Click → Opens Confirm Vehicle Panel                         */
        /* - Contains: image, name, seats, eta, description, price       */
        /* -------------------------------------------------------------- */
        <div
          key={idx}
          onClick={() => props.setConfirmVehiclePanel(true)}
          className="
            flex items-center justify-between 
            p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-3 
            active:border-yellow-400 active:bg-yellow-50 
            transition-all cursor-pointer shadow-sm
          "
        >
          {/* Vehicle thumbnail */}
          <img src={veh.img} alt={veh.name} className="h-12 object-contain" />

          {/* Vehicle Info block */}
          <div className="ml-3 flex-1">
            <h4 className="font-semibold text-base flex items-center gap-1">
              {veh.name}

              {/* Seat count */}
              <span className="text-xs text-gray-500 flex items-center">
                <i className="ri-user-3-line text-sm mr-1"></i>
                {veh.seats}
              </span>
            </h4>

            <p className="text-xs text-gray-500">{veh.eta}</p>
            <p className="text-[11px] text-gray-400">{veh.desc}</p>
          </div>

          {/* Price */}
          <div className="text-lg font-semibold text-gray-900">{veh.price}</div>
        </div>
      ))}
    </div>
  );
};

export default VehiclePanel;