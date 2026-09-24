import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Admin = () => {

  const navigate = useNavigate();

  const [houses, setHouses] = useState([]);
  const [filter, setFilter] = useState("all");

  const [isAuth, setIsAuth] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // CHECK ADMIN AUTH
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token && role === "admin") {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    setIsCheckingAuth(false);

  }, []);

  // FETCH HOUSES
  const fetchHouses = async () => {
    try {

      const res = await API.get("/api/houses");

      setHouses(res.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Error fetching houses"
      );
    }
  };

  useEffect(() => {

    if (isAuth) {
      fetchHouses();
    }

  }, [isAuth]);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {

    try {

      await API.put(
        `/api/houses/${id}/status`,
        { status }
      );

      fetchHouses();

    } catch (error) {

      alert("Failed to update status");

    }
  };

  // LOADING
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  // NOT ADMIN
  if (!isAuth) {

    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Admin Access Only</h1>

        <p>
          You are not authorized to access admin dashboard.
        </p>

        <button onClick={() => navigate("/login")}>
          Go To Login
        </button>
      </div>
    );
  }

  // FILTER
  const filteredHouses = houses.filter((h) =>
    filter === "all"
      ? true
      : h.status === filter
  );

  return (
    <div className="admin-page">

      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      {/* FILTER */}
      <div className="admin-top-bar">

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select small"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

      </div>

      {/* HOUSES */}
      <div className="masonry-grid pure-gallery">

        {filteredHouses.length === 0 ? (

          <p className="no-data">
            No houses found
          </p>

        ) : (

          filteredHouses.map((house) => {

            const id = house.id || house._id;

            return (

              <div
                key={id}
                className="masonry-item gallery-item buyer-gallery-item-wrapper"
              >

                {/* IMAGE */}
                <img
                  src={
                    house.images?.[0]
                      ? `http://localhost:5000/${house.images[0].replace(/\\/g, "/")}`
                      : "/placeholder.jpg"
                  }
                  alt="house"
                />

                {/* STATUS */}
                <div className="admin-bottom-section">

  <span className={`status ${house.status}`}>
    {house.status}
  </span>

  {house.status === "pending" && (
    <div className="admin-actions">
      <button
        className="approve"
        onClick={() => updateStatus(id, "approved")}
      >
        Approve
      </button>

      <button
        className="reject"
        onClick={() => updateStatus(id, "rejected")}
      >
        Reject
      </button>
    </div>
  )}

</div>

                {/* OVERLAY */}
                <div className="masonry-item-overlay buyer-gallery-item-overlay">

                  <h3 className="buyer-gallery-item-title">
                    {house.title}
                  </h3>

                  <p className="buyer-gallery-item-desc">
                    {house.city} • PKR {house.price?.toLocaleString()}
                  </p>

                </div>


              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Admin;