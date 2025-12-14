const CaptainDetails = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://www.shutterstock.com/image-photo/outdoor-photo-middle-eastern-30s-260nw-2543704497.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">Deep Darji</h4>
        </div>

        <div className="text-right">
          <h4 className="text-xl font-semibold">₹230</h4>
          <p className="text-xs text-gray-500">Today’s earnings</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between bg-gray-100 rounded-2xl p-4">
        <div className="text-center">
          <i className="ri-timer-2-line text-2xl"></i>
          <h5 className="font-semibold mt-1">10.2</h5>
          <p className="text-xs text-gray-500">Hours</p>
        </div>

        <div className="text-center">
          <i className="ri-speed-up-line text-2xl"></i>
          <h5 className="font-semibold mt-1">42 km</h5>
          <p className="text-xs text-gray-500">Distance</p>
        </div>

        <div className="text-center">
          <i className="ri-booklet-line text-2xl"></i>
          <h5 className="font-semibold mt-1">8</h5>
          <p className="text-xs text-gray-500">Trips</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;