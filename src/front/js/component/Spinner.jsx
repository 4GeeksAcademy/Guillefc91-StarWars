import React from "react";

export const Spinner = () => {
    return (
        <div className="spinner-border text-danger m-auto d-flex justify-content-center" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}