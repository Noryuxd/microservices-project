import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<div className="bg-gray-100 min-h-screen">
			<App />
		</div>
	</React.StrictMode>
);
