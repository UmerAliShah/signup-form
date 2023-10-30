import React from "react";

export default function Footer() {
  return (
    <div
      className="text-center py-md-5 py-4 px-md-5 px-5"
      style={{
        backgroundColor: "#333D47",
      }}
    >
      <div className="container-md container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-12 text-light text-md-start">
            <img
              src={require("../assets/logo_EFX_TM.png")}
              className="img-fluid"
            />
            <p className="my-2">
              <small>Copyright 2023 Equifax Inc. All rights reserved.</small>
            </p>
            <p className="">
              <small>
                Equifax and the Equifax marks used herein are trademarks of
                Equifax Inc. Other product and company names mentioned herein
                are the property of their respective owners.
              </small>
            </p>
          </div>
          <div className="col-md-6 col-sm-12 text-light text-md-end ">
            <p>
              <small>Privacy Policy</small>
            </p>
            <p>
              <small>Terms of UseAd | Choices</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
